<template>
	<view>
		<uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
		<view class="health-block">
			<view class="health-line">
				<view class="health-label">服务名称</view>
				<view class="health-item">{{service.service_name}}</view>
			</view>
			<view class="health-line">
				<view class="health-label">预约日期</view>
				<view class="health-item" @tap="openCalendar">{{reserve_date}}</view>
			</view>
			<view class="health-line">
				<view class="health-label">预约地点</view>
				<view class="health-item">山东大学附属医院</view>
			</view>
			<view class="health-line">
				<view class="health-label">预约人</view>
				<view class="health-item">
					<uni-easyinput v-model="name" placeholder="请输入姓名"></uni-easyinput>
				</view>
			</view>
			<view class="health-line">
				<view class="health-label">联系方式</view>
				<view class="health-item">
					<uni-easyinput v-model="phone" placeholder="请输入手机号"></uni-easyinput>
				</view>
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
				<block v-for="(item,index) in selectApparatusTime" :key="index">
					<view style="background-color: #E5E5E5;" class="health-appoint-time-item health-view-btn"
						v-if="disable_time.some(i=>i[0]==item[0])" @click="handleCannotSelect">{{item[0]}}:00 ~
						{{item[1]}}:00
					</view>
					<view v-else :class="'health-appoint-time-item health-view-btn '+(selectTime === index?'active':'')"
						@click="handleSelectTime(index)"> {{item[0]}}:00 ~ {{item[1]}}:00 </view>
				</block>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="health-popup">
				<view style="width: 300px;">
					该时段无法预约
				</view>
			</view>
		</uni-popup>
		<view class="health-bottom flex-end">
			<button class="health-btn" @click="handleReserve">立即预约</button>
		</view>
	</view>
</template>

<script>
	import HEALTH_API from '@/common/api.js'
	export default {
		data() {
			return {
				reserve_date: '选择日期>',
				service_id: 2,
				name: '',
				phone: '',
				service: {

				},
				selectTime: undefined,
				selectApparatus: 0,
			}
		},
		onLoad(opt) {
			uni.showModal({
				title: '提示',
				content: '仅限未使用过的用户, 一个手机号一次'
			})
			this.getService(this.service_id)
		},
		async onPullDownRefresh() {
			await this.getService(this.service_id);
			uni.stopPullDownRefresh()
		},
		computed: {
			disable_time() {
				const today = (new Date(Date.now() + 8 * 60 * 60 * 1000)).toISOString().slice(0, 10)
				const hour = new Date().getHours();
				let res = []
				if (this.reserve_date === today) {
					res = this.selectApparatusTime.filter(i => {
						if (i[0] <= hour)
							return true;
					})
				}
				this.service.reserve[this.selectApparatus].map(i => {
					if (i.reserve_date === this.reserve_date) {
						res.push(i.reserve_time);
					}
				})
				return res
			},
			selectApparatusTime() {
				if (!this.service.apparatusArr) return [
					[]
				]
				return JSON.parse(this.service.apparatusArr[this.selectApparatus].apparatus_time)
			}
		},
		methods: {
			handleCannotSelect() {
				this.$refs.popup.open();
			},
			handleReserve() {
				this.http.post(HEALTH_API.reserve, {
					reserve_date: this.reserve_date,
					reserve_time: this.selectApparatusTime[this.selectTime],
					reserve_apparatus: this.service.apparatusArr[this.selectApparatus].apparatus_id,
					reserve_service: this.service_id,
					reserve_data: {
						name: this.name,
						phone: this.phone
					}
				}).then(({
					data: {
						data,
						code,
						msg
					}
				}) => {
					if (code === 0) {
						uni.showToast({
							title: '预约成功, 请按照预约时间前往!'
						})
					} else {
						uni.showToast({
							title: msg,
							icon: 'none'
						})
					}

				})
			},
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
