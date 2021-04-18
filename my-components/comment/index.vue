<template>
	<view>
		<view v-for="(data,index) in commentList" :key="index" style="padding: 0 8px;">
			<view style="margin-top: 15px;">
				<view style="display: flex;">
					<image class="image-size-40" style="border-radius: 50%;" mode="widthFix" :src="data.comment_user.user_data.avatar"></image>
					<view style="display: flex;flex-direction: column;margin-left: 12px;">
						<view>{{data.comment_user.user_data.nick}}</view>
						<view>
							{{data.comment_add_time.slice(0, 10)}}
						</view>
					</view>
				</view>
			</view>
			<view style="display: flex;">
				<uni-rate :value="data.comment_value" size="16" readonly="true"></uni-rate>
				<view style="font-size: 14px; color: gray;margin-left: 15px;">
					{{data.comment_spu.spu_name}}
				</view>
			</view>
			<view style="padding: 12px 8px; border-bottom: 0.5px solid #ebebeb;">
				{{data.comment_content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'comment',
		props: {
			commentList: {
				type: Array
			}
		},
		data() {
			return {}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
</style>
