# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.9.0](https://github.com/lemonadesocial/lemonade-metaverse/compare/v1.8.0...v1.9.0) (2021-10-29)


### Features

* add get fetchable url util ([b1e573c](https://github.com/lemonadesocial/lemonade-metaverse/commit/b1e573c1a5e5705236de3229efa8c468c7d1905f))
* add total 1 to subscription responses ([4f43aa2](https://github.com/lemonadesocial/lemonade-metaverse/commit/4f43aa2dc562d4573add588c34588653978ca25a))
* **ingress:** add time to recovery metric ([06f5cfa](https://github.com/lemonadesocial/lemonade-metaverse/commit/06f5cfa41b0b1ae597d53676882dbce42104ec4a))
* **ingress:** always log ingress error and recovery ([c574ccf](https://github.com/lemonadesocial/lemonade-metaverse/commit/c574ccfb8ee03c443e647cddb32eacee765defb2))
* **ingress:** always show ingress errors ([942f89e](https://github.com/lemonadesocial/lemonade-metaverse/commit/942f89e15ce1372fb3c4c601f9bcd5f9874c9648))
* **ingress:** ingress and enrich all lemonade tokens ([91845f5](https://github.com/lemonadesocial/lemonade-metaverse/commit/91845f5abc2ec179605eea2ed14908d08ad9f19a))
* **ingress:** log when ingress is failing for more than 10s ([3e4b51b](https://github.com/lemonadesocial/lemonade-metaverse/commit/3e4b51b826677f6dfc53a504cbe6c39ac95238a2))
* **logger:** add support for logging images ([d2fd4e7](https://github.com/lemonadesocial/lemonade-metaverse/commit/d2fd4e71cd3c35188f63b1d998dbdd79f54df78e))
* **token:** add lookup by id(s) ([e5f0d1e](https://github.com/lemonadesocial/lemonade-metaverse/commit/e5f0d1e5de49a5e4b965c5799b30c208bac3c499))
* **token:** add tokens query and subscription with local data ([563aa96](https://github.com/lemonadesocial/lemonade-metaverse/commit/563aa967ff651bd31e520e706429f094681650dc))
* **token:** log token images ([df02dfc](https://github.com/lemonadesocial/lemonade-metaverse/commit/df02dfc3339659067889a0e11cd5e5ec898ea664))


### Bug Fixes

* **ingress:** fix errors being logged with info level ([511853b](https://github.com/lemonadesocial/lemonade-metaverse/commit/511853bbf4a3deba56419f6c83832c3280d63912))
* **ingress:** fix instant recovery not being logged ([a749f1d](https://github.com/lemonadesocial/lemonade-metaverse/commit/a749f1d4826b2a1b2a0c6ac24f37c6bf22532b21))
* **ingress:** fix order always being deligated to enrich ([a22ec60](https://github.com/lemonadesocial/lemonade-metaverse/commit/a22ec6003861f6ecd0a2c5b2cc8ebe9455b4b9d0))
* **ingress:** fix state not being persisted ([87c24e8](https://github.com/lemonadesocial/lemonade-metaverse/commit/87c24e86fb001265477eea6f86563ff7d649fa5a))
* **order:** move skip and limit post lookup ([a2fa406](https://github.com/lemonadesocial/lemonade-metaverse/commit/a2fa406748bee9b09fe8ee012790b7b7be7172f4))

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
