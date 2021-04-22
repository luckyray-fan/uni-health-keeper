<template>
	<view class="health-tab-page">
		<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="health-tab">
		</wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange" style="flex:1">
			<swiper-item v-for="(item,index) in tabList" :key="index"></swiper-item>
		</swiper>
	</view>
</template>

<script>
	import HEALTH_API from '@/common/api.js'
	export default {
		data() {
			return {
				TabCur: 0,
				tabList: [{
					name: '预约记录'
				}, {
					name: '取消记录'
				}],
				reserveList: []
			}
		},
		onLoad(opt) {
			this.TabCur = +opt.cur;
			this.getList()
		},
		async onPullDownRefresh() {
			await this.getList()
			uni.stopPullDownRefresh()
		},
		methods: {
			async getList() {
				await this.http.get(HEALTH_API.reserve_list).then(({
					data: {
						data,
						code
					}
				}) => {
					if (code === 0) {
						this.reserveList = data;
					}
				})
			},
			tabChange(index) {
				this.TabCur = index;
			},
			swiperChange(e) {
				let {
					current
				} = e.target;
				this.TabCur = current;
			}
		}
	}
</script>

<style lang="scss">
</style>
