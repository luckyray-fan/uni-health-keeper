<template>
	<view class="health-tab-page">
		<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="health-tab">
		</wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange" style="flex:1">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<view class="health-flex text-center health-block">
					<view class="flex-3">预约项目</view>
					<view class="flex-3">开始时间</view>
					<template v-if="TabCur===0">
						<view class="flex-2">状态</view>
						<view class="flex-1">操作</view>
					</template>
					<view v-else class="flex-3">
						取消时间
					</view>
				</view>
				<block v-for="(i, idx) in trueReserveList" :key="idx">
					<view class="health-flex health-block text-center">
						<view class="flex-3">{{i.service.service_name}}</view>
						<view class="flex-3">{{i.reserve_date}}</view>
						<template v-if="TabCur===0">
							<view class="flex-2">{{getStatus(i)}}</view>
							<button class="flex-1 health-btn-sm" @click="reserveCancel($event, i)"
								v-if="showBtn(i)">取消</button>
							<view class="flex-1" v-else></view>
						</template>
						<view v-else class="flex-3">
							{{i.reserve_update_time.slice(0,10)}}
						</view>
					</view>
				</block>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import HEALTH_API from '@/common/api.js';
	import {
		SERVICE_STATUS_NAME,
		SERVICE_STATUS
	} from '@/common/contant.js'
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
			this.TabCur = +opt.cur || 0;
			this.getList()
		},
		async onPullDownRefresh() {
			await this.getList()
			uni.stopPullDownRefresh()
		},
		computed: {
			trueReserveList() {
				return (this.TabCur === 1 ? this.reserveList.filter(i => i.reserve_cancel) : this.reserveList)
			}
		},
		methods: {
			reserveCancel(e, i) {
				uni.showModal({
					title: '提示',
					content: '是否取消该预约?',
					success: res => {
						if (res.confirm) {
							this.http.post(HEALTH_API.reserve_cancel, {
								reserves: [i]
							}).then(({
								data: {
									data,
									code
								}
							}) => {
								if (code === 0) {
									uni.showToast({
										title: '取消预约成功!'
									})
									setTimeout(i => {
										uni.redirectTo({
											url: '/pages/mine/order?cur=3'
										})
									}, 1500)
								}
							})

						}
					}
				});
			},
			getStatus(i) {
				return SERVICE_STATUS_NAME[i.record.service_status[i.reserve_service].status]
			},
			showBtn(i) {
				return i.record.service_status[i.reserve_service].status === SERVICE_STATUS.reserving;
			},
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
