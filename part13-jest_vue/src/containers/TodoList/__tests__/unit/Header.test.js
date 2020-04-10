import {
  shallowMount
} from '@vue/test-utils'
import Header from '@/containers/TodoList/components/Header'
import {
  findWrapper
} from '@/containers/TodoList/utils'

describe('Header 组件测试', () => {
  it('初始化Header,包含input框', () => {
    const wrapper = shallowMount(Header)
    const input = findWrapper(wrapper, 'input').at(0)

    expect(input.exists()).toBe(true)
  })

  it('input框初始值为空', () => {
    const wrapper = shallowMount(Header)
    const inputValue = wrapper.vm.inputValue

    expect(inputValue).toBe('')
  })

  it('input框值发生变化,v-model数据跟着变', () => {
    const wrapper = shallowMount(Header)
    const input = findWrapper(wrapper, 'input').at(0)

    input.setValue('hello todolist')
    const inputValue = wrapper.vm.inputValue
    expect(inputValue).toEqual('hello todolist')
  })

  it('input框输入回车，无内容时没反应', () => {
    const wrapper = shallowMount(Header)
    const input = findWrapper(wrapper, 'input').at(0)

    input.setValue('')
    input.trigger('keyup.enter')
    const wrapperEvents = wrapper.emitted().add
    expect(wrapperEvents).toBeFalsy()
  })

  it('input框输入回车，有内容时,向外触发事件，清空inputValue', () => {
    const wrapper = shallowMount(Header)
    const input = findWrapper(wrapper, 'input').at(0)

    input.setValue('Yux')
    input.trigger('keyup.enter')

    const wrapperEvents = wrapper.emitted().add
    const inputValue = wrapper.vm.inputValue

    expect(wrapperEvents).toBeTruthy()
    expect(inputValue).toEqual('')
  })

  it('Header样式保存,变化后提示', () => {
    const wrapper = shallowMount(Header)

    expect(wrapper).toMatchSnapshot();
  })
})
