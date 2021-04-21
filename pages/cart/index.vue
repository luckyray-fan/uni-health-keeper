<template>
	<view v-if="cartList.length">
		<view class="health-cart-delall">清空所有商品</view>
		<block v-for="(item,index) in cartList" :key="index">
			<view class="health-spu health-block">
				<view>
					<radio color="#64EDAC" :checked="item.selected" @click="itemCheck" :data-index="index"></radio>
				</view>
				<view>
					<image :src="item.spu_pic" class="health-spu-image"></image>
				</view>
				<view class="health-spu-desc">
					<view class="health-spu-top">{{item.spu_name}}</view>
					<view class="health-spu-middle">{{item.spu_add_time}}</view>
					<view class="health-spu-bottom">￥{{item.spu_price}}</view>
				</view>
				<view class="health-spu-right">
					<view>
						<count :num="item.num" @change="countChange($event, index)"></count>
					</view>
				</view>
			</view>
		</block>
		<view class="health-bottom">
			<view>
				<radio color="#64EDAC" @tap="checkAllChange" :checked="isCheckAll"></radio>
				全选
			</view>
			<view class="health-bottom-right">
				<view class="health-inline">
					合计:￥
					<text style="font-weight: bold;">
						{{sumPrice}}
					</text>
				</view>
				<button class="health-bottom-btn">结算</button>
			</view>
		</view>
	</view>
	<view v-else class="health-cart-null">
		<view>
			<view style="margin: 0 auto;width: 110px;">
				<image src="http://img.luckyray.cn/health_cart_full.png" class="health-img-md"></image>
			</view>
			<view>购物车是空哒, <view class="health-cart-null-text" @tap="navigateGoods()">浏览下商品吧!> </view>
			</view>
		</view>
	</view>
</template>

<script>
	import count from '@/my-components/count/index.vue'
	export default {
		components:{
			count
		},
		data() {
			return {
				cartList: [],
				sumPrice: 0,
				isCheckAll: false
			}
		},
		onLoad() {
			this.cartList = uni.getStorageSync('cart') || [{
				spu_name: '成人全套套餐评估',
				spu_pic: 'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
				spu_add_time: '2021-01-22',
				spu_price: '2000',
				num: 1,
				selected: false
			}];
		},
		computed: {

		},
		methods: {
			itemCheck(e) {
				const idx = e.currentTarget.dataset.index;
				this.cartList[idx].selected = !this.cartList[idx].selected;
				this.isCheckAll = this.cartList.every(i => i.selected);
			},
			checkAllChange() {
				this.isCheckAll = !this.isCheckAll;
				this.cartList.map(i => i.selected = this.isCheckAll)
			},
			navigateGoods() {
				uni.switchTab({
					url: '/pages/goods/index'
				})
			},
			countChange(num, idx){
				this.cartList[idx].num = num;
			}
		}
	}
</script>

<style lang="scss">
	$image-size: 100px;

	.health-img-md {
		width: $image-size;
		height: $image-size;
	}

	

	.health-bottom {

		&-right {
			.health-inline {
				margin-right: 8px;
				vertical-align: super;
			}
		}

		&-btn {
			background-color: $main-color;
			display: inline-block;
			color: #fff;
			height: 30px;
			line-height: 30px;
		}
	}

	.health-cart {
		&-delall {
			text-align: right;
			margin-top: 8px;
			font-weight: bold;
			color: #F0AD4E;
		}
	}

	.health-cart-null {
		>view {
			background-color: #fff;
			border-radius: 10px;
			padding: 8px;
			margin-top: -20px;
			box-shadow: 0 0 8px 0 rgba($color: #000000, $alpha: .2);
		}

		display: flex;
		height: 100%;
		justify-content: center;
		/* 水平居中 */
		align-items: center;

		&-text {
			color: #007AFF;
			font-size: 18px;
			display: inline-block;
		}
	}
</style>
