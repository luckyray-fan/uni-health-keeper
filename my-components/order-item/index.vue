<template>
	<view class="health-block health-line">
		<view>
			<block v-for="(item,index) in spuList" :key="index">
				<image :src="item.spu_pic" class="health-spu-image"></image>
			</block>
		</view>
		<view @click="openOrder">
			共 {{sum}} 件, 查看详情>
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
							<view class="health-spu-middle">{{item.spu_add_time}}</view>
							<view class="health-spu-bottom">￥{{item.spu_price}}</view>
						</view>
						<view>{{item.num}}件</view>
					</view>
				</block>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	name: 'orderItem',
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
