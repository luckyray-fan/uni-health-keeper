<template>
	<view>
		<view class="health-block">
			<view class="health-home-top">
				<view>{{liveData.city}}</view>
				<view>{{liveData.weather}}</view>
				<view>{{liveData.temperature}}℃</view>
			</view>
		</view>
		<my-swiper></my-swiper>
		<view class="health-block justify-around" >
			<uni-grid :column="3" :showBorder="false" :square="false" @change="gridItemClick">
				<uni-grid-item class="health-home-grid-item flex-center" index="0">
					<image src="http://img.luckyray.cn/time.png" class="health-home-grid-item-img"></image>
					<view class="text">服务预约</view>
				</uni-grid-item>
				<uni-grid-item class="health-home-grid-item flex-center" index="1">
					<image src="http://img.luckyray.cn/ask.png" class="health-home-grid-item-img"></image>
					<view class="text">体验咨询</view>
				</uni-grid-item>
				<uni-grid-item class="health-home-grid-item flex-center" index="2">
					<image src="http://img.luckyray.cn/record.png" class="health-home-grid-item-img"></image>
					<view class="text">健康档案</view>
				</uni-grid-item>
				<uni-grid-item class="health-home-grid-item flex-center" index="3">
					<image src="http://img.luckyray.cn/recipe.png" class="health-home-grid-item-img"></image>
					<view class="text">运动处方</view>
				</uni-grid-item>
				<uni-grid-item class="health-home-grid-item flex-center" index="4">
					<image src="http://img.luckyray.cn/plan.png" class="health-home-grid-item-img"></image>
					<view class="text">运动计划</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import mySwiper from '@/my-components/my-swiper/my-swiper.vue'
	export default {
		components:{
			mySwiper
		},
		data() {
			return {
				title: '卧槽尼玛',
				liveData: {
					city: '',
					weather: '',
					temperature: ''
				}
			}
		},
		onLoad() {
			this.amapPlugin.getWeather({
				success: (data) => {
					console.log(data)
					this.liveData = data.liveData;
				},
				fail: (info) => {
					console.log(info)
				}
			})
			this.toLogin()
		},
		onShow() {
			this.toLogin()
		},
		methods: {
			gridItemClick(idx){
				idx = idx.detail.index;
				const idxToUrl = {
					0: '/pages/mine/use_product',
					1: '/pages/service/new_member',
					2: '/pages/archive/index',
					3: '/pages/service/sport',
					4: '/pages/archive/plan',
				}
				uni.navigateTo({
					url:idxToUrl[idx]
				})
			},
			change(e) {
				this.current = e.detail.current;
			},
			toLogin: () => {
				uni.navigateTo({
				    url: '/pages/service/index?service_id=1'
				});
				// uni.switchTab({
				// 	url: '/pages/goods/index'
				// })
			}
		}
	}
</script>

<style lang="scss" >
	$image-size: 60px;
	.swiper-box{
		width: 100%;
		image{
			width: 100%;
		}
	}
	.justify-around{
		 /deep/ .uni-grid{
			justify-content: space-around;
		}
	}
	.health-home-top {
		display: flex;
		justify-content: space-around;
	}

	.health-home-grid-item {
		width: 100px;
		height: 100px;
		text-align: center;
	}

	.health-home-grid-item-img {
		width: $image-size;
		height: $image-size;
		margin: 0 auto;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
