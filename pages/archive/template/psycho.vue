<template>
	<block>
		<view class="health-block">
			<view class="health-line">
				<view>快乐指数</view>
				<view class="health-sm-font">正常范围: 28 ~ 32.8</view>
			</view>
			<view class="health-bottom-line"></view>
			<view class="health-report-content">
				<view class="health-report-column" style="position: relative;font-size: 14px;">
					<view
						style="margin: 0 auto;border-radius: 15px; height:180px;width:15px;background: linear-gradient(to bottom, red, orange, yellow, green, blue);">
					</view>
					<view style="width: 80%;margin: 0 auto;position: absolute;left: 10%; top: 0;line-height: 35px;">
						<view style="display: flex;">
							<view style="flex: 1;color: gray;">32.5</view>
							<view style="flex: 4;border-bottom: 1px dashed #C8C7CC;text-align: right;">很兴奋</view>
						</view>
						<view style="display: flex;">
							<view style="flex: 1;color: gray;">30.1</view>
							<view style="flex: 4;border-bottom: 1px dashed #C8C7CC;text-align: right;">开心</view>
						</view>
						<view style="display: flex;">
							<view style="flex: 1;color: gray;">28</view>
							<view style="flex: 4;border-bottom: 1px dashed #C8C7CC;text-align: right;">一般</view>
						</view>
						<view style="display: flex;">
							<view style="flex: 1;color: gray;">24.9</view>
							<view style="flex: 4;border-bottom: 1px dashed #C8C7CC;text-align: right;">低落</view>
						</view>
						<view style="display: flex;">
							<view style="flex: 1;color: gray;">20</view>
							<view style="flex: 4;border-bottom: 1px dashed #C8C7CC;text-align: right;">难受</view>
						</view>
					</view>
				</view>
				<view class="health-report-column" style="padding-left: 10px;">
					<view style="margin-bottom: 10px;font-size: 14px;">
						您当前 &nbsp;<view style="color: #64EDAC; font-size: 16px;display: inline-block;margin-left: 5px;">
							心情低落</view>
					</view>
					<view style="font-size: 14px;">
						指数数值 &nbsp;<view style="color: #64EDAC; font-size: 15px;display: inline-block;margin-left: 5px;">
							{{reserve.reserve_data.psycho.happy}}
						</view>
					</view>
				</view>
			</view>
			</view>
		</view>
		<view class="health-block">
			<view>
				<view style="display: inline-block;">心理健康评分</view>
				<view class="health-sm-font"><text style="color: #F0AD4E;font-size: 15px;">不健康</text>: 30~60 <text
						style="color: #a3b5ca;font-size: 15px;"> {{' '}} 亚健康</text>: 60~80 <text
						style="color: #64EDAC;font-size: 15px;">{{' '}} 健康</text>: 80~100 </view>
			</view>
			<view class="health-bottom-line"></view>
			<view class="health-report-content">
				<view class="health-report-column" style="width: 150px;height: 150px;">
					<qiun-data-charts type="gauge" :chartData="chartData()" :opts="opts" />
				</view>
				<view class="health-report-column"
					style="padding-left: 10px;vertical-align: top;    padding-top: 30px;">
					<view>
						<view><text style="color: #4CD964;">{{reserve.reserve_data.psycho.health}}</text>分</view>
						<view style="font-size: 14px;color: gray;">您的心理基本保持健康, 请继续加油!</view>
					</view>
				</view>
			</view>
		</view>
	</block>
</template>

<script>
	export default {
		name: 'psycho',
		props: {
			reserve: Object
		},
		data() {
			return {}
		},
		methods: {
			chartData() {
				return {
					categories: [{
							value: 0.3,
							color: '#ab0914'
						},
						{
							value: 0.6,
							color: '#F0AD4E'
						}, {
							value: 0.8,
							color: '#a3b5ca'
						}, {
							value: 1,
							color: '#64EDAC'
						}
					],
					series: [{
						name: '完成率123',
						data: this.reserve.reserve_data.psycho.health/100
					}]
				}
			}
		},
		computed: {
			opts() {
				return {
					"subtitle": {
						"name": "",
						"fontSize": 15,
						"color": "#1890ff",
						"offsetX": 0,
						"offsetY": -50
					},
					"title": {
						"name": "",
						"fontSize": 25,
						"color": "#2fc25b",
						"offsetX": 0,
						"offsetY": 50
					},
					"extra": {
						"gauge": {
							"type": "default",
							"width": 10,
							"labelColor": "#666666",
							"labelOffset": 13,
							"startAngle": 0.75,
							"endAngle": 0.25,
							"startNumber": 0,
							"endNumber": 100,
							"format": "",
							"splitLine": {
								"fixRadius": 0,
								"splitNumber": 10,
								"width": 30,
								"color": "#FFFFFF",
								"childNumber": 5,
								"childWidth": 12
							},
							"pointer": {
								"width": 14,
								"color": "auto"
							},
							"labelFormat": ""
						},
					}
				}
			},
			
		}
	}
</script>

<style lang="scss">
</style>
