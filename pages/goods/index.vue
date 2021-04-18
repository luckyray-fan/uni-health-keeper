<template>
	<view>
		<view class="health-block">
			<uni-easyinput class="health-search-input" suffixIcon="search" v-model="searchVal" placeholder="请输入内容"
				@iconClick="searchClick"></uni-easyinput>
			<image src="http://img.luckyray.cn/health_cart.png" class="health-img-sm" @tap="navigateCart()"></image>
		</view>
		<view v-if="!searchVal">
			<my-swiper></my-swiper>
			<view class="health-block">
				<scroll-view scroll-x class="health-scroll-y">
					<block v-for="(item,index) in categoryData" :key="index">
						<view :class="'health-category-normal '+(item.isActive ? `health-category-active` : '')"
							:data-index="index" @tap="btnDropChange">
							{{item.name}}
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
		<view class="health-block">
			<block v-for="(item,index) in spuList" :key="index">
				<view class="health-spu" @click="showSpu" :data-index="index">
					<view >
						<image :src="item.spu_pic" class="health-spu-image"></image>
					</view>
					<view class="health-spu-desc">
						<view class="health-spu-top">{{item.spu_name}}</view>
						<view class="health-spu-middle">上架时间: {{item.spu_add_time}}</view>
						<view class="health-spu-bottom">￥{{item.spu_price}}</view>
					</view>
				</view>
			</block>
			<view v-if="spuList.length === 0">
				<no-data></no-data>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
		    <view class="health-popup">
				<view>
					<view class="health-title">产品简介</view>
					<image mode="widthFix" :src="curSpu.spu_data.spu_desc.pic"></image>
					<view style="font-size: 14px;color: gray;padding: 10px 0;">
						详情描述: {{curSpu.spu_data.spu_desc.desc}}
					</view>
					<view class="flex-center">
						<view>
							<button class="health-btn-margin-200" @click="navigateInfo(curSpu.spu_id)">立即购买</button>
							<button class="health-btn-margin-200" @click="hideSpu">取消</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import mySwiper from '@/my-components/my-swiper/my-swiper.vue';
	import noData from '@/my-components/no-data/index.vue';
	import {
		category
	} from '@/common/contant.js'
	import HEALTH_API from '@/common/api.js';
	export default {
		components: {
			mySwiper,
			noData
		},
		data() {
			return {
				searchVal: '',
				categoryIdx: 0,
				curSpu: {},
				allSpuList: [],
				categoryData: [{
					name: category[0],
					isActive: true,
					params: 0
				}, {
					name: category[1],
					isActive: false,
					params: 1
				}, {
					name: category[2],
					isActive: false,
					params: 2
				}, {
					name: category[3],
					isActive: false,
					params: 3
				}, {
					name: category[4],
					isActive: false,
					params: 4
				}]
			}
		},
		onLoad() {
			this.getSpuList()
		},
		async onPullDownRefresh(){
			await this.getSpuList()
			uni.stopPullDownRefresh()
		},
		computed:{
			spuList(){
				const res = this.allSpuList;
				if(this.searchVal){
					return res.filter(i=>i.spu_name.includes(this.searchVal));
				}
				if(this.categoryActive[0] === this.categoryData[0].params){
					return res;
				}else{
					return res.filter(i=>{
						if(this.categoryActive.includes(i.spu_type)){
							return true;
						}
					})
				}
			},
			categoryActive(){
				const resData = []
				this.categoryData.map(i=>{
					if(i.isActive){
						resData.push(i.params);
					}
				})
				return resData;
			}
		},
		methods: {
			async getSpuList(){
				return this.http.get(HEALTH_API.spu_list).then(({data:{data, code}})=>{
					this.allSpuList = data;
				})
			},
			navigateInfo(id){
				uni.navigateTo({
					url:'/pages/goods/info?spu_id='+id
				})
			},
			hideSpu(){
				this.$refs.popup.close()
			},
			showSpu(e){
				const idx = e.currentTarget.dataset.index;
				this.curSpu = this.spuList[idx]
				this.$refs.popup.open()
			},
			navigateCart(){
				uni.navigateTo({
					url: '/pages/cart/index'
				})
			},
			searchClick() {

			},
			btnDropChange(e) {
				const idx = e.currentTarget.dataset.index;
				const temArr = this.categoryData;
				if (idx === 0) {
					temArr.map((i, j) => {
						if (j === 0) {
							i.isActive = !temArr[0].isActive;
						} else {
							i.isActive = false;
						}
					})
				} else {
					temArr[idx].isActive = !temArr[idx].isActive;
					if(temArr[idx].isActive){
						temArr[0].isActive = false;
					}
				}
				this.categoryData = temArr;
			}
		}
	}
</script>

<style>
	
	.health-img-sm {
		width: 40px;
		height: 40px;
		vertical-align: middle;
	}
	.health-category-normal{
		width: fit-content;
		padding: 0 8px;
		height: 25px;
		border: 0.5px solid rgba(0,0,0,.12);
		border-radius: 15px;
		line-height: 25px;
		text-align: center;
		display: inline-block;
		margin: 5px;
	}
	.health-category-active{
		background-color: #64EDAC;
		color: #fff;
		font-weight: bold;
		border: 0.5px solid #64EDAC;
	}
</style>
