<template>
	<view class="health-block health-line">
		<view class="health-line-pic"  @click="openOrder">
			<view style="width: 1000px">
				<block v-for="(item,index) in spuList" :key="index">
					<image :src="item.spu_pic" class="health-spu-image"></image>
				</block>
				<view v-if="spuList.length === 1" style="display: inline-block;height: 100px;vertical-align: middle;">
					{{spuList[0].spu_name}}
				</view>
			</view>
		</view>
		<view  class="flex-center">
			<view>
				<view>¥ {{sumPrice}}</view>
				<view style="font-size: 12px;color: gray">共 {{sum}} 件</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="health-popup">
				<view>
					<view>商品清单</view>
					<view>共 {{sum}} 件</view>
				</view>
				<block v-for="(item,index) in spuList" :key="index">
					<view class="health-spu health-block">
						<view>
							<image :src="item.spu_pic" class="health-spu-image"></image>
						</view>
						<view class="health-spu-desc">
							<view class="health-spu-top">{{item.spu_name}}</view>
							<view class="health-spu-middle">上架时间: {{item.spu_add_time.slice(0,10)}}</view>
							<view class="health-spu-bottom">￥{{item.spu_price}}</view>
						</view>
						<view class="health-spu-right">
							<view>
								<count :disable="true" :num="item.num" @change="countChange($event, index)"></count>
							</view>
						</view>
					</view>
				</block>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import count from '@/my-components/count/index.vue'
export default {
	name: 'orderItem',
	components:{
		count
	},
	props:{
		spuList:{
			type: Array
		}
	},
		data() {
		return {
			
		}
		},
		computed:{
			sum(){
				let res = 0;
				this.spuList.map(i=>{
					res+=i.num;
				})
				return res;
			},
			sumPrice(){
				let res = 0;
				this.spuList.map(i=>{
					res+=i.num*i.spu_price;
				})
				return res;
			}
		},
		methods:{
		openOrder(){
			this.$refs.popup.open();
		},
		}
}
</script>

<style lang="scss">
</style>
