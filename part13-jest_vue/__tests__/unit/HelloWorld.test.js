import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld";
import Vue from "vue";

describe("HelloWorld.vue", () => {
	// it("DOM测试只能检测UI层面的变化 不方便", () => {
	// 	const root = document.createElement("div");
	// 	root.className = "root";
	// 	document.body.appendChild(root);
	// 	new Vue({
	// 		render: h => (
	// 			HelloWorld, {
	// 				props: {
	// 					msg: "Yux"
	// 				}
	// 			}
	// 		)
	// 	}).$mount(".root");
	// 	console.log(document.body.innerHTML);
	// 	expect(document.getElementsByClassName('hello').length).toBe(1);
	// });

	it("利用shallowMount浅渲染HelloWorld组件,不渲染HelloWorld子组件,适合单元测试", () => {
		const msg = "hahahah";
		// shallowMount浅渲染组件
		const wrapper = shallowMount(HelloWorld, {
			propsData: {
				msg
			}
		});

		// wrapper上的方法 props/findAll/setProps
		expect(wrapper.props('msg')).toEqual(msg);
		expect(wrapper.findAll('.myTitle').length).toBe(1);

		wrapper.setProps({
			msg: 'Yux'
		});
		expect(wrapper.props('msg')).toEqual('Yux');
	});

	it("复习:利用toMatchSnapshot快照进行组件的渲染", () => {
		const wrapper = shallowMount(HelloWorld, {
			propsData: {
				msg: 'Yux-snapshot'
			}
		});
		expect(wrapper).toMatchSnapshot();
	});
});