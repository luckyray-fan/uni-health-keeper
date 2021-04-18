<template>
	<view class="health-count">
		<view class="health-inline" @click="minus" :data-index="index">
			<uni-icons type="minus" size="25"></uni-icons>
		</view>

		<uni-easyinput type="number" class="input-number" :value="temNum" :clearable="false"></uni-easyinput>
		<view class="health-inline" @click="add" :data-index="index">
			<uni-icons type="plus" size="25"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'count',
		props: {
			num:{
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				temNum: this.num
			}
		},
		methods: {
			minus(e) {
				this.temNum = this.temNum - 1 || 1;
				this.$emit('change', this.temNum)
			},
			add(e) {
				this.temNum = this.temNum + 1
				this.$emit('change', this.temNum)
			}
		}
	}
</script>

<style lang="scss">
	.health-count{
		width: 100px;
		.input-number {
			width: 38px;
			display: inline-block;
			margin: 0 5px;
		}
	}
</style>
