<template>
	<div class>
		<Header @add="addUndoItem" />
		<UndoList
			:list="undoList"
			@delete="handleDeleteItem"
			@status="handleChangeStatus"
			@reset="resetStatus"
			@change="changeItemValue"
		/>
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
			this.undoList.push({
				status: 'div',
				value: inputValue
			});
		},
		handleDeleteItem(index) {
			this.undoList.splice(index, 1);
		},
		handleChangeStatus(index) {
			const newList = [];

			this.undoList.forEach((item, itemIndex) => {
				if (itemIndex === index) {
					newList.push({
						status: 'input',
						value: item.value
					});
				} else {
					newList.push({
						status: 'div',
						value: item.value
					});
				}
			});
			this.undoList = newList;
		},
		resetStatus() {
			const newList = [];

			this.undoList.forEach((item, itemIndex) => {
				newList.push({
					status: 'div',
					value: item.value
				});
			});
			this.undoList = newList;
		},
		changeItemValue(obj) {
			this.undoList[obj.index].value = obj.value;
		}
	}
};
</script>

<style lang="stylus"></style>
