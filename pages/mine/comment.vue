<template>
	<view class="health-tab-page">
		<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="health-tab">
		</wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange" style="flex:1">
			<swiper-item v-for="(i,idx) in tabList" :key="idx">
				<block v-for="(item,index) in commentList" :key="index">
					<view class="health-spu health-block" :data-index="index" v-if="idx === 0 && !item.record_comment">
						<view>
							<image :src="item.spu.spu_pic" class="health-spu-image"></image>
						</view>
						<view class="health-spu-desc">
							<view class="health-spu-top">{{item.spu.spu_name}}</view>
							<view class="health-spu-middle">{{item.spu.spu_add_time.slice(0,10)}}</view>
							<view class="health-spu-bottom">￥{{item.spu.spu_price}}</view>
						</view>
						<view class="flex-center">
							<button class="health-btn health-appoint-btn box-shadow"
								@tap="showComment(item)">评论</button>
						</view>
					</view>
					<view v-if="idx === 1 && item.record_comment">
						<view class="health-block">
							<comment :commentList="commentList.filter(i=>i.comment).map(i=>i.comment)"></comment>
						</view>
					</view>
				</block>
			</swiper-item>
		</swiper>
		<uni-popup ref="popup" type="center">
			<view class="health-popup">
				<view>
					<view class="health-line">
						<view> 满意度</view>
						<uni-rate v-model="rate" @change="onRateChange"></uni-rate>
					</view>
					<textarea class="health-textarea" v-model="comment"></textarea>
					<button class="health-btn" @click="handleComment">提交</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import tabNav from '@/my-components/tab-nav/index.vue';
	import comment from '@/my-components/comment/index.vue';
	import HEALTH_API from '@/common/api.js'
	export default {
		components: {
			tabNav,
			comment
		},
		data() {
			return {
				TabCur: 0,
				rate: 0,
				comment: '',
				item: null,
				tabList: [{
					name: '未评价'
				}, {
					name: '已评价'
				}],
				commentList: []
			}
		},
		onLoad() {
			this.getList()
		},
		async onPullDownRefresh() {
			await this.getList();
			uni.stopPullDownRefresh()
		},
		methods: {
			async getList() {
				await this.http.get(HEALTH_API.record_list).then(({
					data: {
						data,
						code
					}
				}) => {
					if (code === 0) {
						this.commentList = data;
					}
				})
			},
			showComment(item) {
				this.$refs.popup.open();
				this.item = item;
			},
			tabChange(index) {
				this.TabCur = index;
			},
			onRateChange(e) {
				this.rate = e.value;
			},
			handleComment() {
				this.http.post(HEALTH_API.comment, {
					...this.item,
					comment: this.comment,
					rate: this.rate
				}).then(({
					data: {
						code,
						data
					}
				}) => {
					if (code === 0) {
						uni.showToast({
							title: '评论成功'
						})
						setTimeout(i => {
							uni.redirectTo({
								url: '/pages/mine/comment?cur=1'
							})
						}, 1500)
					}
				})
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
