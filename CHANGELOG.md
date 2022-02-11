# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
