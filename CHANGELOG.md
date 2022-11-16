# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [10.21.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.20.0...v10.21.0) (2022-11-16)


### Features

* upgrade chamber ([8faa80e](https://github.com/lemonadesocial/lemonade-metaverse/commit/8faa80ecd1cdc0eaf30079a380cb19cac6471f63))
* use node lts ([ad80bc8](https://github.com/lemonadesocial/lemonade-metaverse/commit/ad80bc82dc247375e3d661e09d9bf134b3d50e78))


### Bug Fixes

* **enrich:** fix network label missing in enrich duration metric ([d102c02](https://github.com/lemonadesocial/lemonade-metaverse/commit/d102c02ff49f479884c80bd105bb4841bd148e03))

## [10.20.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.19.0...v10.20.0) (2022-11-14)


### Features

* **token:** add index on network, contract and token id ([9644620](https://github.com/lemonadesocial/lemonade-metaverse/commit/964462092c4ceaec8d31cce9bc1c77b1c62eb182))

## [10.19.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.18.0...v10.19.0) (2022-11-12)


### Features

* **registry:** fail when get supported interfaces fails ([c5b18d2](https://github.com/lemonadesocial/lemonade-metaverse/commit/c5b18d2ee793afe95a86da58acdad5c007ff784b))

## [10.18.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.17.0...v10.18.0) (2022-09-23)


### Features

* **enrich:** increase fetch timeout ([e286712](https://github.com/lemonadesocial/lemonade-metaverse/commit/e28671232d7c7f3aed3046946ea154f39567e5b0))

## [10.17.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.16.0...v10.17.0) (2022-09-21)


### Features

* **enrich:** add unique metadata generation ([0784947](https://github.com/lemonadesocial/lemonade-metaverse/commit/07849478bcdcce26e0cb9fcbd559bdb16410c0c5))
* **provider:** use full jitter backoff algorithm ([8675b63](https://github.com/lemonadesocial/lemonade-metaverse/commit/8675b63b8f25c4e31dbebab745344cee94b874b7))

## [10.16.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.15.0...v10.16.0) (2022-09-20)


### Features

* **ingress:** remove block listener ([7009b89](https://github.com/lemonadesocial/lemonade-metaverse/commit/7009b89a20496d4e52ae0341263bca047e3e2a9d))


### Bug Fixes

* **enrich:** fix rarible royalties not being fetched ([4e67d7a](https://github.com/lemonadesocial/lemonade-metaverse/commit/4e67d7a0efe826a50ed4bb3c30ed297bf50279e4))

## [10.15.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.14.0...v10.15.0) (2022-09-15)


### Features

* **ingress:** use new numeric timestamp format ([6ddd6da](https://github.com/lemonadesocial/lemonade-metaverse/commit/6ddd6dab52d94f60dcb6fb2630a1fea0d2c9937a))

## [10.14.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.13.0...v10.14.0) (2022-09-11)


### Features

* **token:** add enrich count ([d906455](https://github.com/lemonadesocial/lemonade-metaverse/commit/d90645573dac7ecc8a39db292b4a8a2c5455e6c5))
* **token:** enrich when metadata is missing ([7f118f5](https://github.com/lemonadesocial/lemonade-metaverse/commit/7f118f556d0398df88b0292479fc52c730a87d00))

## [10.13.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.12.0...v10.13.0) (2022-09-01)


### Features

* **provider:** use static json rpc provider instead of json rpc provider ([7df3c6d](https://github.com/lemonadesocial/lemonade-metaverse/commit/7df3c6d790e1831d80400f21dfa6c417568a4d4e))

## [10.12.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.11.1...v10.12.0) (2022-09-01)


### Features

* **ingress:** exclude updates from ingress duration metric ([514a283](https://github.com/lemonadesocial/lemonade-metaverse/commit/514a2833a19785061640e299b0c346c370c10030))

## [10.11.1](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.11.0...v10.11.1) (2022-08-27)


### Bug Fixes

* **ingress:** fix stop network without state ([bf69b0b](https://github.com/lemonadesocial/lemonade-metaverse/commit/bf69b0b9e0ce0334cc47d56bb170802cb489f2e6))

## [10.11.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.10.0...v10.11.0) (2022-08-27)


### Features

* **provider:** add websocket status metric ([5ebf99c](https://github.com/lemonadesocial/lemonade-metaverse/commit/5ebf99c4535ceb9bdbbdfbf67a983294b402b71c))

## [10.10.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.9.0...v10.10.0) (2022-08-25)


### Features

* **ingress:** require meta to be present and refactor poll ([f2e2e94](https://github.com/lemonadesocial/lemonade-metaverse/commit/f2e2e948960f695f268a41c40a26355c5ea06726))
* **ingress:** use new meta timestamp field instead of rpc ([c34e887](https://github.com/lemonadesocial/lemonade-metaverse/commit/c34e887cac974c21dfde3ac5815475bf02644ecf))

## [10.9.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.8.0...v10.9.0) (2022-08-25)


### Features

* **ipfs:** use nft.storage gateway ([2a866bf](https://github.com/lemonadesocial/lemonade-metaverse/commit/2a866bf4c97d0bc24b24ff149388ad3e07e58bbb))
* **ipfs:** use subdomain style to remove redirect ([ffccfab](https://github.com/lemonadesocial/lemonade-metaverse/commit/ffccfab517e60d95d8bbead636bc806dffbca6ca))
* **provider:** add exponential backoff ([3bdc6fa](https://github.com/lemonadesocial/lemonade-metaverse/commit/3bdc6faad1bbad263e7c1f8f52fc90f8249a8946))


### Bug Fixes

* **token:** fix token without metadata always enriching ([3b758ee](https://github.com/lemonadesocial/lemonade-metaverse/commit/3b758ee77b3132728d605cd024bf4228f76b77e2))

## [10.8.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.7.0...v10.8.0) (2022-08-22)


### Features

* **registry:** use replace one instead of update one ([dbe3aa5](https://github.com/lemonadesocial/lemonade-metaverse/commit/dbe3aa5050770537d744087812101deb26a82fb0))


### Bug Fixes

* **registry:** fix create unique collection registry ([40ffa1b](https://github.com/lemonadesocial/lemonade-metaverse/commit/40ffa1b649b895dd10e5c9835a34112c62b5242e))

## [10.7.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.6.0...v10.7.0) (2022-08-22)


### Features

* **enrich:** add error message when registry is not erc721 ([b5fe5cb](https://github.com/lemonadesocial/lemonade-metaverse/commit/b5fe5cb08bdad6032c74aa055ebfaf4230501b8b))

## [10.6.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.5.0...v10.6.0) (2022-08-18)


### Features

* replace apollo client by graphql-request ([72461b0](https://github.com/lemonadesocial/lemonade-metaverse/commit/72461b077eed3b20a537d3dca15fbdb3587d6620))


### Bug Fixes

* **ingress:** fix block listener not stopping ([f972851](https://github.com/lemonadesocial/lemonade-metaverse/commit/f972851cad0910d5eca262c1617dc3c1a452d9bd))

## [10.5.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.4.0...v10.5.0) (2022-08-15)


### Features

* **provider:** use short websocket ping interval ([3715e4a](https://github.com/lemonadesocial/lemonade-metaverse/commit/3715e4a5008506b93296069cb2e68ccd3d7a1c6e))


### Reverts

* Revert "feat(provider): add close logging" ([86aa16e](https://github.com/lemonadesocial/lemonade-metaverse/commit/86aa16eb08fa4bbbfa3549708da005cfd452b593))

## [10.4.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.3.0...v10.4.0) (2022-08-15)


### Features

* **contract:** create contract services for each interface ([cf3bf35](https://github.com/lemonadesocial/lemonade-metaverse/commit/cf3bf35db7b8e60908963ad030791f891cc0dc98))
* **ingress:** await ingress meta process ([076ed13](https://github.com/lemonadesocial/lemonade-metaverse/commit/076ed136a58a16649ea42bdf7fb1cf6bd0797179))
* **ingress:** set delay to zero when block cannot be found ([50e52a8](https://github.com/lemonadesocial/lemonade-metaverse/commit/50e52a8f5aa79f8231be7c5eab260948be925d07))
* **introspection:** use introspection contract for multi supports interface ([626e794](https://github.com/lemonadesocial/lemonade-metaverse/commit/626e794f513d0aab6f9ef5f9d6709348388cfaa5))
* **provider:** add close logging ([6bcd420](https://github.com/lemonadesocial/lemonade-metaverse/commit/6bcd420e096fd0255c76edf05368ecc55688771a))
* **provider:** add websocket reconnect delay ([1d5eaa6](https://github.com/lemonadesocial/lemonade-metaverse/commit/1d5eaa64629848a3562ba5810f9d4fcb564dc0ea))
* **provider:** reuse network from previous websocket provider ([4ca625d](https://github.com/lemonadesocial/lemonade-metaverse/commit/4ca625d927df1a5e508ff62f1f826e9dc3e4752c))

## [10.3.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.2.0...v10.3.0) (2022-08-12)


### Features

* **enrich:** don't throw external errors ([7d42e14](https://github.com/lemonadesocial/lemonade-metaverse/commit/7d42e14b941ee5db76690ec7522b9b1c7259f44b))
* **ingress:** upgrade pagination by using id bound instead of skip ([043ddbe](https://github.com/lemonadesocial/lemonade-metaverse/commit/043ddbeda8a0c8442b4b6884c836310a3f2bd57c))
* **registry:** upgrade cache by setting promise instead of result ([614b1c9](https://github.com/lemonadesocial/lemonade-metaverse/commit/614b1c9db718510ecae853930ef3bce3645c863e))


### Bug Fixes

* **provider:** fix inflight request callback leak ([066d1e1](https://github.com/lemonadesocial/lemonade-metaverse/commit/066d1e17ebd32fde4878fa9d99e555345ca4c9e8))

## [10.2.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.1.0...v10.2.0) (2022-08-11)


### Features

* **provider:** add websocket provider metrics ([725dc9b](https://github.com/lemonadesocial/lemonade-metaverse/commit/725dc9bb85a52f25e9b26972afeb5e4ee018cba8))

## [10.1.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v10.0.0...v10.1.0) (2022-08-09)


### Features

* **indexer:** reuse in-memory cache instance ([54ba3e5](https://github.com/lemonadesocial/lemonade-metaverse/commit/54ba3e5face5863c43e3b72c95bda75a9a322ad1))
* upgrade bullmq ([0d5142d](https://github.com/lemonadesocial/lemonade-metaverse/commit/0d5142d5fe7f6256796a301257d1a002567ca0d8))
* upgrade ws and add binary addons ([9821c7f](https://github.com/lemonadesocial/lemonade-metaverse/commit/9821c7f0b1a3568e1e87b6f7aae2c36c76f73dc7))
* use type-graphql-utils ([e341c4c](https://github.com/lemonadesocial/lemonade-metaverse/commit/e341c4c856681af9df21189a51a3da94ce90bd2c))

## [10.0.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v9.2.0...v10.0.0) (2022-08-05)


### ⚠ BREAKING CHANGES

* upgrade nodejs

### Features

* **enrich:** add network to queue job id ([7e3b79d](https://github.com/lemonadesocial/lemonade-metaverse/commit/7e3b79dacc5f12ce454588b33d021bc11ed97d1d))
* **enrich:** don't throw on fetch errors ([842e729](https://github.com/lemonadesocial/lemonade-metaverse/commit/842e7297b40586b579651e3d977e7fc48a3ff2ab))
* upgrade nodejs ([5a20693](https://github.com/lemonadesocial/lemonade-metaverse/commit/5a20693be80dcb86051dcc8cd11c2c785a0838a4))


### Bug Fixes

* **provider:** fix provider losing events after two consecutive interruptions ([521467e](https://github.com/lemonadesocial/lemonade-metaverse/commit/521467e69a5bb57a69ac4c41bf48140a086f6db4))

## [9.2.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v9.1.0...v9.2.0) (2022-08-03)


### Features

* **ingress:** always paginate at same block to avoid skew ([aaf80d2](https://github.com/lemonadesocial/lemonade-metaverse/commit/aaf80d22c0a51313cd82b1c3e8a7103260b65887))
* **ingress:** replace block polling by listener ([f4b13d8](https://github.com/lemonadesocial/lemonade-metaverse/commit/f4b13d8db72c7e368c4a36bba4edc39358b78271))
* **ingress:** replace orders last block by change block filter ([5470d4f](https://github.com/lemonadesocial/lemonade-metaverse/commit/5470d4f2ae6456bd3b87668879b14bcc33b5efde))
* remove source version environment variable ([ddd8673](https://github.com/lemonadesocial/lemonade-metaverse/commit/ddd8673236cd8cb305663c279858edd4f1368847))
* use dependency-based ordering for start and shutdown handlers ([9577032](https://github.com/lemonadesocial/lemonade-metaverse/commit/957703233044c40e662f926d9464216b7d6f7be9))

## [9.1.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v9.0.0...v9.1.0) (2022-07-20)


### Features

* add support for unique collections ([d399ea1](https://github.com/lemonadesocial/lemonade-metaverse/commit/d399ea1cd2e628a37ad8c309e422de6c134fa723))
* **enrich:** don't retry enrich on error ([19a712a](https://github.com/lemonadesocial/lemonade-metaverse/commit/19a712acd5a87121c3b42b075e66fc82e21d627b))
* **enrich:** increase worker concurrency ([810b13f](https://github.com/lemonadesocial/lemonade-metaverse/commit/810b13f71b07bbcd849f9c80ad4e18f6beb7b9a2))
* **registry:** decrease cache size ([e1ed197](https://github.com/lemonadesocial/lemonade-metaverse/commit/e1ed19786d7e8d02a7ee9b7e8a64ce921e63d858))


### Bug Fixes

* **enrich:** fix _id field in update when enqueue via admin ([9c88f59](https://github.com/lemonadesocial/lemonade-metaverse/commit/9c88f59b4f56f8107f6f39e72155cc3d6df69567))
* **provider:** fix wrong this reference for proxied functions ([eea2738](https://github.com/lemonadesocial/lemonade-metaverse/commit/eea2738a06f55d83225b2b983a29c18c2de0e228))
* **registry:** fix registries fetched from database not being cached ([3752178](https://github.com/lemonadesocial/lemonade-metaverse/commit/375217847be84306847b695274af5d13912697b1))

## [9.0.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.11.0...v9.0.0) (2022-07-18)


### ⚠ BREAKING CHANGES

* **ingress:** make ingress where filter configurable

### Features

* **ingress:** add network name to failed ingress log ([94e9b9e](https://github.com/lemonadesocial/lemonade-metaverse/commit/94e9b9e7930da6c25899bc1e179a63d9b45c2a9c))
* **ingress:** make ingress where filter configurable ([6224a55](https://github.com/lemonadesocial/lemonade-metaverse/commit/6224a55dbfdb936ff1a27ee517fb731ee450c01d))
* **token:** make currency optional ([e8aa74e](https://github.com/lemonadesocial/lemonade-metaverse/commit/e8aa74e7db850b34c9895d5c5c7cd74a7df65a7f))


### Bug Fixes

* **ingress:** fix tokens pagination parameters missing ([22a3de7](https://github.com/lemonadesocial/lemonade-metaverse/commit/22a3de7c41327a2864f1d5d3037973ae462292bb))
* **token:** fix raw token being merged when enrich fails ([c4acea1](https://github.com/lemonadesocial/lemonade-metaverse/commit/c4acea12f070bcbcf0d67935b1000d213659f52d))

## [8.11.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.10.0...v8.11.0) (2022-07-12)


### Features

* **provider:** handle websocket provider errors ([2fd8231](https://github.com/lemonadesocial/lemonade-metaverse/commit/2fd8231df2c262e4c5a7750b8adc420985036daf))

## [8.10.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.9.0...v8.10.0) (2022-07-08)


### Features

* **provider:** remove alchemy schema in favor of web socket provider ([4332e98](https://github.com/lemonadesocial/lemonade-metaverse/commit/4332e98b3675a2c0e022c4c3bdebad78786604d1))

## [8.9.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.8.1...v8.9.0) (2022-07-07)


### Features

* add keepalive timeout ([3b6192f](https://github.com/lemonadesocial/lemonade-metaverse/commit/3b6192fb17c54a83d8dd4a341202ae06b9bfad07))
* **enrich:** remove keepalive agent ([b9b44e6](https://github.com/lemonadesocial/lemonade-metaverse/commit/b9b44e64203e03bc0b054fec041816426a378a81))
* **enrich:** remove user agent header ([be86ad3](https://github.com/lemonadesocial/lemonade-metaverse/commit/be86ad30782c8784fed67c14d2b09bcf72699803))


### Bug Fixes

* **ingress:** handle when get meta block returns null ([5008a9b](https://github.com/lemonadesocial/lemonade-metaverse/commit/5008a9b7233ef99f93ac83b486e447a7d6712c6b))

### [8.8.1](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.8.0...v8.8.1) (2022-06-29)


### Bug Fixes

* **token:** fix recursive exclude null of local data like metadata ([92be757](https://github.com/lemonadesocial/lemonade-metaverse/commit/92be7574ee0b87345e6b4e7f4197f5940e73a7ee))

## [8.8.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.7.0...v8.8.0) (2022-06-29)


### Features

* **provider:** use reliable websocket implementation ([e9519b6](https://github.com/lemonadesocial/lemonade-metaverse/commit/e9519b6ac1ab3881db44300ca59637236a0116fe))


### Bug Fixes

* **ingress:** don't fail ingress job when processing meta fails ([9af0d04](https://github.com/lemonadesocial/lemonade-metaverse/commit/9af0d0468c2a59dbb4c7f679a6d984aba6cdbcc5))

## [8.7.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.6.0...v8.7.0) (2022-06-05)


### Features

* **token:** add founder ([f12400b](https://github.com/lemonadesocial/lemonade-metaverse/commit/f12400bf0fb351957c7699e81791c1b38235b22e))

## [8.6.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.5.0...v8.6.0) (2022-06-03)


### Features

* **provider:** use reliable websocket implementation ([a6a7066](https://github.com/lemonadesocial/lemonade-metaverse/commit/a6a70661aac33e1214d625c89eb054502e320e87))

## [8.5.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.4.0...v8.5.0) (2022-06-03)


### Features

* **token:** allow listing tokens owned by multiple wallets ([17b048b](https://github.com/lemonadesocial/lemonade-metaverse/commit/17b048b45b260f419db897a26904076c36f0c98c))

## [8.4.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.3.0...v8.4.0) (2022-05-26)


### Features

* add admin service ([de3d5d7](https://github.com/lemonadesocial/lemonade-metaverse/commit/de3d5d7e4d59f3fa7f792854e0f4332dacf2ad3e))
* add enrich admin plugin ([ac2d8dd](https://github.com/lemonadesocial/lemonade-metaverse/commit/ac2d8dd8a2fb9369e6b387545f76cea3d866c39c))
* enable fastify trust proxy ([108339a](https://github.com/lemonadesocial/lemonade-metaverse/commit/108339a01d48c32fc5f1080f3a562c1d39ae147c))
* properly manage redis connections ([60fc33f](https://github.com/lemonadesocial/lemonade-metaverse/commit/60fc33ff30eb013df5f4a851ee77183f81e47ed2))
* **registry:** add LemonadePoapV1 support ([46362bf](https://github.com/lemonadesocial/lemonade-metaverse/commit/46362bf811c0010d773d72ad3f65891b2d21fdd3))
* rely on graceful shutdown ([b5abebb](https://github.com/lemonadesocial/lemonade-metaverse/commit/b5abebba4ccea607083d42ac2915a3733d17726b))
* **token:** add proper multi-chain pagination and sorting to get tokens ([f8dce0b](https://github.com/lemonadesocial/lemonade-metaverse/commit/f8dce0b7bb4a5d84ae0f2dc2099c551866be9fef))
* **token:** add registry lookup ([dd75fc7](https://github.com/lemonadesocial/lemonade-metaverse/commit/dd75fc75b04dbcb29c708e312d6277444a36e7e7))
* upgrade apollo and replace koa by fastify ([248714e](https://github.com/lemonadesocial/lemonade-metaverse/commit/248714e482e875e2264e12896d942e7b2e86665f))


### Bug Fixes

* fix where filters not working unless selected ([8537ca7](https://github.com/lemonadesocial/lemonade-metaverse/commit/8537ca752548051a1d4818ec13d682349d524f8a))
* **order:** fix token filter on orders ([1877128](https://github.com/lemonadesocial/lemonade-metaverse/commit/18771289c15acf68140f9bab974f20b77bcda238))

## [8.3.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.2.0...v8.3.0) (2022-05-01)


### Features

* **ingress:** increment state version ([0bc8a38](https://github.com/lemonadesocial/lemonade-metaverse/commit/0bc8a383f5f1519b83d89e74ed78d63c67aa6bbc))
* **registry:** use undefined instead of false when standard not supported ([72232b1](https://github.com/lemonadesocial/lemonade-metaverse/commit/72232b18839c9508a976e16fe16e08d1ef28cdd8))
* **token:** hide network error when get tokens from multiple networks ([31c5d62](https://github.com/lemonadesocial/lemonade-metaverse/commit/31c5d6258000af6ed5b44281c90794bee9aecf9b))


### Bug Fixes

* **ingress:** fix state never updating ([bcf407c](https://github.com/lemonadesocial/lemonade-metaverse/commit/bcf407ce882562734731425f77bdce4195a510b0))

## [8.2.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.1.0...v8.2.0) (2022-04-13)


### Features

* make indexer and provider service independent of network ([d718c12](https://github.com/lemonadesocial/lemonade-metaverse/commit/d718c123bf5396af974c3ebdbaf9bcc9f83d1a5a))
* **network:** rename contracts to ingress contracts ([9d260c5](https://github.com/lemonadesocial/lemonade-metaverse/commit/9d260c51ebe2555e7e7c09c025cbd833d10a5ef7))
* **network:** rename rpc url to provider url ([93f01cb](https://github.com/lemonadesocial/lemonade-metaverse/commit/93f01cb61f00565d4ee2b97c279b016d91afdf04))

## [8.1.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.0.1...v8.1.0) (2022-04-13)


### Features

* **token:** add order to tokens ([db9da9d](https://github.com/lemonadesocial/lemonade-metaverse/commit/db9da9d033cb99e97bd833d6078cb8f13dcdde48))
* **token:** restrict subscription triggers to the initial result ([955a08f](https://github.com/lemonadesocial/lemonade-metaverse/commit/955a08f6e9ba5e3ab39a352c80f50816eb695d8b))
* **utils:** add network name to web url ([b66cc40](https://github.com/lemonadesocial/lemonade-metaverse/commit/b66cc4069e43b044da702f1eccc04858d97031d2))


### Bug Fixes

* **token:** fix waiting for enrich event listener leak ([a67b8cc](https://github.com/lemonadesocial/lemonade-metaverse/commit/a67b8ccf5090545fd3622cfaeb307e75af43cd22))

### [8.0.1](https://github.com/lemonadesocial/lemonade-metaverse/compare/v8.0.0...v8.0.1) (2022-03-31)


### Bug Fixes

* fix watchdog indexer delay metric becoming negative ([986ef21](https://github.com/lemonadesocial/lemonade-metaverse/commit/986ef2169e93ebe99bfdbc03268b6982728b0e5c))

## [8.0.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v7.1.0...v8.0.0) (2022-03-31)


### ⚠ BREAKING CHANGES

* add multi-chain support

### Features

* add enrich failed pubsub to avoid waiting when enrich failed ([f4122ad](https://github.com/lemonadesocial/lemonade-metaverse/commit/f4122ada9066aee434b0f97b84427df4e2a56d77))
* add multi-chain support ([d5c3d5a](https://github.com/lemonadesocial/lemonade-metaverse/commit/d5c3d5abab763636fcfda02ca67a7d882f9ad28b))
* add order taker, taker expanded, and paid amount ([10808dc](https://github.com/lemonadesocial/lemonade-metaverse/commit/10808dcdae51892d1030ca3346c39df07eb5b413))
* add order updated at and updated transaction ([b55a005](https://github.com/lemonadesocial/lemonade-metaverse/commit/b55a005ce6d1590fdc10d3f0e36534fffcaf7e59))
* add temporary network default value for backwards compatibility ([99b74d5](https://github.com/lemonadesocial/lemonade-metaverse/commit/99b74d560ce6127904e7b549ec39abe2a4c40e47))
* add watchdog to ingress ([e15b9ba](https://github.com/lemonadesocial/lemonade-metaverse/commit/e15b9ba3ae4be23f4e0bcaeb7d76ef2fac12d114))
* **ingress:** add network name to ingress recovery metric and logging ([9251df6](https://github.com/lemonadesocial/lemonade-metaverse/commit/9251df6c1a4d7c3bc6154c98fc728d3d603fa2cf))
* **token:** expose network in graphql type ([fcee86a](https://github.com/lemonadesocial/lemonade-metaverse/commit/fcee86afba3b2adae4b2bf2218eae1b4c6e069f1))
* upgrade network handling ([0bb6ac1](https://github.com/lemonadesocial/lemonade-metaverse/commit/0bb6ac1ce977ce3adc05813d16add5eea1cef6f2))
* use lru cache before fetching registry ([0502db3](https://github.com/lemonadesocial/lemonade-metaverse/commit/0502db344cfc8d9034cc82e7c2233fe4f53794e5))


### Bug Fixes

* fix metadata creators not being expanded due to capitalization ([fbf0cec](https://github.com/lemonadesocial/lemonade-metaverse/commit/fbf0cec1965789bc0284ed8f628a6da25e14affb))
* fix watchdog indexer delay metric calculation ([e61a478](https://github.com/lemonadesocial/lemonade-metaverse/commit/e61a47864754b1eb54f99694179e735b24ba086f))

## [7.1.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v7.0.0...v7.1.0) (2022-02-11)


### Features

* **enrich:** support tokens that have token uri with data scheme ([5f7a854](https://github.com/lemonadesocial/lemonade-metaverse/commit/5f7a854097df057d8c2d0b317c97c79698bf773b))

## [7.0.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.9.0...v7.0.0) (2022-02-04)


### ⚠ BREAKING CHANGES

* rename healthcheck to livez

### Features

* **metrics:** remove metrics secret as server isn't exposed ([6fc5639](https://github.com/lemonadesocial/lemonade-metaverse/commit/6fc5639099da730b34cd8990021c61a1a7d031ac))
* **metrics:** set default value for metrics port ([c819a3a](https://github.com/lemonadesocial/lemonade-metaverse/commit/c819a3ac64ba553e873d64dcc6dbaa4fd5b3fb0f))
* rename healthcheck to livez ([3251c60](https://github.com/lemonadesocial/lemonade-metaverse/commit/3251c605ffe138e4cb581f50a853b5a6461f02db))


### Bug Fixes

* **enrich:** fix fetch agent error when redirecting across http and https ([c651673](https://github.com/lemonadesocial/lemonade-metaverse/commit/c6516730cf7c73777c888bb01b5024c9a4000551))

## [6.9.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.8.0...v6.9.0) (2022-01-07)


### Features

* add get web url util ([8855e67](https://github.com/lemonadesocial/lemonade-metaverse/commit/8855e675a113dc55038f3e29372dfc783d12bd13))
* **order:** add restrict key for orders subscription ([076b535](https://github.com/lemonadesocial/lemonade-metaverse/commit/076b5357f124a7f122e43a67053a3f0388707c83))

## [6.8.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.7.1...v6.8.0) (2022-01-06)


### Features

* **ingress:** add latest contracts ([e66c473](https://github.com/lemonadesocial/lemonade-metaverse/commit/e66c473db296e05ee5ecfca6f5dc71c1260d6d4d))

### [6.7.1](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.7.0...v6.7.1) (2022-01-04)


### Bug Fixes

* **graphql:** fix unhandled promise rejection in create subscribe ([b03ffc4](https://github.com/lemonadesocial/lemonade-metaverse/commit/b03ffc4aa2354ef5801c9568e9ba72dc2f5db1f9))

## [6.7.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.6.0...v6.7.0) (2021-12-24)


### Features

* **graphql:** add ability to only receive triggers that relate to the first trigger ([c91dad8](https://github.com/lemonadesocial/lemonade-metaverse/commit/c91dad854e2ebb16d15c056cfe170fedff7b8ca5))


### Bug Fixes

* **graphql:** fix pub/sub async iterator memory leak ([455e740](https://github.com/lemonadesocial/lemonade-metaverse/commit/455e74037b04947df3be7c4ec03200135f178402))


### Reverts

* Revert "feat(heapdump): add heapdump endpoint" ([1cae5d2](https://github.com/lemonadesocial/lemonade-metaverse/commit/1cae5d2b3b275c4aa72069ac570a2b57932844ff))

## [6.6.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.5.0...v6.6.0) (2021-12-21)


### Features

* **heapdump:** add heapdump endpoint ([3e9e638](https://github.com/lemonadesocial/lemonade-metaverse/commit/3e9e6385fbbc4748948c234982b222080228af73))

## [6.5.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.4.2...v6.5.0) (2021-12-20)


### Features

* **web3:** decrease reconnect delay ([56d9551](https://github.com/lemonadesocial/lemonade-metaverse/commit/56d9551da7783903051fc0d97285cfdde8446f19))

### [6.4.2](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.4.1...v6.4.2) (2021-12-15)


### Bug Fixes

* **ingress:** fix multiple ingress job creations ([0ec908a](https://github.com/lemonadesocial/lemonade-metaverse/commit/0ec908a7c9e18c9b05103dad6d7e3ec46f884e94))

### [6.4.1](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.4.0...v6.4.1) (2021-12-07)


### Bug Fixes

* **token:** fix empty royalties array instead of undefined ([8fb5249](https://github.com/lemonadesocial/lemonade-metaverse/commit/8fb52498c161da6925592c5796ec93e210ec2d15))

## [6.4.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.3.0...v6.4.0) (2021-12-06)


### Features

* **enrich:** add web url to logs ([755e2fb](https://github.com/lemonadesocial/lemonade-metaverse/commit/755e2fb9230e3de1f2c03c6170e36d36934eec27))
* **ingress:** add web url to logs ([be6d597](https://github.com/lemonadesocial/lemonade-metaverse/commit/be6d597c0bf2b8d56bc16962929b114c621e1456))


### Bug Fixes

* **utils:** fix non-objects being recursed on when excluding null ([f6532a9](https://github.com/lemonadesocial/lemonade-metaverse/commit/f6532a922f95a91ab9c2224d3a3b394388fc7e3f))

## [6.3.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.2.1...v6.3.0) (2021-12-06)


### Features

* **token:** add creator expanded ([e0dcf92](https://github.com/lemonadesocial/lemonade-metaverse/commit/e0dcf92d0b63b85d597d6191214aca9a816d26d5))


### Bug Fixes

* **token:** allow null items in metadata creators expanded ([aeffa0e](https://github.com/lemonadesocial/lemonade-metaverse/commit/aeffa0ea56189ab62c3c2205e9eff89e2b5111dd))

### [6.2.1](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.2.0...v6.2.1) (2021-12-04)


### Bug Fixes

* **web3:** fix rpc requests not resolving due to ws failures ([ccf8176](https://github.com/lemonadesocial/lemonade-metaverse/commit/ccf8176d3d39d1a722857db46f2f359b6be353f6))


### Reverts

* Revert "feat(ingress): add log when delegating token" ([849ba82](https://github.com/lemonadesocial/lemonade-metaverse/commit/849ba825d91a733d307413dbcf652859b08ff449))
* Revert "feat(watchdog): add debug statements" ([8cdb77d](https://github.com/lemonadesocial/lemonade-metaverse/commit/8cdb77d103c0dc44dca90b316afe5df24b313f86))

## [6.2.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.1.0...v6.2.0) (2021-12-03)


### Features

* **enrich:** use static job backoff ([c400291](https://github.com/lemonadesocial/lemonade-metaverse/commit/c40029159715c4a1ea1170343a824197b6e7e4c1))
* **graphql:** add local path parameter to expanded directive ([d112dba](https://github.com/lemonadesocial/lemonade-metaverse/commit/d112dba65ac29091cec1954103fe21e807488520))
* **ingress:** add log when delegating token ([ea04dc2](https://github.com/lemonadesocial/lemonade-metaverse/commit/ea04dc2c82512ba94038cb279c1b9be4f9f9b761))
* **logger:** always set info log level for slack ([2f647a3](https://github.com/lemonadesocial/lemonade-metaverse/commit/2f647a399582721ec5b7fda6a73fc22290ae5de7))
* **token:** add metadata creators expanded ([a15bda6](https://github.com/lemonadesocial/lemonade-metaverse/commit/a15bda626269479a62ed8e5f5dde87c35d4b6d22))


### Bug Fixes

* **logger:** fix debug and trace logs ([e572596](https://github.com/lemonadesocial/lemonade-metaverse/commit/e57259670191225e6358cf4fdad48d45e7933862))

## [6.1.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v6.0.0...v6.1.0) (2021-12-02)


### Features

* **ingress:** add latest production contract ([f9259af](https://github.com/lemonadesocial/lemonade-metaverse/commit/f9259af59b135ee3a738abb8e0eeae0578f9e8c6))

## [6.0.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v5.0.0...v6.0.0) (2021-12-02)


### ⚠ BREAKING CHANGES

* add registry and erc2981 and rarible royalties v2 support

### Features

* add registry and erc2981 and rarible royalties v2 support ([844af24](https://github.com/lemonadesocial/lemonade-metaverse/commit/844af24dba5648bbcd511e9773e3b226a648f413))
* **enrich:** store royalty accounts in lowercase ([33f84d1](https://github.com/lemonadesocial/lemonade-metaverse/commit/33f84d1bc57997023594f53ec89cbb15b97d40a2))
* **metrics:** make metrics port and server optional ([e457ac9](https://github.com/lemonadesocial/lemonade-metaverse/commit/e457ac9ccb1a8428904deb9866f4a6baf5d55454))
* **token:** add transaction to history ([48f44dc](https://github.com/lemonadesocial/lemonade-metaverse/commit/48f44dcd7c59f0c9f7d9707a283098d1c7652553))
* **watchdog:** add debug statements ([b15eebc](https://github.com/lemonadesocial/lemonade-metaverse/commit/b15eebcdea1584b7a0005e6351368d76721b40e4))


### Bug Fixes

* **watchdog:** fix watchdog stopping when logger fails ([248b81b](https://github.com/lemonadesocial/lemonade-metaverse/commit/248b81b95456d6df4fcd031aeee7e4f5aa16744c))

## [5.0.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v4.4.0...v5.0.0) (2021-11-26)


### ⚠ BREAKING CHANGES

* **web3:** use websocket provider

### Features

* **indexer:** add indexer requests total metric ([d0d2f69](https://github.com/lemonadesocial/lemonade-metaverse/commit/d0d2f6919085fcdcefdc656ba2b1dccb23c452ae))
* **web3:** use websocket provider ([c5ed3bc](https://github.com/lemonadesocial/lemonade-metaverse/commit/c5ed3bc6b0ef7a13ce341b6983046f5d0ad47448))

## [4.4.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v4.3.0...v4.4.0) (2021-11-26)


### Features

* **watchdog:** use timeout instead of interval to avoid concurrent polls ([b784438](https://github.com/lemonadesocial/lemonade-metaverse/commit/b78443851ead8a7106fa770ae6b5c3541b78f124))

## [4.3.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v4.2.0...v4.3.0) (2021-11-25)


### Features

* **enrich:** add enriches total metric ([0fc4bcd](https://github.com/lemonadesocial/lemonade-metaverse/commit/0fc4bcd85df214c1368cfb244f50870ba9eee24b))

## [4.2.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v4.1.0...v4.2.0) (2021-11-25)


### Features

* **watchdog:** add watchdogs total metric ([a647385](https://github.com/lemonadesocial/lemonade-metaverse/commit/a64738582e2a8ebbf8081d419f57613bdc607a8f))

## [4.1.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v4.0.0...v4.1.0) (2021-11-24)


### Features

* **indexer:** retry failed requests at backup indexer ([92d7f4e](https://github.com/lemonadesocial/lemonade-metaverse/commit/92d7f4e3ac567ecd493ff4dd031d4b7ec9fd7dab))
* **watchdog:** add watchdog service to measure delays ([95ad073](https://github.com/lemonadesocial/lemonade-metaverse/commit/95ad073b311edd9fd175436d11c8aa3ca28eb1c9))

## [4.0.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v3.0.0...v4.0.0) (2021-11-22)


### ⚠ BREAKING CHANGES

* **web3:** use enrich to query token uri, metadata, and royalty

### Features

* **indexer:** use keep alive connection ([e75cb45](https://github.com/lemonadesocial/lemonade-metaverse/commit/e75cb45060c7171bcba44c1ce39c5f23dc05be27))
* **token:** add enriched at date ([5de4463](https://github.com/lemonadesocial/lemonade-metaverse/commit/5de4463fa9f0b7bcfa5457fcf8d26e4423e34e41))
* **web3:** add web3 helper and contracts ([e45e0b5](https://github.com/lemonadesocial/lemonade-metaverse/commit/e45e0b57e7094fa7e78ad38df44307dc02850c92))
* **web3:** use enrich to query token uri, metadata, and royalty ([2efa3aa](https://github.com/lemonadesocial/lemonade-metaverse/commit/2efa3aa8404f583feb8475ba62ea36d8089e8e5c))

## [3.0.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v2.2.0...v3.0.0) (2021-11-19)


### ⚠ BREAKING CHANGES

* **token:** make uri optional
* **order:** make currency name and symbol optional

### Features

* **ingress:** make token contracts configurable ([6175151](https://github.com/lemonadesocial/lemonade-metaverse/commit/617515121909a0218350a6012363eca52dbb617e))
* **order:** make currency name and symbol optional ([f21fede](https://github.com/lemonadesocial/lemonade-metaverse/commit/f21fede8571eb0725ad434bb8483c7e5de325cc3))
* **token:** add order, bid, and transfer history ([4ecd350](https://github.com/lemonadesocial/lemonade-metaverse/commit/4ecd350a894da6eccec505a15a1f54f5e8e96cb4))
* **token:** add sorting to history query to show most recent first ([f6c8c17](https://github.com/lemonadesocial/lemonade-metaverse/commit/f6c8c177c5c4dbd678e3b111521aded12631f53a))
* **token:** make uri optional ([65135fc](https://github.com/lemonadesocial/lemonade-metaverse/commit/65135fc1dd57ff25df697f989cdcdcd2d3fcdc19))
* **utils:** add array support to exclude null utility ([f461684](https://github.com/lemonadesocial/lemonade-metaverse/commit/f461684a7f34ac2bf737a73c78fe855616052143))

## [2.2.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v2.1.0...v2.2.0) (2021-11-12)


### Features

* **graphql:** add sort input type ([d04245f](https://github.com/lemonadesocial/lemonade-metaverse/commit/d04245f986cff15e1c20c4d869754cf8532473a0))
* **graphql:** add util to build enum of all fields in type ([2e30316](https://github.com/lemonadesocial/lemonade-metaverse/commit/2e30316b956252aff781e159e9203fcad8046ec7))
* **order:** add ability to sort ([d2dff3f](https://github.com/lemonadesocial/lemonade-metaverse/commit/d2dff3fc3e81118b32fdc68cfa1709e74f79e982))
* **token:** add ability to sort ([2c3480a](https://github.com/lemonadesocial/lemonade-metaverse/commit/2c3480a4ec6b76b0c541f0daaf3a9fcd5e72922c))
* **token:** always sort external get tokens by created at ([146fa2f](https://github.com/lemonadesocial/lemonade-metaverse/commit/146fa2f135b34dece17587c9db4d2a36ba7c6a2a))


### Bug Fixes

* **graphql:** fix equals where filter ([66aa7db](https://github.com/lemonadesocial/lemonade-metaverse/commit/66aa7db377336a244cb8c8091b21018138f8f520))
* **graphql:** fix equals where filter with boolean value ([f1bd566](https://github.com/lemonadesocial/lemonade-metaverse/commit/f1bd566f2e597dc399907f7ddf5b9100c4d8e400))
* **graphql:** fix sort by moving logic outside data class ([3947923](https://github.com/lemonadesocial/lemonade-metaverse/commit/3947923f4d02c32b364b4397a53bda33a43dafd6))

## [2.1.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v2.0.0...v2.1.0) (2021-11-10)


### Features

* **graphql:** add arithmetic where filters ([5bf7307](https://github.com/lemonadesocial/lemonade-metaverse/commit/5bf73070eb572903c590a5fc4f1ff169b0ba8bf6))
* **graphql:** add exists where filter ([4bb2061](https://github.com/lemonadesocial/lemonade-metaverse/commit/4bb20616e3969e91f94aa01558c594ba3fce522f))
* **graphql:** only execute middleware for first-level resolvers ([2b9f10f](https://github.com/lemonadesocial/lemonade-metaverse/commit/2b9f10fd0e047ca6045efe9d4c0558f337d7e1f5))
* **order:** store created at, open from, and open to as dates ([dd52aad](https://github.com/lemonadesocial/lemonade-metaverse/commit/dd52aade95e22d1b86311500571cc38e68136ced))
* **token:** add get tokens by creator ([b9d8c93](https://github.com/lemonadesocial/lemonade-metaverse/commit/b9d8c93bdddf8204726ab5f794a4ec0a0a107d95))
* **token:** standardize token creation ([f713116](https://github.com/lemonadesocial/lemonade-metaverse/commit/f71311625f4e755291dd89f7b5986a1a3a803dee))
* **token:** store token created at as date ([ca04a18](https://github.com/lemonadesocial/lemonade-metaverse/commit/ca04a18607435351dd2cf6c9a08450d70131b1f6))
* **utils:** add get date util to convert epoch to date ([13f22e0](https://github.com/lemonadesocial/lemonade-metaverse/commit/13f22e0393a4f9eda26a47820c3754ef0e1a8d83))


### Bug Fixes

* **order:** fix error when listing orders without filter ([966b81a](https://github.com/lemonadesocial/lemonade-metaverse/commit/966b81a1f5afb5d17e96d57eba465aa656e3d1a9))
* **token:** fix get token detail detection ([b6074e0](https://github.com/lemonadesocial/lemonade-metaverse/commit/b6074e05651da7911e3aa6875d079e1211f49a42))

## [2.0.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.8.0...v2.0.0) (2021-11-05)


### ⚠ BREAKING CHANGES

* return arrays instead of paginated response objects

### Features

* add get fetchable url util ([b1e573c](https://github.com/lemonadesocial/lemonade-metaverse/commit/b1e573c1a5e5705236de3229efa8c468c7d1905f))
* add total 1 to subscription responses ([4f43aa2](https://github.com/lemonadesocial/lemonade-metaverse/commit/4f43aa2dc562d4573add588c34588653978ca25a))
* **graphql:** allow reusing dataloader by sharing an explicit dataloader key ([e1599c4](https://github.com/lemonadesocial/lemonade-metaverse/commit/e1599c4706d4c95caf6626d6a8d3cb2fa2ceefe2))
* **ingress:** add time to recovery metric ([06f5cfa](https://github.com/lemonadesocial/lemonade-metaverse/commit/06f5cfa41b0b1ae597d53676882dbce42104ec4a))
* **ingress:** always log ingress error and recovery ([c574ccf](https://github.com/lemonadesocial/lemonade-metaverse/commit/c574ccfb8ee03c443e647cddb32eacee765defb2))
* **ingress:** always show ingress errors ([942f89e](https://github.com/lemonadesocial/lemonade-metaverse/commit/942f89e15ce1372fb3c4c601f9bcd5f9874c9648))
* **ingress:** ingress and enrich all lemonade tokens ([91845f5](https://github.com/lemonadesocial/lemonade-metaverse/commit/91845f5abc2ec179605eea2ed14908d08ad9f19a))
* **ingress:** ingress tokens of previous contract ([55b7e3f](https://github.com/lemonadesocial/lemonade-metaverse/commit/55b7e3fedee39c5207cb0ebe6267b59d8cb547bc))
* **ingress:** log when ingress is failing for more than 10s ([3e4b51b](https://github.com/lemonadesocial/lemonade-metaverse/commit/3e4b51b826677f6dfc53a504cbe6c39ac95238a2))
* **ingress:** use large buckets for time to recovery metric ([fd9fce5](https://github.com/lemonadesocial/lemonade-metaverse/commit/fd9fce56f5f027c6817acf8b01a6613908967a31))
* **logger:** add support for logging images ([d2fd4e7](https://github.com/lemonadesocial/lemonade-metaverse/commit/d2fd4e71cd3c35188f63b1d998dbdd79f54df78e))
* **redis:** add get or set helper ([3350941](https://github.com/lemonadesocial/lemonade-metaverse/commit/335094159ca95281380b27b775980636621c4fc8))
* **token:** add get token query to find token locally with indexer fallback ([b2a95d2](https://github.com/lemonadesocial/lemonade-metaverse/commit/b2a95d2394e7174e783ee234880bf893a8b965b1))
* **token:** add lookup by id(s) ([e5f0d1e](https://github.com/lemonadesocial/lemonade-metaverse/commit/e5f0d1e5de49a5e4b965c5799b30c208bac3c499))
* **token:** add owner and transfers ([14bc7e5](https://github.com/lemonadesocial/lemonade-metaverse/commit/14bc7e5f70bc3e54ef7e4b68777c97c938b3bcf8))
* **token:** add royalty maker and fraction ([71ac38a](https://github.com/lemonadesocial/lemonade-metaverse/commit/71ac38acb7e1d6da0caa18e0afddc4e7e4679cd6))
* **token:** add tokens query and subscription with local data ([563aa96](https://github.com/lemonadesocial/lemonade-metaverse/commit/563aa967ff651bd31e520e706429f094681650dc))
* **token:** log token images ([df02dfc](https://github.com/lemonadesocial/lemonade-metaverse/commit/df02dfc3339659067889a0e11cd5e5ec898ea664))
* **token:** use event emitter instead of subscribe when waiting for enrich ([baab012](https://github.com/lemonadesocial/lemonade-metaverse/commit/baab0127542a1d9c3879c3dd352d6614b8a85703))


### Bug Fixes

* **ingress:** fix "No value provided for required variable tokens_first" ([d2ecb19](https://github.com/lemonadesocial/lemonade-metaverse/commit/d2ecb192dea38543954449b7633bf25feee3980e))
* **ingress:** fix errors being logged with info level ([511853b](https://github.com/lemonadesocial/lemonade-metaverse/commit/511853bbf4a3deba56419f6c83832c3280d63912))
* **ingress:** fix instant recovery not being logged ([a749f1d](https://github.com/lemonadesocial/lemonade-metaverse/commit/a749f1d4826b2a1b2a0c6ac24f37c6bf22532b21))
* **ingress:** fix order always being deligated to enrich ([a22ec60](https://github.com/lemonadesocial/lemonade-metaverse/commit/a22ec6003861f6ecd0a2c5b2cc8ebe9455b4b9d0))
* **ingress:** fix state not being persisted ([87c24e8](https://github.com/lemonadesocial/lemonade-metaverse/commit/87c24e86fb001265477eea6f86563ff7d649fa5a))
* **order:** move skip and limit post lookup ([a2fa406](https://github.com/lemonadesocial/lemonade-metaverse/commit/a2fa406748bee9b09fe8ee012790b7b7be7172f4))


* return arrays instead of paginated response objects ([27c5dfc](https://github.com/lemonadesocial/lemonade-metaverse/commit/27c5dfc31063a4d0c5701fc73375007f6f4d67b0))

## [1.8.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.7.0...v1.8.0) (2021-10-14)


### Features

* **enrich:** avoid duplicates in queue ([23d55cc](https://github.com/lemonadesocial/lemonade-metaverse/commit/23d55cc26047de19c1b38876c9a9b31e064b2b0d))
* **token:** always fetch from indexer and add contract and tokenId args ([9569c6a](https://github.com/lemonadesocial/lemonade-metaverse/commit/9569c6a4459f04268a53fb0096b9120cb0a261b1))

## [1.7.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.6.0...v1.7.0) (2021-10-12)


### Features

* **user:** add user _id field ([9473bd2](https://github.com/lemonadesocial/lemonade-metaverse/commit/9473bd20123279d63c3caa0d33569430dd5c0e11))

## [1.6.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.5.1...v1.6.0) (2021-10-12)


### Features

* **graphql:** add expanded directive to do lookup foreign data ([3922891](https://github.com/lemonadesocial/lemonade-metaverse/commit/39228917f4c282dc4f40f05fcf87846dfa821336))
* **order:** add maker expanded ([d217a3c](https://github.com/lemonadesocial/lemonade-metaverse/commit/d217a3c6ecbf38684a526882f33828e33b9f5b1a))
* **user:** add user model ([f662687](https://github.com/lemonadesocial/lemonade-metaverse/commit/f66268793d57778cac81e146fa12a992aa42a95d))

### [1.5.1](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.5.0...v1.5.1) (2021-10-07)

## [1.5.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.4.0...v1.5.0) (2021-10-06)


### Features

* **codegen:** get schema URL for environment variable ([8e068a6](https://github.com/lemonadesocial/lemonade-metaverse/commit/8e068a66f5ec30eeb72726b0b21e00ac2b0709ca))
* **config:** parse some environment variables as URLs ([3d24665](https://github.com/lemonadesocial/lemonade-metaverse/commit/3d246654425c72c8a6c37e1621b421c711204e74))
* **config:** use env-var for parsing ([2f6da4d](https://github.com/lemonadesocial/lemonade-metaverse/commit/2f6da4d18c2db50f93fad9e07ad5a0046edc6f0c))
* **config:** use sensible indexer url default ([e8d24d4](https://github.com/lemonadesocial/lemonade-metaverse/commit/e8d24d4aa6940b1db9e2076f2275502b26044276))

## [1.4.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.3.0...v1.4.0) (2021-10-03)


### Features

* **ingress:** log ingress recovery and add some meta data ([87b2237](https://github.com/lemonadesocial/lemonade-metaverse/commit/87b223740e79d97628ccf65dca5f67025859b2f0))

## [1.3.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.2.0...v1.3.0) (2021-10-03)


### Features

* **ingress:** only log two failed consecutive ingresses ([56748af](https://github.com/lemonadesocial/lemonade-metaverse/commit/56748af83f7e16b2965a0ae90369d6c1d6c6f034))

## [1.2.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.1.1...v1.2.0) (2021-09-24)


### Features

* **graphql:** enable CORS middleware ([ebd5929](https://github.com/lemonadesocial/lemonade-metaverse/commit/ebd59297ba469c0acdcf4ab333edb5fcf5fd676d))
* increase keep alive timeout ([41dfe3a](https://github.com/lemonadesocial/lemonade-metaverse/commit/41dfe3afd9a1026d7649bb67a1a8c609c0bc23cf))
* use apollo drain HTTP server plugin and refactor bootstrap ([b2545b8](https://github.com/lemonadesocial/lemonade-metaverse/commit/b2545b8d42c94ff48aec0848f66eb76729185275))


### Bug Fixes

* **utils:** don't execute callback when (manually) flushing empty queue ([2688d39](https://github.com/lemonadesocial/lemonade-metaverse/commit/2688d39bb242dc4d38d39561959e895ecb7b7d3b))

### [1.1.1](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.1.0...v1.1.1) (2021-09-13)


### Bug Fixes

* **ingress:** fix multiple ingress jobs being created ([2fccdbf](https://github.com/lemonadesocial/lemonade-metaverse/commit/2fccdbf90918442bb76bcc79fb6a9783585d0644))

## [1.1.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.0.0...v1.1.0) (2021-08-09)


### Features

* add support for transfers and add token and currency models ([71a2f11](https://github.com/lemonadesocial/lemonade-metaverse/commit/71a2f11107263beb25b3bb3f0a56cdb2504a370d))
* enable GraphQL playground ([debb204](https://github.com/lemonadesocial/lemonade-metaverse/commit/debb20412140c16137455f06928f0addbe73d347))
* **enrich:** add logging ([6958985](https://github.com/lemonadesocial/lemonade-metaverse/commit/6958985b362b4630027cdca3eca7d0b95bcfbfdc))
* **enrich:** allow enrich without order ([e1079c0](https://github.com/lemonadesocial/lemonade-metaverse/commit/e1079c0ad457ae9e9b8e1e9a3ad6db46cbc11945))
* **helpers:** add redis retry strategy to avoid reconnect spam ([9ed970c](https://github.com/lemonadesocial/lemonade-metaverse/commit/9ed970cf90be018e1a63db108827b4484f8c29b3))
* **helpers:** use pino transports and add slack logger ([e669417](https://github.com/lemonadesocial/lemonade-metaverse/commit/e669417782dcbcdea40cffab108a1ced7fa09976))
* **ingress:** add ingresses total metric ([4a0d421](https://github.com/lemonadesocial/lemonade-metaverse/commit/4a0d421ce0cc38e4c3178a62d0dc110f5facc894))
* **ingress:** add logging ([44abf53](https://github.com/lemonadesocial/lemonade-metaverse/commit/44abf531ba42ef592085696e5e12eaf64e0a5f4a))
* **ingress:** check for indexing errors and reindexes ([2bb5392](https://github.com/lemonadesocial/lemonade-metaverse/commit/2bb5392c678a77019f74ca2e2d1574040e0ee246))
* **order:** add query and listen subscription ([024fea8](https://github.com/lemonadesocial/lemonade-metaverse/commit/024fea890331d0b5f75ba99780549d61fd8fe581))
* **order:** project only requested fields ([0d1861f](https://github.com/lemonadesocial/lemonade-metaverse/commit/0d1861feb947ac094acf9067d9182263f5d0c709))
* **token:** add ability to list someone's tokens using lazy enrich ([95e1650](https://github.com/lemonadesocial/lemonade-metaverse/commit/95e16505c1fb860be197efcf9ff7255151f1886d))
* **token:** add tokens resolver ([f81acf4](https://github.com/lemonadesocial/lemonade-metaverse/commit/f81acf456c36ecdb36fbd165cfb76f8a51fcedeb))
* **types:** don't automatically generate where input for nested structures ([8a4035d](https://github.com/lemonadesocial/lemonade-metaverse/commit/8a4035d0c79084ac6faad0159d34dc51dce92fa3))
* **utils:** add filter and validate support for nested wheres ([d61a511](https://github.com/lemonadesocial/lemonade-metaverse/commit/d61a5119a5225a9c8444c74b49a201cd64ca3770))
* **utils:** add subscription util to query and listen for data ([1e65d5d](https://github.com/lemonadesocial/lemonade-metaverse/commit/1e65d5d1278de58753c48467f70d80dd01c4b453))
* **utils:** add util to exclude null recursively ([92b1e9a](https://github.com/lemonadesocial/lemonade-metaverse/commit/92b1e9abaf661bd697d7362022ba51585f7cebf9))
* **utils:** add util to generate projection based on requested fields ([2154e4b](https://github.com/lemonadesocial/lemonade-metaverse/commit/2154e4bdcf3d6cec1dd724c83f2e5376f1541f49))


### Bug Fixes

* **ingress:** fix duplicate ingress jobs ([323790d](https://github.com/lemonadesocial/lemonade-metaverse/commit/323790dd68f3cf3dbaea67fb6e1695c9de051201))
* **utils:** only filter subscription results when filter is provided ([72c516b](https://github.com/lemonadesocial/lemonade-metaverse/commit/72c516bfdfe8ed5440635d56bb15044cd4a49ebf))

## 1.0.0 (2021-07-08)
