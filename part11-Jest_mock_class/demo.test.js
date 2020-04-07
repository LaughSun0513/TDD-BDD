jest.mock('./utils'); // 将Utils.a | Utils.b===> jest.fn()
/* jest.mock('./utils',()=>{
    const Utils = jest.fn(()=>{
        console.log('3333')
    });
    Utils.prototype.a = jest.fn(()=>{
        console.log('222222')
    });
    Utils.prototype.b = jest.fn(()=>{
        console.log('11111')
    });
    return Utils;
}); */
import Utils from './utils';
import demoFunc from './demo';

test('只测试demoFunc 不关心Utils里的方法实现，所以可以模拟Utils类',()=>{
    demoFunc();
    expect(Utils).toHaveBeenCalled();
    expect(Utils.mock.instances[0].a).toHaveBeenCalled();
    expect(Utils.mock.instances[0].b).toHaveBeenCalled();
    console.log(Utils.mock);
})