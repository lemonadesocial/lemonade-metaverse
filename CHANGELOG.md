# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
