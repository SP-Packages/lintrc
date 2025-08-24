## [2.0.0](https://github.com/SP-Packages/lintrc/compare/v1.8.1...v2.0.0) (2025-08-24)

### ⚠ BREAKING CHANGES

* **release:** improve tool deduction and execution strategy

### Features

* **executor:** refactor command execution and add buildCommand utility ([2e0cdc6](https://github.com/SP-Packages/lintrc/commit/2e0cdc65e63ca1f79f288ac79ec5e95dd3c069fa))
* **release:** improve tool deduction and execution strategy ([633505a](https://github.com/SP-Packages/lintrc/commit/633505a688231a4dd117bfada5f13abddfd38932))

## [1.8.1](https://github.com/SP-Packages/lintrc/compare/v1.8.0...v1.8.1) (2025-08-22)

### Bug Fixes

* **dependencies:** update dependencies ([a0b0da3](https://github.com/SP-Packages/lintrc/commit/a0b0da32a0a6afaac96c803204bb368e464f6698))
* **dependencies:** update dependencies ([36fc39d](https://github.com/SP-Packages/lintrc/commit/36fc39d59851d429102d8961b3767c88490f7cda))
* **lint-staged:** enforce strict mode for lintrc command ([5d1059f](https://github.com/SP-Packages/lintrc/commit/5d1059f495c309bc963ef149d37f1cc4b2f8aab2))
* **release.config:** remove unused release rules and clean up config ([6abfbaa](https://github.com/SP-Packages/lintrc/commit/6abfbaa178a580dbaa9aa1989e56dc71a22543c0))
* **scripts:** change postinstall to prepare for husky installation ([c149e0e](https://github.com/SP-Packages/lintrc/commit/c149e0ef77124b48893d814e3992dcb066f885e9))
* **tools:** update composer commands to improve behavior and priority ([3a49017](https://github.com/SP-Packages/lintrc/commit/3a49017c3018fb484c803dbc51e13da8a118f7d1))

## [1.8.0](https://github.com/SP-Packages/lintrc/compare/v1.7.0...v1.8.0) (2025-08-22)

### Features

* **lintrc:** add strict and minimal options to LintRCOptions type ([1f78c9c](https://github.com/SP-Packages/lintrc/commit/1f78c9c3bc2e638ddc5a2a986afae013826a6c81))
* **release:** add strict mode ([fd65e20](https://github.com/SP-Packages/lintrc/commit/fd65e20decdf98eef1cd107cced5113dd0634dce))
* **strict:** add strict mode option to enforce error handling ([143fd78](https://github.com/SP-Packages/lintrc/commit/143fd7877bdd5ed27a15f81e81cd964bf16aae7c))

### Bug Fixes

* **dependencies:** update dependencies ([a93c4a6](https://github.com/SP-Packages/lintrc/commit/a93c4a6b87446a04206d9036a121862fd7b4daf9))
* **executor:** handle empty response message in command output ([27655dc](https://github.com/SP-Packages/lintrc/commit/27655dcca399f91b14121c68bb8d5558b7841066))

## [1.7.0](https://github.com/SP-Packages/lintrc/compare/v1.6.1...v1.7.0) (2025-08-22)

### Features

* **lintrc:** add chalk as a dependency ([e3fcc84](https://github.com/SP-Packages/lintrc/commit/e3fcc842d25c35775bc6d4c3b65802544ae65d0b))
* **output:** enhance output and new parameter for minimal output ([bc1cd34](https://github.com/SP-Packages/lintrc/commit/bc1cd34aa78ba56be07611759c22cb7f16bd4674))
* **release:** add minimal output parameter ([ec14a01](https://github.com/SP-Packages/lintrc/commit/ec14a01164d804759d1aa1e7319183ff39270aed))

## [1.6.1](https://github.com/SP-Packages/lintrc/compare/v1.6.0...v1.6.1) (2025-08-22)

### Bug Fixes

* **lintrc:** change behavior of  verify commands to error back ([455cc72](https://github.com/SP-Packages/lintrc/commit/455cc727040cf7da8076dc947f0d391583ecbb1b))

## [1.6.0](https://github.com/SP-Packages/lintrc/compare/v1.5.3...v1.6.0) (2025-08-22)

### Features

* **helper:** add composer verification tool with error behavior ([4d3a57a](https://github.com/SP-Packages/lintrc/commit/4d3a57a698b5bcf95a18d9fddac7828b0b6ada75))
* **helper:** add options to skip processing Composer and NPM ([0a27388](https://github.com/SP-Packages/lintrc/commit/0a27388de96a57ac9bead58882753f67b93f7acf))
* **helper:** improve tool availability checks and formatting ([ca7bc81](https://github.com/SP-Packages/lintrc/commit/ca7bc81357f3df4a70a2e5a0a2cda18e4798bf96))
* **lintrc:** add npm verification tool and update mapping ([db00d83](https://github.com/SP-Packages/lintrc/commit/db00d837023d3a74b9dafe4728487323597228e9))
* **scripts:** add watch option and make alphabetical order ([e773c81](https://github.com/SP-Packages/lintrc/commit/e773c8136e3e2d07eba4453667c593a48c651848))

### Bug Fixes

* **dependencies:** update dependencies ([536d654](https://github.com/SP-Packages/lintrc/commit/536d654da196490f48bf86fcfb3bcbc7e4270582))
* **dependencies:** update dependencies ([f7f3fbe](https://github.com/SP-Packages/lintrc/commit/f7f3fbee8426f13668691253203d9638dbfbb560))
* **helper:** add space before error message for better readability ([0057096](https://github.com/SP-Packages/lintrc/commit/0057096569e2094cb38f7c54cff27ff9661f4fb1))
* **helper:** change behavior from error to warn for various tools ([cc7516b](https://github.com/SP-Packages/lintrc/commit/cc7516b4bdbb1b0953cfb06bf6bc3224166bad0f))
* **helper:** enhance tool availability check with optional type ([7224a2a](https://github.com/SP-Packages/lintrc/commit/7224a2a3a07265f089f1aaf909bdb90d873bcb36))
* **helper:** enhance tool availability checks for npm and composer ([9ac979d](https://github.com/SP-Packages/lintrc/commit/9ac979d514fd98d2fb9f2266959e8f13e6ddda13))
* **helper:** improve tool availability check for npm and composer ([455dc3f](https://github.com/SP-Packages/lintrc/commit/455dc3fab4ec9995f4e6152da5de699bd78967a8))
* **lintrc:** change behavior of  verify commands to warn as workaround ([c1f9de7](https://github.com/SP-Packages/lintrc/commit/c1f9de7f454ab9b33491874113ce28524979bc61))

## [1.5.3](https://github.com/SP-Packages/lintrc/compare/v1.5.2...v1.5.3) (2025-07-26)

### Bug Fixes

* **dependencies:** update dependencies ([7bf42b8](https://github.com/SP-Packages/lintrc/commit/7bf42b820203947ce695bf22a595ef463299dd62))
* **dependencies:** update dependencies ([02eab54](https://github.com/SP-Packages/lintrc/commit/02eab54c2f8f3ec787e6029ca4ce36a25ff38e07))

## [1.5.2](https://github.com/SP-Packages/lintrc/compare/v1.5.1...v1.5.2) (2025-05-22)

### Bug Fixes

* **dependencies:** update dependencies ([6cfb63f](https://github.com/SP-Packages/lintrc/commit/6cfb63f19c5c3d4ee20fc182e9746c09a28599f7))

## [1.5.1](https://github.com/SP-Packages/lintrc/compare/v1.5.0...v1.5.1) (2025-05-22)

### Bug Fixes

* **dependabot:** change update schedule from daily to weekly ([9684515](https://github.com/SP-Packages/lintrc/commit/96845158c7ef60292eb78c75f143462c46480471))
* **dependencies:** update dependencies ([5a1d792](https://github.com/SP-Packages/lintrc/commit/5a1d7925ac82ec576ae8aab8b3c1f5d2ca9586e6))
* **lintrc:** clear spinner on error and no matching tools found ([a0590f4](https://github.com/SP-Packages/lintrc/commit/a0590f44e503ecb4128543e440e8ff7d86196d9e))
* **workflows:** update action versions and maintain permissions ([ae6b5f7](https://github.com/SP-Packages/lintrc/commit/ae6b5f7483b0fe12aa9a8d556d7dda4cc2994771))

## [1.5.0](https://github.com/SP-Packages/lintrc/compare/v1.4.0...v1.5.0) (2025-04-01)

### Features

* **funding:** add custom PayPal funding link ([3a7df53](https://github.com/SP-Packages/lintrc/commit/3a7df53de79631fdfde60af3933011825a2f27fd))
* **labeler:** enhance file labeling for various file types ([ff86df2](https://github.com/SP-Packages/lintrc/commit/ff86df299c20fd86edf1f3c41418bf80f99306cf))
* **lintrc, config:** update dependencies and configuration ([28cde31](https://github.com/SP-Packages/lintrc/commit/28cde3100fd1449e8eb590bdf68506cf8cb16c35))
* **workflows:** update workflow actions and permissions for consistency ([27f9c15](https://github.com/SP-Packages/lintrc/commit/27f9c15ed041cce096dfdff3e0deddffcac12ee1))

### Bug Fixes

* **lintrc, executor:** stop spinner on error and clear before starting ([b5b798a](https://github.com/SP-Packages/lintrc/commit/b5b798a72b83fc48e4baee06e263682f950873c7))
* **readme, config:** update default config file name to lintrc.json ([11a48d4](https://github.com/SP-Packages/lintrc/commit/11a48d4894945a218074363a3d92c75e721348f7))
* **readme:** update lintrc output examples for clarity and accuracy ([77cb62e](https://github.com/SP-Packages/lintrc/commit/77cb62e1b26f1d0394d83ea59d624442d2096a31))

## [1.4.0](https://github.com/SP-Packages/lintrc/compare/v1.3.0...v1.4.0) (2025-03-28)

### Features

* **depkit:** update dependency versions and add new commands ([79a0cad](https://github.com/SP-Packages/lintrc/commit/79a0cadabd77194aedd73ef8848c090b290defb0))
* **lintrc:** add spinner for processing feedback during linting ([bb22746](https://github.com/SP-Packages/lintrc/commit/bb22746e44e3c8c008eb1d0a19c362387ed93f9f))
* **lintrc:** improve spinner messages and error handling during linting ([a7f7d06](https://github.com/SP-Packages/lintrc/commit/a7f7d066d88034b3c4bf1a21f49217496c33404d))
* **makefile:** add Makefile with help, start, dep, and lint targets ([0916a22](https://github.com/SP-Packages/lintrc/commit/0916a22a9140509d1e0e1d5686c9a4a7f88522d6))
* **workflows:** update prepare workflow for code quality checks ([dd3cd39](https://github.com/SP-Packages/lintrc/commit/dd3cd3976761734890d99248837314326b126a71))

## [1.3.0](https://github.com/SP-Packages/lintrc/compare/v1.2.2...v1.3.0) (2025-03-22)

### Features

* **constants:** add ignoreFiles property to command configuration ([5bd2b81](https://github.com/SP-Packages/lintrc/commit/5bd2b818b102a4ad67f3bf5bbfaac2d56172a8ad))

## [1.2.2](https://github.com/SP-Packages/lintrc/compare/v1.2.1...v1.2.2) (2025-03-22)

### Bug Fixes

* **printer:** update dependencies and improve logging ([2e24d6c](https://github.com/SP-Packages/lintrc/commit/2e24d6c7cb19006adb4fbd1b89170205e216cd34))

## [1.2.1](https://github.com/SP-Packages/lintrc/compare/v1.2.0...v1.2.1) (2025-03-22)

### Bug Fixes

* **core:** update printer dependency to version 2.4.0 and log command ([b8c4e14](https://github.com/SP-Packages/lintrc/commit/b8c4e14a8e7677c2574a1582019523a45f4d064f))

## [1.2.0](https://github.com/SP-Packages/lintrc/compare/v1.1.0...v1.2.0) (2025-03-16)

### Features

* **dependencies:** add depkit and update printer package version ([5e45f45](https://github.com/SP-Packages/lintrc/commit/5e45f45bec95f4c39233dcca8e89325cd1c3c56c))
* **dependencies:** add lintrc package to itself ([16775ca](https://github.com/SP-Packages/lintrc/commit/16775ca9c768ca7fc609fdad68c6d77a53399639))
* **linting:** add markdownlint and lintrc configuration files ([d8d14ab](https://github.com/SP-Packages/lintrc/commit/d8d14ab37b70cadf4e72e1b0a333cf53d91136ae))

### Bug Fixes

* **readme:** streamline badge links for better readability ([6d92da1](https://github.com/SP-Packages/lintrc/commit/6d92da1350cbd8d3857aa061aa4b4d047e33ab0c))

## [1.1.0](https://github.com/SP-Packages/lintrc/compare/v1.0.0...v1.1.0) (2025-03-15)

### Features

* **codecov:** integrate Codecov for improved coverage reporting ([8cd43a0](https://github.com/SP-Packages/lintrc/commit/8cd43a0e738df01811f51a725c05ec9ef500f3cf))
* **tests:** add Vitest configuration and initial test cases ([17588d5](https://github.com/SP-Packages/lintrc/commit/17588d5911484f906f3dfcbb1b89b93ec6f5f780))

## 1.0.0 (2025-03-13)

### Features

* **package:** add initial LintRC package ([5f38eb5](https://github.com/SP-Packages/lintrc/commit/5f38eb516426121e9d4b3c9b07f51cd4731eca0e))
