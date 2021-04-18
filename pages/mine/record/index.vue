<template>
	<view class="health-tab-page">
		<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="health-tab">
		</wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange" style="flex:1">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<view class="">

				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				tabList: [{
					name: '预约记录'
				}, {
					name: '评价记录'
				}, {
					name: '积分记录'
				}],
			}
		},
		onLoad(option){
			this.TabCur = +option.cur;
		},
		methods: {

		}
	}
</script>

<style lang="scss">
</style>
