import { Arg, Ctx, Field, ObjectType, Mutation, Resolver, UseMiddleware, Query } from 'type-graphql';
import { GraphQLJSON } from 'graphql-type-json';
import * as joi from 'joi';
import * as jwt from 'jsonwebtoken';

import { AuthenticateMiddleware } from '../middlewares/authenticate';

import { Context, With } from '../types';

import { generateTagging } from '../../app/utils/s3';
import { s3 } from '../../app/helpers/s3';

import { jwtKey, s3Bucket } from '../../config';

interface Payload {
  key: string;
}

const schema = joi.object<Payload>({
  key: joi.string().required(),
}).required();

function validate(value: unknown): asserts value is Payload {
  joi.assert(value, schema, { allowUnknown: true });
}

@ObjectType()
class GetUploadDataResponse {
  @Field()
  public url!: string;

  @Field(() => GraphQLJSON)
  public fields!: Record<string, unknown>;

  @Field()
  public token!: string;
}

@Resolver()
export class UploadResolver {
  @UseMiddleware(AuthenticateMiddleware)
  @Query(() => GetUploadDataResponse)
  GetUploadData(
    @Ctx() { auth: { user } }: With<Context, 'auth'>,
  ): GetUploadDataResponse {
    const key = `${user}/test.png`;

    const { url, fields } = s3.createPresignedPost({
      Bucket: s3Bucket,
      Fields: {
        key,
        tagging: generateTagging({ orphaned: 'true' }),
      },
    });

    return {
      url,
      fields,
      token: jwt.sign({ key } as Payload, jwtKey),
    };
  }

  @UseMiddleware(AuthenticateMiddleware)
  @Mutation(() => Boolean)
  async ConfirmUpload(
    @Arg('token') token: string,
  ): Promise<boolean> {
    const payload = jwt.verify(token, jwtKey);

    validate(payload);

    await s3.deleteObjectTagging({ // deletes orphaned tag
      Bucket: s3Bucket,
      Key: payload.key,
    }).promise();

    return true;
  }
}
