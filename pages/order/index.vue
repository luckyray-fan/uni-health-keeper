<template>
	<view>
		<view>所有商品</view>
		<order-item :spuList="spuList"></order-item>
		<view class="health-block">
			<view class="health-line line">
				<view>商品金额</view>
				<view>¥ {{sumPrice}}</view>
			</view>
			<view class="health-line line">
				<view>支付方式</view>
				<view>微信支付</view>
			</view>
			<view class="health-line line">
				<view>
					<uni-icons color="#64EDAC" type="info" size="16" @click="showInfo"></uni-icons>是否使用积分进行抵付
				</view>
				<view>
					<radio color="#64EDAC" :checked="creditSelect" @click="handleCheckCredit"></radio>
				</view>
			</view>
		</view>
		<view class="health-bottom">
			<view>
				<view style="display: inline-block;">¥ {{creditSelect? sumPrice-creditSum/100:sumPrice}}</view>
				<view style="display: inline-block;" v-if="creditSelect">积分抵付{{creditSum/100}}</view>
			</view>
			<button @click="submitOrder" class="health-btn">提交订单</button>
		</view>

	</view>
</template>

<script>
	import orderItem from '@/my-components/order-item/index.vue';
	import HEALTH_API from '../../common/api.js'
	export default {
		components: {
			orderItem
		},
		data() {
			return {
				spuIdList: [],
				creditSelect: false,
				spuList: [{
					spu_name: '成人全套套餐评估',
					spu_pic: 'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
					spu_add_time: '2021-01-22',
					spu_price: '2000',
					num: 1,
					selected: false
				}],
				creditSum: 0
			}
		},
		onLoad(opt) {
			console.log(opt)
			this.spuIdList = JSON.parse(opt.spuIdList)
			this.getSpuList()
		},
		computed: {
			sum() {
				let res = 0;
				this.spuList.map(i => {
					res += i.num;
				})
				return res;
			},
			sumPrice() {
				let res = 0;
				this.spuList.map(i => {
					res += i.num * i.spu_price;
				})
				return res;
			}
		},
		methods: {
			handleCheckCredit() {
				this.creditSelect = !this.creditSelect;
				if (this.creditSelect) {
					this.http.get(HEALTH_API.credit_sum).then(({
						data: {
							code,
							data
						}
					}) => {
						if (code === 0) {
							this.creditSum = data;
						}
					})
				}
			},
			showInfo() {
				uni.showModal({
					title: '提示',
					content: '一百积分抵扣一元, 本次商品积分不可抵用本次订单',
					success: res => {}
				});
			},
			async getSpuList() {
				return this.http.get(HEALTH_API.spu_ids, {
					params: {
						spuIdList: this.spuIdList.map(i => i.id)
					}
				}).then(({
					data: {
						data,
						code
					}
				}) => {
					data.map(i => {
						i.num = this.spuIdList.find(j => j.id == i.spu_id).num
					})
					this.spuList = data;
				})
			},
			submitOrder() {
				uni.showModal({
					title: '提示',
					content: '确认提交订单?',
					success: res => {
						if (res.confirm) {
							this.http.post(HEALTH_API.order, {
								order_price: this.sumPrice,
								order_data: {
									spuList: this.spuList
								},
								order_usecredit: this.creditSelect
							}).then(({
								data: {
									data,
									code
								}
							}) => {
								if (code === 0) {
									uni.showToast({
										title: '订单提交成功'
									})
									setTimeout(i => {
										uni.navigateTo({
											url: '/pages/mine/order'
										})
									}, 1500)
								}
							})

						}
					}
				});

			}
		}
	}
</script>

<style lang="scss">
</style>
