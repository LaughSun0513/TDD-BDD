# TDD-BDD
### 测试种类
- 单元测试:独立的功能单元进行测试
- 集成测试
- 端到端测试
- 回归测试
- 性能测试
- 压力测试

### Jest
速度快
API简单
易配置
隔离性好
监控模式
IDE整合
Snapshot
多项目并行
覆盖率
Mock丰富

### Jest的使用
### Jest的配置
- 如何配合babel使用ES6
- npx jest --init 揭开jest配置文件
- jest --coverage 查看测试覆盖率

### Jest的匹配器
- toBe
- toEqual
- toBeNull
- toBeUndefined
- toBedefined
- toBeTruthy
- toBeFalsy
- not
- toBeGreaterThan
- toBeCloseTo
- toMatch
- toContain
- throwError

### Jest下的命令行模式介绍
```
jest --watchAll 模式
Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```
- f模式: Press f to run only failed tests
  - 只针对错误的用例再跑一遍，而不是所有的

- o模式: Press o to only run tests related to changed files
  - 前提条件: 必须配合git
    - 先git init 初始化仓库
    - 再git add . 将所有文件加入
    - 再jest --watchAll 进入o模式 只会对当前修改的文件生效
  - 存在多个test文件时，再跑一遍当前修改文件里的用例(jest --watch默认为o模式)

- p模式: Press p to filter by a filename regex pattern
  - 可以根据正则匹配符合的文件 pattern › match2(只找命中match2的测试文件，如match2.test.js)

- t模式: Press t to filter by a test name regex pattern.
  - 可以根据正则匹配符合的测试用例 pattern › toBe (只找所有测试文件中命中toBe的测试用例)

```
jest --watch 模式
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```
- a模式: Press a to run all tests
  - 运行所有的测试用例(等价于 jest --watchAll)
