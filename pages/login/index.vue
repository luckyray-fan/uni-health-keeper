<template>
	<view class="flex-center" style="height: 90%;">
		<view class="health-block" style="width: 80%;height: 60%;">
			<div class="health-title">欢迎来到健康管家</div>
			<view class="health-tab-page">
				<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" tabClass="health-tab"></wuc-tab>
				<swiper :current="TabCur" duration="300" @change="swiperChange" style="flex:1">
					<swiper-item v-for="(item,index) in tabList" :key="index">
						<view class="health-login">
							<template v-if="TabCur == 0">
								<uni-easyinput v-model="user" placeholder="请输入手机号"></uni-easyinput>
								<uni-easyinput type="password" v-model="pass" placeholder="请输入密码"></uni-easyinput>
								<button class="health-btn" @click="login()">登录</button>
							</template>
							<template v-else>
								<uni-easyinput v-model="user" placeholder="请输入手机号"></uni-easyinput>
								<uni-easyinput type="password" v-model="pass" placeholder="请输入密码"></uni-easyinput>
								<uni-easyinput type="password" v-model="repass" placeholder="请再输入一遍密码"></uni-easyinput>
								<button class="health-btn" @click="register()">注册</button>
							</template>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur:0,
				tabList:[
					{name: '登录'},
					{name: '注册'}
				],
				user: '',
				pass: '',
				repass: '',
			}
		},
		computed:{
		
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
			},
			changeStatus(status){
				if(status === 1){
					this.isLogin = false;
					this.isRegister = true;
				}else{
					this.isLogin = true;
					this.isRegister = false;
				}
			},
			login() {
				this.http.post('http://localhost:3000/api/user/login', {
					user: this.user,
					pass: this.pass
				}).then(res => {
					if(res.data.code === 0){
						uni.setStorageSync('jwtToken', res.data.data.token)
						uni.setStorageSync('user', res.data.data.payload)
						uni.showToast({ 
						    title: '登录成功',
						});
						setTimeout(i=>uni.switchTab({
						    url: '/pages/mine/index'
						}),1500)
						return;
					}
					uni.showToast({
					    title: '登录失败',
					    duration: 2000,
						icon:'none'
					});
				}).catch(err => {
					uni.showToast({
					    title: '网络异常',
					    duration: 2000,
					    icon:'none'
					});
				})
			},
			register() {
				this.http.post('http://localhost:3000/api/user/register', {
					user: this.user,
					pass: this.pass,
					repass: this.repass
				}).then(res => {
					if(res.data.code === 0){
							uni.showToast({
							    title: '注册成功',
							    duration: 2000
							});
							this.changeStatus()
							this.TabCur = 0;
							return;
						}
						uni.showToast({
						    title: '注册失败',
						    duration: 2000,
							icon:'none'
						});
					}).catch(err => {
						uni.showToast({
						    title: '网络异常',
						    duration: 2000,
						    icon:'none'
						});
					})
			}
		}
	}
</script>

<style lang="scss">
	.health-login {
		height: 80%;
		.health-btn{
			width: 200px;
			margin:  0 auto;
		}
		& /deep/ .uni-easyinput{
			margin:  8px 0;
		}
	}
</style>
