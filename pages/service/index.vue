<template>
	<view>
		<uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
		<view class="health-block">
			<view class="health-line">
				<view class="health-label">服务名称</view>
				<view class="health-item">服务名称</view>
			</view>
			<view class="health-line">
				<view class="health-label">预约日期</view>
				<view class="health-item" @tap="openCalendar">{{reserve_date}}</view>
			</view>
			<view class="health-line">
				<view class="health-label">预约地点</view>
				<view class="health-item">山东大学附属医院</view>
			</view>
		</view>
		<view class="health-block">
			<view class="health-appoint-title">请选择预约时间</view>
			<view style="text-align: center;margin: 15px;">仪器: {{service.service_name}}</view>
			<view class="flex-center">
				<block v-for="(item,index) in service.service_apparatus" :key="index">
					<view :class="'health-appoint-time-item health-view-btn '+(selectApparatus === index?'active':'')"
						@click="handleSelectApparatus(index)"> 序号: {{index}} </view>
				</block>
			</view>
			<view class="health-appoint-time">
				<block v-for="(item,index) in JSON.parse(service.apparatusArr[selectApparatus].apparatus_time)" :key="index">
					<view :class="'health-appoint-time-item health-view-btn '+(selectTime === index?'active':'')"
						@click="handleSelectTime(index)"> {{item[0]}}:00 ~ {{item[1]}}:00 </view>
				</block>
			</view>
		</view>
		<view class="health-bottom flex-end">
			<button class="health-btn">立即预约</button>
		</view>
	</view>
</template>

<script>
	import HEALTH_API from '@/common/api.js'
	export default {
		data() {
			return {
				reserve_date: '选择日期>',
				service_id: -1,
				service: {
					service_time: [
						[8, 9],
						[9, 10],
						[10, 11],
						[10, 12],
						[14, 15],
						[15, 16]
					],
					service_name: '血液检查仪'
				},
				selectTime: undefined,
				selectApparatus: 0,
			}
		},
		onLoad(opt) {
			this.service_id = opt.service_id;
			this.getService(opt.service_id)
		},
		async onPullDownRefresh() {
			await this.getService(this.service_id);
			uni.stopPullDownRefresh()
		},
		methods: {
			confirm(e) {
				this.reserve_date = e.fulldate;
			},
			async getService(service_id) {
				return this.http.get(HEALTH_API.service, {
					params: {
						service_id
					}
				}).then(({
					data: {
						data,
						code
					}
				}) => {
					this.service = data;
				})
			},
			openCalendar() {
				this.$refs.calendar.open()
			},
			handleSelectApparatus(idx) {
				this.selectApparatus = idx
			},
			handleSelectTime(idx) {
				this.selectTime = idx;
			}
		}
	}
</script>

<style lang="scss">
	.health-appoint-title {
		font-size: 18px;
		color: #fff;
		border-radius: 5px;
		padding: 5px;
		background-color: #64EDAC;
	}

	.health-appoint-time {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		&-item {
			width: 110px;
			margin: 5px;
		}
	}
</style>
