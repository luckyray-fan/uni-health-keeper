<template>
	<view>
		<block v-for="(item,index) in orderList" :key="index">
			<view class="health-spu health-block">
				<view>
					<image :src="item.spu_pic" class="health-spu-image"></image>
				</view>
				<view class="health-spu-desc">
					<view class="health-spu-top">{{item.spu_name}}</view>
					<view class="health-spu-middle">购买时间: {{item.order_time}}</view>
					<view class="health-spu-bottom">剩余可用服务: {{item.num}}</view>
				</view>
				<view class="flex-center">
					<button class="health-btn health-appoint-btn box-shadow" @tap="navigateService">预约</button>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [{
				spu_name: '成人全套套餐评估',
				spu_pic: 'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
				spu_add_time: '2021-01-22',
				spu_price: '2000',
				num: 1,
				selected: false,
				order_time: '2021-01-22' 
			}]
			}
		},
		methods: {
			navigateService(){
				uni.navigateTo({
					url: '/pages/service/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	$btn-width: 60px;
	.health-appoint-btn{
		width: $btn-width;
		height: $btn-width;
		border-radius: 50%;
		line-height: $btn-width;
		padding: 0;
	}
</style>
