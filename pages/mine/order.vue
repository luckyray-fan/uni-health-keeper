<template>
	<view class="health-tab-page">
		<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="health-tab"></wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange" style="flex:1">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<view class="">
					<template v-if="index!==3">
						<order-item :spuList="orderList[index]"></order-item>
					</template>
					<template v-else >
						<view class="health-flex text-center health-block">
							<view class="flex-1">
								
							</view>
							<view class="flex-4">预约项目</view>
							<view class="flex-4">开始时间</view>
							<view class="flex-1">操作</view>
						</view>
						<block v-for="(i, idx) in orderList[3]" :key="idx">
							<view class="health-flex health-block text-center">
								<view class="flex-1">
									<radio color="#64EDAC" :checked="i.selected" @click="itemCheck" :data-index="idx"></radio>
								</view>
								<view class="flex-4">{{i.spu_name}}</view>
								<view class="flex-4">{{i.order_date}}</view>
								<view class="flex-1">详情</view>
							</view>
						</block>
						<view class="health-bottom flex-center">
							<button class="health-btn">取消预约</button>
						</view>
					</template>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import orderItem from '@/my-components/order-item/index.vue'
	export default {
		components:{
			orderItem
		},
		onLoad(opt){
			this.TabCur = +opt.cur;
		},
		data() {
			return {
				TabCur: 0,
				tabList: [{
					name: '全部'
				}, {
					name: '待支付'
				},{
					name: '待使用'
				},{
					name: '预约中'
				}],
				orderList: {
					0:[{
				spu_name: '成人全套套餐评估',
				spu_pic: 'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
				spu_add_time: '2021-01-22',
				spu_price: '2000',
				num: 1,
				selected: false
			}],3:[{
				spu_name: '成人全套套餐评估',
				spu_pic: 'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
				spu_add_time: '2021-01-22',
				order_date: '2021-01-22 11:00',
				spu_price: '2000',
				num: 1,
				selected: false
			}]
				}
			}
		},
		methods: {
			tabChange(index) {
				this.TabCur = index;
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
