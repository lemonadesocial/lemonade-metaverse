import { ethers } from 'ethers';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Resolver, Query, Args } from 'type-graphql';
import { signSmartContractData } from '@wert-io/widget-sc-signer';
import * as assert from 'assert';
import * as crypto from 'crypto';

import { Order, OrderModel } from '../../app/models/order';
import { WertOptionsArgs, WertOptionsType } from '../types/wert';

import { wertPrivateKey, wertPublicKeyId } from '../../config';

const iface = new ethers.utils.Interface([
  'function bidOrder(uint256 orderId, uint256 amount, address subject)',
  'function fillOrder(uint256 orderId, uint256 amount, address subject)',
]);

function getInputData(type: WertOptionsType, orderId: string, amount: string, subject: string) {
  const values = [orderId, amount, subject];

  switch (type) {
    case WertOptionsType.BID:
      return iface.encodeFunctionData('bidOrder', values);
    case WertOptionsType.FILL:
      return iface.encodeFunctionData('fillOrder', values);
    default:
      throw new Error('type not supported');
  }
}

function getCommodityAndOptions(order: Order): [number, string, Record<string, unknown>] {
  switch (true) {
    case order.network === 'goerli' && !order.currency:
      return [18, 'ETH', { commodity: 'ETH:Ethereum-Goerli', network: 'Goerli' }];
    case order.network === 'goerli' && order.currency?.symbol === 'TTG':
      return [18, 'TTG', { commodity: 'TT Goerli:Ethereum', network: 'Goerli' }];
    case order.network === 'mumbai' && !order.currency:
      return [18, 'MATIC', { commodity: 'MATIC:polygon' }];
    case order.network === 'mumbai' && order.currency?.symbol === 'TT':
      return [18, 'TT', { commodity: 'TT:polygon', network: 'Mumbai' }];
    case order.network === 'ethereum' && !order.currency:
      return [18, 'ETH', { commodity: 'ETH:ethereum' }];
    case order.network === 'ethereum' && order.currency?.symbol === 'USDC':
      return [6, 'USDC', { commodity: 'USDC:ethereum' }];
    case order.network === 'ethereum' && order.currency?.symbol === 'USDT':
      return [6, 'USDT', { commodity: 'USDT:ethereum' }];
    case order.network === 'polygon' && !order.currency:
      return [18, 'MATIC', { commodity: 'MATIC:polygon' }];
    case order.network === 'polygon' && order.currency?.symbol === 'USDC':
      return [6, 'USDC', { commodity: 'USDC:polygon' }];
    default:
      throw new Error('order not supported');
  }
}

@Resolver()
class _WertResolver {
  @Query(() => GraphQLJSONObject)
  async wertOptions(
    @Args() args: WertOptionsArgs,
  ) {
    assert.ok(wertPublicKeyId && wertPrivateKey);

    const order = await OrderModel.findOne(args.order, {
      network: 1,
      contract: 1,
      orderId: 1,
      currency: 1,
    });

    assert.ok(order);

    const [decimals, commodity, options] = getCommodityAndOptions(order);

    const data = signSmartContractData({
      address: args.subject,
      commodity,
      commodity_amount: parseFloat(ethers.utils.formatUnits(args.amount, decimals)),
      pk_id: wertPublicKeyId,
      sc_address: order.contract,
      sc_id: crypto.randomUUID(),
      sc_input_data: getInputData(args.type, order.orderId, args.amount, args.subject),
    }, wertPrivateKey);

    return { ...data, ...options };
  }
}
