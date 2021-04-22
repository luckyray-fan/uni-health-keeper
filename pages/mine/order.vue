<template>
	<view class="health-tab-page">
		<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="health-tab">
		</wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange" style="flex:1">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<view class="">
					<template v-if="index!==3">
						<block
							v-for="(orderItem,orderIndex) in orderList.filter(i=>(i.order_status===index||index===0))"
							:key="orderIndex">
							<order-item :spuList="orderItem.order_data.spuList">
								<view class="health-line" style="padding: 0 10px;">
									<template v-if="orderItem.order_status === 2">
										<view style="color: #4CD964;">
											支付完成
										</view>
										<image class="image-size-30" src="../../static/order_complete.png"></image>
									</template>
									<template v-else>
										<view style="color: #ff0000;">
											尚未支付
										</view>
										<button class="health-btn-no-margin" @click="orderPay"
											:data-index="orderIndex">立即支付</button>
									</template>
								</view>
							</order-item>
						</block>
					</template>
					<template v-else>
						<view class="health-flex text-center health-block">
							<view class="flex-1">

							</view>
							<view class="flex-4">预约项目</view>
							<view class="flex-4">开始时间</view>
							<!-- <view class="flex-1">操作</view> -->
						</view>
						<block v-for="(i, idx) in reserveList" :key="idx">
							<view class="health-flex health-block text-center">
								<view class="flex-1">
									<radio color="#64EDAC" :checked="i.selected" @click="itemCheck" :data-index="idx">
									</radio>
								</view>
								<view class="flex-4">{{i.service.service_name}}</view>
								<view class="flex-4">{{convertReserveTime(i)}}</view>
								<!-- <view class="flex-1">详情</view> -->
							</view>
						</block>
						<view class="health-bottom flex-center">
							<button class="health-btn" @click="reserveCancel($event,i)">取消预约</button>
						</view>
					</template>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import orderItem from '@/my-components/order-item/index.vue';
	import HEALTH_API from '@/common/api.js'
	export default {
		components: {
			orderItem
		},
		onLoad(opt) {
			this.TabCur = +opt.cur;
			this.getOrderList()
		},
		async onPullDownRefresh() {
			await this.getOrderList()
			uni.stopPullDownRefresh()
		},
		data() {
			return {
				reserveList: [],
				TabCur: 0,
				tabList: [{
					name: '全部'
				}, {
					name: '待支付'
				}, {
					name: '可使用'
				}, {
					name: '预约中'
				}],
				orderList: {
					0: [{
						spu_name: '成人全套套餐评估',
						spu_pic: 'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
						spu_add_time: '2021-01-22',
						spu_price: '2000',
						num: 1,
						selected: false
					}],
					3: [{
						spu_name: '成人全套套餐评估',
						spu_pic: 'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
						spu_add_time: '2021-01-22',
						order_date: '2021-01-22 11:00',
						spu_price: '2000',
						num: 1,
						selected: false
					}]
				}
			}
		},
		methods: {
			itemCheck(e) {
				const idx = e.currentTarget.dataset.index;
				this.reserveList[idx].selected = !this.reserveList[idx].selected;
			},
			convertReserveTime(i){
				return `${i.reserve_date.slice(0,10)} ${i.reserve_time[0]}:00~${i.reserve_time[1]}:00`
			},
			reserveCancel(e, i){
				uni.showModal({
					title: '提示',
					content: '是否取消该预约?',
					success: res => {
						if (res.confirm) {
							this.http.post(HEALTH_API.reserve_cancel, {
								reserve_id: i.reserve_id,
								reserve_record: i.reserve_record
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
			orderPay(e) {
				const orderItem = this.orderList[e.currentTarget.dataset.index]
				uni.showModal({
					title: '提示',
					content: '是否支付该订单?',
					success: res => {
						if (res.confirm) {
							this.http.post(HEALTH_API.order_pay, {
								order_id: orderItem.order_id
							}).then(({
								data: {
									data,
									code
								}
							}) => {
								if (code === 0) {
									uni.showToast({
										title: '支付成功!'
									})
									setTimeout(i => {
										uni.redirectTo({
											url: '/pages/mine/order'
										})
									}, 2000)
								}
							})

						}
					}
				});
			},
			async getOrderList() {
				await Promise.all([this.http.get(HEALTH_API.order_list).then(({
					data: {
						data,
						code
					}
				}) => {
					if (code === 0) {
						this.orderList = data;
					}
				}), this.http.get(HEALTH_API.reserve_list).then(({
					data: {
						data,
						code
					}
				}) => {
					if (code === 0) {
						this.reserveList = data.filter(i=>{
							return !i.reserve_cancel;
						}).map(i=>{
							i.selected = false
							return i;
						});
					}
				})])
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
