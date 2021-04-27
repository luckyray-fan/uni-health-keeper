<template>
	<view class="health-tab-page">
		<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="health-tab">
		</wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange" style="flex:1">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<view class="health-block">
					<view class="health-line">
						<view> 健康检查 - 2021-01-22</view>
						<view @tap="navigateReport">查看更多></view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import HEALTH_API from '@/common/api.js';
	export default {
		data() {
			return {
				tabList: [{
					name: '全部'
				}, {
					name: '血液常规'
				}],
				reserveResList: []
			}
		},
		onLoad() {
			this.reserveRes();
		},
		async onPullDownRefresh() {
			await this.reserveRes()
			uni.stopPullDownRefresh()
		},
		methods: {
			async reserveRes() {
				this.http.get(HEALTH_API.reserve_res).then(({
					data: {
						code,
						data
					}
				}) => {
					if (code === 0) {
						this.reserveResList = data;
					}
				})
			},
			navigateReport() {
				uni.navigateTo({
					url: '/pages/archive/report'
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
