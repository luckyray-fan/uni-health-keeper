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
		</view>
		<view class="health-bottom">
			<view>¥ {{sumPrice}}</view>
			<button @click="submitOrder" class="health-btn">提交订单</button>
		</view>
		
	</view>
</template>

<script>
	import orderItem from '@/my-components/order-item/index.vue'
	export default {
		components:{
			orderItem
		},
		data() {
			return {
				spuList: [{
				spu_name: '成人全套套餐评估',
				spu_pic: 'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
				spu_add_time: '2021-01-22',
				spu_price: '2000',
				num: 1,
				selected: false
			}]
			}
		},
		computed:{
			sum(){
				let res = 0;
				this.spuList.map(i=>{
					res+=i.num;
				})
				return res;
			},
			sumPrice(){
				let res = 0;
				this.spuList.map(i=>{
					res+=i.num*i.spu_price;
				})
				return res;
			}
		},
		methods: {
			
			submitOrder(){
				uni.showToast({
					title: '支付成功, 即将跳转至我的订单'
				})
				setTimeout(i=>{
					uni.navigateTo({
						url:'/pages/mine/order'
					}, 2000)
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
