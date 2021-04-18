<template>
	<view class="health-page">
		<view class="health-mine-block health-mine-top" style="padding: 8px 0;">
			<view style="flex:1">
				<uni-icons type="list" size="30"></uni-icons>
				{{500}}积分
			</view>
			<view @click="navigateLogin" style="flex:1" class="flex-center">
				<view>
					<image
						:src="user_data.avatar||'http://img.luckyray.cn/wxb1eb11cbeccb04cf.o6zAJsyTls2wZLWjdzVk8WlvhrLk.d8cXgV2v09EL739297c3ec0f727c32c8135aca85df15.png'" style="margin: 0 auto;">
						
					</image>
					<view style="text-align: center;" v-if="user_data.nick">{{user_data.nick}}</view>
					<view style="text-align: center;" v-else>请点击头像登录</view>
				</view>
			</view>
			<view style="flex:1;text-align: right;">
				<navigator url="/pages/mine/info">
					<uni-icons type="gear" size="30"></uni-icons>
				</navigator>
				<view>教练注册</view>
				<view>教练入口</view>
			</view>
		</view>
		<view style="margin-top: 5px;">
			<!-- 显示图标 -->
			<uni-notice-bar speed="30" scrollable="true" showIcon="true"
				text="尊敬的李先生，您预约的冯国明健身课程已过期，请留意~  尊敬的李先生，您预约的篮球课程即将开课，记得准时赴约哦~"></uni-notice-bar>
		</view>
		<view class="health-block">
			<view>
				<view class="health-title">
					<view>我的订单</view>
					<view @click="navigateOrder">查看全部订单</view>
				</view>
				<view>
					<uni-grid :column="5" :showBorder="false" :square="true" @change="gridItemClick">
						<uni-grid-item class="health-home-grid-item" index="1">
							<uni-icons type="shop" size="30" color="#64EDAC"></uni-icons>
							<view class="text">待支付</view>
						</uni-grid-item>
						<uni-grid-item class="health-home-grid-item" index="2">
							<uni-icons type="paperclip" size="30"></uni-icons>
							<view class="text">待使用</view>
						</uni-grid-item>
						<uni-grid-item class="health-home-grid-item" index="3">
							<uni-icons type="star" size="30"></uni-icons>
							<view class="text">预约中</view>
						</uni-grid-item>
						<uni-grid-item class="health-home-grid-item" index="4">
							<uni-icons type="compose" size="30"></uni-icons>
							<view class="text">待评价</view>
						</uni-grid-item>
						<uni-grid-item class="health-home-grid-item" index="5">
							<uni-icons type="loop" size="30"></uni-icons>
							<view class="text">退款/售后</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
		</view>
		<view class="health-block">
			<view>
				<view class="health-title">
					<view>我的服务</view>
					<view @click="navigateUse">可用产品查询</view>
				</view>
				<view>
					<uni-grid :column="2" :showBorder="false" :square="false" @change="gridItemClick">
						<uni-grid-item class="health-home-grid-item" index="9">
							<uni-icons type="map" size="30"></uni-icons>
							<view class="text">预约记录</view>
						</uni-grid-item>
						<uni-grid-item class="health-home-grid-item" index="10">
							<uni-icons type="flag" size="30"></uni-icons>
							<view class="text">取消记录</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '卧槽尼玛',
				user_data: '',
				user: ''
			}
		},
		onLoad() {
			const user = uni.getStorageSync('user');
			this.user = user.user;
			this.user_data = {
				...this.user_data,
				...(user.user_data || {})
			}
		},
		methods: {
			navigateLogin(){
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			navigateUse(){
				uni.navigateTo({
					url: '/pages/mine/use_product'
				})
			},
			navigateOrder() {
				uni.navigateTo({
					url: '/pages/mine/order?cur=0'
				})
			},
			gridItemClick(idx) {
				idx = idx.detail.index;
				const idxToUrl = {
					0: '/pages/mine/order?cur=',
					1: '/pages/mine/order?cur=1',
					2: '/pages/mine/order?cur=2',
					3: '/pages/mine/order?cur=3',
					4: '/pages/mine/comment',
				}
				uni.navigateTo({
					url: idxToUrl[idx]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	image {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}

	.health-home-grid-item {
		text-align: center;
	}

	.health-page {
		height: 100%;
	}

	.health-mine- {
		&block {
			border-radius: 5px;
			background-color: #fff;
		}

		&top {
			display: flex;
			justify-content: space-around;
		}
	}
</style>
