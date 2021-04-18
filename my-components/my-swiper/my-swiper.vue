<template>
<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			<swiper class="swiper-box" @change="change" autoplay="true">
				<swiper-item v-for="(item ,index) in healthHomePics" :key="index">
					<view class="swiper-item">
						<image :src="item"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
</template>

<script>
	export default {
		name: 'mySwiper',
		props: {
			
		},
		data() {
			return {
				healthHomePics: [1, 2, 3, 4].map(i => 'http://img.luckyray.cn/health_home_' + i + '.jpg'),
				current: 0,
				mode: 'round',
			};
		},
		watch: {
			
		},
		mounted() {
			
		},
		methods: {
			
		}
	};
</script>

<style lang="scss" scoped>
	.swiper-box{
		width: 100%;
		image{
			width: 100%;
		}
	}
	</style>