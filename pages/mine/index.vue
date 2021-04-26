<template>
	<view class="health-page">
		<view class="health-mine-block health-mine-top" style="padding: 8px 0;">
			<view style="flex:1" @click="navigateCredit">
				<uni-icons type="list" size="30"></uni-icons>
				{{creditSum}}积分
			</view>
			<view @click="navigateLogin" style="flex:1" class="flex-center">
				<view>
					<image
						:src="user_data.avatar||'http://img.luckyray.cn/wxb1eb11cbeccb04cf.o6zAJsyTls2wZLWjdzVk8WlvhrLk.d8cXgV2v09EL739297c3ec0f727c32c8135aca85df15.png'"
						style="margin: 0 auto;">

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
			<uni-notice-bar speed="30" scrollable="true" showIcon="true" :text="noticeText"></uni-notice-bar>
		</view>
		<view class="health-block">
			<view>
				<view class="health-title">
					<view>我的订单</view>
					<view @click="navigateOrder">查看全部订单</view>
				</view>
				<view>
					<uni-grid :column="4" :showBorder="false" :square="false" @change="gridItemClick">
						<uni-grid-item class="health-home-grid-item" index="1">
							<uni-icons type="shop" size="30" color="#64EDAC"></uni-icons>
							<view class="text">待支付</view>
						</uni-grid-item>
						<uni-grid-item class="health-home-grid-item" index="2">
							<uni-icons type="paperclip" size="30"></uni-icons>
							<view class="text">待使用</view>
						</uni-grid-item>
						
						<uni-grid-item class="health-home-grid-item" index="4">
							<uni-icons type="compose" size="30"></uni-icons>
							<view class="text">待评价</view>
						</uni-grid-item>
						<uni-grid-item class="health-home-grid-item" index="5">
							<uni-icons type="loop" size="30"></uni-icons>
							<view class="text">退款</view>
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
					<uni-grid :column="3" :showBorder="false" :square="false" @change="gridItemClick">
						<uni-grid-item class="health-home-grid-item" index="9">
							<uni-icons type="map" size="30"></uni-icons>
							<view class="text">预约记录</view>
						</uni-grid-item>
						<uni-grid-item class="health-home-grid-item" index="3">
							<uni-icons type="star" size="30"></uni-icons>
							<view class="text">预约中</view>
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
	import HEALTH_API from '@/common/api.js'
	export default {
		data() {
			return {
				title: '卧槽尼玛',
				user_data: '',
				user: '',
				reserve: '',
				noticeText: '暂无最新预约消息',
				creditSum: 0
			}
		},
		onLoad() {
			const user = uni.getStorageSync('user');
			this.user = user.user;
			this.user_data = {
				...this.user_data,
				...(user.user_data || {})
			}
			this.getReserve()
			this.getCredit()
		},
		methods: {
			async getCredit(){
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
			},
			async getReserve() {
				await this.http.get(HEALTH_API.reserve_list).then(({
					data: {
						data,
						code
					}
				}) => {
					if (code === 0) {
						this.reserve = data;
						const res = data.sort((i, j) => {
							const time = [i, j].map(x => {
								x.time = new Date(x.reserve_date + ' ' + x.reserve_time +
									":00").getTime();
								return x.time;
							});
							return time[0] - time[1];
						})
						// 小于一天的话就显示
						if (res[0].time - new Date().getTime() <= 24 * 60 * 60 * 1000) {
							this.noticeText =
								`尊敬的${user_data.nick}, 您预约的${res[0].service.service_name}即将开始, 请注意时间 ~`
						}
					}
				})
			},
			navigateLogin() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			navigateUse() {
				uni.navigateTo({
					url: '/pages/mine/use_product'
				})
			},
			navigateOrder() {
				uni.navigateTo({
					url: '/pages/mine/order?cur=0'
				})
			},
			navigateCredit(){
				uni.navigateTo({
					url: '/pages/mine/credit'
				})
			},
			gridItemClick(idx) {
				idx = idx.detail.index;
				const idxToUrl = {
					0: '/pages/mine/order?cur=',
					1: '/pages/mine/order?cur=1',
					2: '/pages/mine/order?cur=2',
					3: '/pages/reserve/index?cur=1',
					4: '/pages/mine/comment',
					5: '/pages/mine/order?cur=3',
					9: '/pages/reserve/index?cur=0',
					10: '/pages/reserve/index?cur=2',
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
