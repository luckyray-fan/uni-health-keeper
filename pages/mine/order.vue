<template>
	<view class="health-tab-page">
		<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="health-tab">
		</wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange" style="flex:1">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<view class="">
						<block
							v-for="(orderItem,orderIndex) in getListWithIdx(index)"
							:key="orderIndex">
							<order-item :spuList="orderItem.order_data.spuList">
								<view class="health-line" style="padding: 0 10px;">
									<template v-if="orderItem.order_status === 2">
										<view style="color: #4CD964;">
											支付完成
										</view>
										<image class="image-size-30" src="../../static/order_complete.png" @click="handleRefund" :data-index="index"></image>
									</template>
									<template v-if="orderItem.order_status === 1">
										<view style="color: #ff0000;">
											尚未支付
										</view>
										<button class="health-btn-no-margin" @click="orderPay"
											:data-index="orderIndex">立即支付</button>
									</template>
									<template v-if="orderItem.order_status === 3">
										<view style="color: #F0AD4E;">
											已退款
										</view>
									</template>
								</view>
							</order-item>
						</block>
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
					name: '已退款'
				}],
				orderList: []
			}
		},
		methods: {
			getListWithIdx(index){
				return this.orderList.filter(i=>i.order_status===index||index===0)
			},
			handleRefund(e){
				const idx = e.currentTarget.dataset.index;
				const item = this.orderList[idx];
				uni.showModal({
					title: '提示',
					content: '是否退款, 之前使用的积分不会退还',
					success: res => {
						if (res.confirm) {
							this.http.post(HEALTH_API.order_refund, {
								...item
							}).then(({
								data: {
									data,
									code,
									msg
								}
							}) => {
								if (code === 0) {
									uni.showToast({
										title: '退款成功!'
									})
									setTimeout(i => {
										uni.redirectTo({
											url: '/pages/mine/order?cur=3'
										})
									}, 1500)
								}else{
									uni.showToast({
										title: msg,
										icon: 'none'
									})
								}
							})
				
						}
					}
				});
			},
			itemCheck(e) {
				const idx = e.currentTarget.dataset.index;
				this.reserveList[idx].selected = !this.reserveList[idx].selected;
			},
			convertReserveTime(i){
				return `${i.reserve_date.slice(0,10)} ${i.reserve_time[0]}:00~${i.reserve_time[1]}:00`
			},
			reserveCancel(){
				const reserves = this.reserveList.filter(i=>i.selected)
				uni.showModal({
					title: '提示',
					content: '是否取消该预约?',
					success: res => {
						if (res.confirm) {
							this.http.post(HEALTH_API.reserve_cancel, {
								reserves
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
