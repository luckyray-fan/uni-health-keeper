<template>
	<view style="margin-bottom: 30%;">
		<view>
			<uni-swiper-dot :info="info" :current="current" field="content" mode="round">
				<swiper class="swiper-box" @change="change" autoplay="true">
					<swiper-item v-for="(item ,index) in spu.spu_data.other_pics.concat(spu.spu_pic)" :key="index">
						<view class="swiper-item">
							<image :src="item"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="health-block">
			<view class="health-goods-info-price">
				￥{{spu.spu_price}}
			</view>
			<view class="health-goods-info-name">
				{{spu.spu_name}}
			</view>
		</view>
		<view class="health-block">
			<view class="health-goods-info-line">
				<view>包含服务</view>
				<view v-for="(item ,index) in spu.spu_service" :key="index">
					- {{convert(item)}}
				</view>
			</view>
		</view>
		<view class="health-block">
			<view>购买数量</view>
			<view>
				<count :num="spu.num" @change="countChange"></count>
			</view>
		</view>
		<view class="health-block">
			<view>
				可获积分
			</view>
			<view>
				{{spu.spu_credit || 0 }}积分
			</view>
		</view>
		<view class="health-block">
			<view class="health-line">
				<view>
					评价({{spu.comments.length}})
				</view>
				<view style="font-size: 14px;color: gray;" @click="showComment()">
					加载更多>
				</view>
			</view>
			<view>
				<comment :commentList="showCommentList"></comment>
			</view>
		</view>
		<view class="health-bottom" style="justify-content: flex-end;">
			<button class="health-btn" @tap="addCart">加入购物车</button>
			<button class="health-btn" @tap="navigateOrder" style="background-color: #DD524D;">立即购买</button>
		</view>
	</view>
</template>

<script>
	import count from '@/my-components/count/index.vue'
	import HEALTH_API from '@/common/api.js';
	import comment from '@/my-components/comment/index.vue';
	export default {
		components: {
			count,
			comment
		},
		data() {
			return {
				commentLen: 2,
				spu_id: 0,
				spu: {
					spu_id: 123,
					num: 1,
					spu_name: '成人全套套餐评估',
					spu_pic: 'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
					spu_add_time: '2021-01-22',
					spu_price: '2000',
					spu_data: {
						spu_service: `血常规检测/设备/设备类型
                 健康评估/线下专家/专家名称`,
						spu_desc: {
							pic: 'http://img.luckyray.cn/health_spu_desc.jpg',
							desc: '健康检测昵'
						},
						other_pics: [
							'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
							'https://img10.360buyimg.com/imgzone/jfs/t1/23825/20/12489/886305/5c985e33E97fa86fa/51ab6809017e21ca.png'
						],
						credit: '200'
					},
					comments: []
				}
			}
		},
		onLoad(opt) {
			const spu_id = opt.spu_id;
			this.spu_id = spu_id;
			this.getSpu(spu_id);
		},
		async onPullDownRefresh() {
			await this.getSpu(this.spu_id);
			uni.stopPullDownRefresh()
		},
		computed: {
			showCommentList() {
				if (this.commentLen === -1)
					return this.spu.comments
				return this.spu.comments.slice(0, this.commentLen)
			}
		},
		methods: {
			convert(i){
				return Object.values(i)[0].service_name
			},
			showComment() {
				this.commentLen = -1;
			},
			async getSpu(spu_id) {
				return this.http.get(HEALTH_API.spu, {
					params: {
						spu_id,
						get_comment: 1
					}
				}).then(({
					data: {
						data,
						code
					}
				}) => {
					this.spu = {
						...data[0],
						num: 1
					};
				})
			},
			navigateOrder() {
				const tem = [{id: this.spu_id, num: this.spu.num}];
				uni.navigateTo({
					url: `/pages/order/index?spuIdList=${JSON.stringify(tem)}`
				})
			},
			countChange(num) {
				this.spu.num = num
			},
			addCart() {
				const cartList = uni.getStorageSync('cart') || [];
				const same = cartList.find(i => {
					if (i.spu_id === this.spu.spu_id) {
						i.num += this.spu.num;
						return true;
					}
				})
				if (!same) {
					cartList.push(this.spu);
				}
				uni.setStorageSync('cart', cartList)
				uni.showToast({
					title: '加入购物车成功'
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 80vw;

		image {
			height: 80vw;
			width: 100%;
		}
	}
</style>
