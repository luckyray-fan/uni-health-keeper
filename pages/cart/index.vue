<template>
	<view v-if="cartList.length">
		<view class="health-cart-delall" @click="clearSelect">清空选定商品</view>
		<block v-for="(item,index) in cartList" :key="index">
			<view class="health-spu health-block" style="position: relative;">
				<view>
					<radio color="#64EDAC" :checked="item.selected" @click="itemCheck" :data-index="index"></radio>
				</view>
				<view>
					<image :src="item.spu_pic" class="health-spu-image"></image>
				</view>
				<view class="health-spu-desc">
					<view class="health-spu-top">{{item.spu_name}}</view>
					<view class="health-spu-middle">{{item.spu_add_time.slice(0,10)}}</view>
					<view class="health-spu-bottom">￥{{item.spu_price}}</view>
				</view>
				<view style="position: absolute;right: 5px;bottom: 5px;">
					<count :num="item.num" @change="countChange($event, index)"></count>
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
				<button class="health-bottom-btn" @click="goOrder">结算</button>
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
		components: {
			count
		},
		data() {
			return {
				cartList: [],
				isCheckAll: false
			}
		},
		onLoad() {
			this.cartList = uni.getStorageSync('cart');
		},
		computed: {
			selectArr() {
				return this.cartList.filter(i => i.selected)
			},
			sumPrice() {
				let tem = 0;
				this.selectArr.map(i => tem += +i.spu_price*i.num)
				return tem;
			}
		},
		methods: {
			goOrder() {
				if (this.selectArr.length === 0) {
					uni.showToast({
						title: '请先选择要购买的商品',
						icon: 'none'
					})
					return;
				}
				const tem = this.selectArr.map(i => {
					return {
						id: i.spu_id,
						num: i.num
					}
				})
				uni.navigateTo({
					url: '/pages/order/index?spuIdList=' + JSON.stringify(tem)
				})
			},
			itemCheck(e) {
				const idx = e.currentTarget.dataset.index;
				this.cartList[idx].selected = !this.cartList[idx].selected;
				this.cartList = [...this.cartList]
				this.isCheckAll = this.cartList.every(i => i.selected);
			},
			checkAllChange() {
				this.isCheckAll = !this.isCheckAll;
				this.cartList.map(i => i.selected = this.isCheckAll)
			},
			clearSelect() {
				const notSelected = this.cartList.filter(i => !i.selected);
				if (this.selectArr.length === 0) {
					uni.showToast({
						title: '请先选择要清除的商品',
						icon: 'none'
					})
					return;
				}
				uni.setStorageSync('cart', notSelected);
				uni.showToast({
					title: '清除成功'
				})
				this.cartList = uni.getStorageSync('cart');
			},
			navigateGoods() {
				uni.switchTab({
					url: '/pages/goods/index'
				})
			},
			countChange(num, idx) {
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
			color: #F0AD4E;
			font-size: 18px;
			display: inline-block;
		}
	}
</style>
