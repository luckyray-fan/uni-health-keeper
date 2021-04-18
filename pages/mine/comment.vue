<template>
	<view>
		<tab-nav :tabList="tabList" :dataList="commentList">
			<template v-slot="{dataItem, idx}">
				<block v-for="(item,index) in dataItem" :key="index">
					<view class="health-spu" @click="showSpu" :data-index="index" v-if="item.has_comment">
						<view >
							<image :src="item.spu_pic" class="health-spu-image"></image>
						</view>
						<view class="health-spu-desc">
							<view class="health-spu-top">{{item.spu_name}}</view>
							<view class="health-spu-middle">{{item.spu_add_time}}</view>
							<view class="health-spu-bottom">￥{{item.spu_price}}</view>
						</view>
					</view>
					<view v-else>
						<comment></comment>
					</view>
				</block>
			</template>
		</tab-nav>
	</view>
</template>

<script>
	import tabNav from '@/my-components/tab-nav/index.vue';
	import comment from '@/my-components/comment/index.vue';
	export default {
		components: {
			tabNav,
			comment
		},
		data() {
			return {
				tabList: [{
					name: '未评价'
				}, {
					name: '已评价'
				}],
				commentList: {
					0: [{
						spu_name: '成人全套套餐评估',
						spu_pic: 'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
						spu_add_time: '2021-01-22',
						spu_price: '2000',
						num: 1,
						selected: false,
						has_comment: false
					}],
					1: [{
						spu_name: '成人全套套餐评估',
						spu_pic: 'https://img13.360buyimg.com/n7/jfs/t1/27652/18/12464/928612/5c985ce1Eaa45fcdb/1fb4aa796250c8b6.png',
						spu_add_time: '2021-01-22',
						spu_price: '2000',
						num: 1,
						selected: false,
						has_comment: true
					}]
				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
</style>
