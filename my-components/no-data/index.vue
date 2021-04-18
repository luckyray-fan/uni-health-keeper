<template>
	<view class="flex-center">
		<view>
			<image class="image-size-100" src="../../static/nodata.svg"></image>
			<view style="margin: 20px 0;color: gray;">{{title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'noData',
		props: {
			title: {
				type: String,
				default: '没有数据, 这里一片荒芜捏~'
			}
		},
		data() {
			return {}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
</style>
