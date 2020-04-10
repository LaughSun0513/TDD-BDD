<template>
	<div class>
		<Header @add="addUndoItem" />
		<ul>
			<li v-for="(newItem, index) in undoList" :key="index">
				{{ newItem }}
			</li>
		</ul>
	</div>
</template>

<script>
import Header from './components/Header';
export default {
	name: 'TodoList',
	components: {
		Header
	},
	data() {
		return {
			undoList: []
		};
	},
	methods: {
		addUndoItem(inputValue) {
			this.undoList.push(inputValue);
		}
	}
};
</script>

<style lang="stylus"></style>
