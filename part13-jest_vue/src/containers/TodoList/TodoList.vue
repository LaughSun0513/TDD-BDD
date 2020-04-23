<template>
	<div class>
		<Header @add="addUndoItem" />
		<UndoList :list="undoList" @delete="handleDeleteItem" />
	</div>
</template>

<script>
import Header from './components/Header';
import UndoList from './components/UndoList';

export default {
	name: 'TodoList',
	components: {
		Header,
		UndoList
	},
	data() {
		return {
			undoList: []
		};
	},
	methods: {
		addUndoItem(inputValue) {
			this.undoList.push(inputValue);
		},
		handleDeleteItem(index) {
			this.undoList.splice(index, 1);
		}
	}
};
</script>

<style lang="stylus"></style>
