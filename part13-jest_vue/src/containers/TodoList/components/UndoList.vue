<template>
	<div class="undolist-box">
		<div class="title">
			正在进行:
			<span data-test="count" class="count">{{ list.length }}</span>
		</div>
		<ul class="list">
			<li v-for="(newItem, index) in list" :key="index" data-test="item" class="item">
				{{ newItem }}
				<span
					data-test="deleteBtn"
					class="deleteBtn"
					@click="
						() => {
							handleDelete(index);
						}
					"
					>-</span
				>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'UndoList',
	props: ['list'],
	methods: {
		handleDelete(index) {
			this.$emit('delete', index);
		}
	}
};
</script>

<style lang="stylus" scoped>
.undolist-box {
	width 600px;
	margin 0 auto;
}
.title {
	margin 10px 0 ;
	line-height  30px;
	font-size 24px;
	font-weight bold;
}
.count {
	float right;
	display block;
	width 20px;
	height 20px;
	line-height 20px;
	text-align center;
	background #e6e6e6;
	border-radius 10px;
	color #000;
	margin-top 5px;
	font-size 12px;
}
.list {
	list-style-type none;
}
.item {
	line-height 32px;
	font-size 14px;
	background #ffffff;
	border-left 5px solid #629a9a;
	border-radius 3px;
	text-indent 10px;
	margin-bottom 10px;
}
.deleteBtn {
	display block;
	width 20px;
	height 20px;
	line-height 20px;
	float right;
	margin-top 5px;
	margin-right 10px;
	text-align center;
	background #e6e6e6;
	border-radius 10px;
	color #000;
	font-size 12px;
	text-indent 0;
	cursor pointer;
}
</style>
