import { defaulConf, defaulConf2, defaulConf3, defaulConf4 } from "./snapshot";

/* 
test('测试defaulConf函数',()=>{
    expect(defaulConf()).toEqual({
            domain:'localhost',
            port:'8080'
            ...如果要新增参数就需要不停滴新增参数，不智能
    })
}) 
*/
//--------如果修改源文件新增配置，需要修改测试文件-------------
//----场景:可以用来 测配置文件------
test("测试defaulConf函数", () => {
  expect(defaulConf()).toMatchSnapshot();
});
test("测试defaulConf2函数", () => {
  expect(defaulConf2()).toMatchSnapshot();
});
/**
   Press u to update failing snapshots.  同时更新__snapshots__文件里的快照(defaulConf和defaulConf2一起更新)
   Press i to update failing snapshots interactively. 一个个更新快照(先defaulConf,后defaulConf2 更新)
 */

// 通过给toMatchSnapshot传递参数的方式解决要测试的参数time的动态变化
test("测试defaulConf3函数", () => {
  expect(defaulConf3()).toMatchSnapshot({
    time: expect.any(Date)
  });
});

// ------- npm i prettier@1.8.2 --save-----
// ------- toMatchInlineSnapshot 将Snapshot写在代码里-----
test("测试defaulConf4函数", () => {
  expect(defaulConf4()).toMatchInlineSnapshot(`
    Object {
      "domain": "localhost",
      "port": "8888",
    }
  `);
});
