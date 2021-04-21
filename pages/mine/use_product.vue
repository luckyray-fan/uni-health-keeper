<template>
	<view>
		<template v-if="recordList.length === 0">
			<no-data></no-data>
		</template>
		<block v-for="(item,index) in recordList" :key="index">
			<view class="health-spu health-block">
				<view>
					<image :src="item.spu.spu_pic" class="health-spu-image"></image>
				</view>
				<view class="health-spu-desc">
					<view class="health-spu-top">{{item.spu.spu_name}}</view>
					<view class="health-spu-middle">购买时间: {{item.order.order_add_time.slice(0,10)}}</view>
					<view class="health-spu-bottom">剩余可用服务: {{computeService(item)}}</view>
				</view>
				<view class="flex-center">
					<button class="health-btn health-appoint-btn box-shadow" @tap="showReserve(item)">预约</button>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import noData from '@/my-components/no-data/index.vue'
	import HEALTH_API from '@/common/api.js'
	import {SERVICE_STATUS} from '@/common/contant.js'
	export default {
		components:{
			noData
		},
		data() {
			return {
				recordList: [{
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
		onLoad() {
			this.getRecordList();
		},
		async onPullDownRefresh() {
			await this.getRecordList();
			uni.stopPullDownRefresh()
		},
		methods: {
			showReserve(item){
				const services = Object.values(item.service_status)
				uni.showActionSheet({
				    itemList: services.map(i=>i.service_name),
				    success: (res)=> {
				        this.navigateService(services[res.tapIndex].service_id)
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			async getRecordList(){
				await this.http.get(HEALTH_API.record_list).then(({data:{code,data}})=>{
					if(code === 0){
						this.recordList = data;
					}
				})
			},
			computeService(item){
				return Object.keys(item.service_status).filter(i=>{
					if(item.service_status[i].status === SERVICE_STATUS.not_reserve)
						return true
				}).length
			},
			navigateService(id){
				uni.navigateTo({
					url: '/pages/service/index?service_id'+id
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
