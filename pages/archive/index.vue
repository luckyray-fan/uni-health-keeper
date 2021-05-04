<template>
	<view class="health-tab-page">
		<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="health-tab">
		</wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange" style="flex:1">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<view class="health-block">
					<block v-for="(i, idx) in reserveResList" :key="idx">
						<view class="health-line">
							<view> {{i.service.service_name}} - {{i.reserve_date}}</view>
							<view @tap="navigateReport" :data-index="idx">查看更多></view>
						</view>
					</block>
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
			navigateReport(e) {
				const idx = e.currentTarget.dataset.index;
				uni.navigateTo({
					url: '/pages/archive/report?reserve_id='+this.reserveResList[idx].reserve_id
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
