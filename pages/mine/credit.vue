<template>
	<view>
		<view class="health-flex text-center health-block">
			<view class="flex-4">日期</view>
			<view class="flex-4">产品名称</view>
			<view class="flex-2">积分</view>
		</view>
		<block v-for="(i, idx) in creditList" :key="idx" v-if="creditList.length">
			<view class="health-flex health-block text-center">
				<view class="flex-4">{{i.service.service_name}}</view>
				<view class="flex-4">{{convertReserveTime(i)}}</view>
				<view class="flex-2">详情</view>
			</view>
		</block>
		<view v-if="creditList.length === 0" class="health-block">
			<no-data></no-data>
		</view>
	</view>
</template>

<script>
	import HEALTH_API from '@/common/api.js';
	import noData from '@/my-components/no-data/index.vue'
	export default {
		components:{
			noData
		},
		data() {
			return {
				creditList: []
			}
		},
		onLoad() {
			this.getCredit();
		},
		async onPullDownRefresh() {
			await this.getCredit();
			uni.stopPullDownRefresh();
		},
		methods: {
			async getCredit(){
				this.http.get(HEALTH_API.credit_list).then(({data:{code,data}})=>{
					if(code === 0){
						this.creditList = data;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
