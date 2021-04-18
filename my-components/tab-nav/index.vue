<template>
	<view>
		<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="health-tab">
		</wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange" style="flex:1">
			<swiper-item v-for="(item,index) in tabList" :key="index" >
				<template>
					<slot :dataItem="dataList[index]" :idx="{index}"></slot>
				</template>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'tabNav',
		props: {
			tabList: {
				type: Array
			},
			dataList: {
				type: Object
			}
		},
		data() {
			return {
				TabCur: 0
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
