<template>
	<view>
		<view class="health-block health-title-back">
			<view class="health-line" style="color: #57cd94;">
				<view>{{reserve.service.service_name}}结果</view>
				<view>{{reserve.reserve_date}}</view>
			</view>
			<view class="flex-center">
				<view>
					<image style="width: 100px;" :src="user.user_data.avatar" mode="widthFix"></image>
					<view>{{user.user_data.nick}}</view>
				</view>
			</view>
			<!-- <view class="flex-center">
				<button class="health-btn">寻找教练</button>
				<button class="health-btn">报告分享</button>
			</view> -->
		</view>
			<!-- <web-view src="https://view.officeapps.live.com/op/view.aspx?src=http://img.luckyray.cn/health_test.xlsm"></web-view> -->
		<psycho :reserve="reserve" v-show="reserve.service.service_id === 3"></psycho>
		<view style="padding: 15px;text-align: center;">@2021 - 健康管家</view>
	</view>
</template>

<script>
	import HEALTH_API from '@/common/api.js';
	import psycho from './template/psycho.vue'
	export default {
		components:{
			psycho
		},
		data() {
			return {
				reserve_id: -1,
				user: {},
				reserve: {},
			}
		},
		async onPullDownRefresh() {
			await this.getReserve(this.reserve_id)
			uni.stopPullDownRefresh()
		},
		onLoad(opts) {
			const user = uni.getStorageSync('user');
			this.user = user
			const reserve_id = opts.reserve_id;
			this.reserve_id = reserve_id;
			this.getReserve(reserve_id)
		},
		methods: {
			async getReserve(reserve_id) {
				this.http.get(HEALTH_API.reserve_id, {
					params: {
						reserve_id
					}
				}).then(({
					data: {
						data,
						code
					}
				}) => {
					if (code === 0) {
						this.reserve = data
					}
				})
			}
		},
		
	}
</script>

<style lang="scss">
</style>
