<template>
	<div class="header-box">
		<div class="header-content">
			TodoList
			<input
				class="header-input"
				data-test="header-input"
				:value="inputValue"
				@input="e => changeInputValue(e.target.value)"
				@keyup.enter="addTodoItem"
				placeholder="请输入待办事项"
			/>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	name: 'Header',
	computed: {
		...mapState({
			inputValue: state => state.inputValue
		})
	},
	methods: {
		addTodoItem() {
			if (this.inputValue) {
				this.$emit('add', this.inputValue);
				this.changeInputValue('');
			}
		},
		...mapMutations(['changeInputValue'])
	}
};
</script>

<style lang="stylus" scoped>
.header-box {
  line-height: 60px;
  background: #666;
}

.header-content {
  width: 600px;
  margin: 0 auto;
  color: #fff;
  font-size: 24px;
}

.header-input {
  float: right;
  width: 360px;
  line-height: 24px;
  margin-top: 16px;
  outline: none;
  color: #666;
  text-indent: 10px;
}
</style>
