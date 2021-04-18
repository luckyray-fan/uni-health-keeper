<template>
	<view>
		<div>请设置您的个人信息</div>
		<view class="health-block">
			<div @click="upload()" class="health_avatar">
				<image :src="user_data.avatar||'http://img.luckyray.cn/wxb1eb11cbeccb04cf.o6zAJsyTls2wZLWjdzVk8WlvhrLk.d8cXgV2v09EL739297c3ec0f727c32c8135aca85df15.png'"></image>
			</div>
			<view style="text-align: center;">头像</view>
		</view>
		<view class="health-block">
			昵称 <uni-easyinput v-model="user_data.nick" placeholder="昵称"></uni-easyinput>
			手机号 <uni-easyinput v-model="user" placeholder="手机号"></uni-easyinput>
			<view class="health-pass-update">
				<view>登录密码</view>
				<view @click="openDialog()">修改密码></view>
			</view>
			<button class="health-btn" @click="update()">提交</button>
			<button class="health-btn" type="default" @click="quit()">退出登录</button>
		</view>
		<uni-popup ref="popup" type="center">
		    <view class="health-popup">
				<view style="width: 300px;">
					密码
					<uni-easyinput type="password" v-model="pass" placeholder="密码" width=""></uni-easyinput>
					再次输入密码
					<uni-easyinput type="password" v-model="repass" placeholder="再次输入密码"></uni-easyinput>
					<button type="default" @click="update(true)">确定修改</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: '',
				pass: '',
				repass:'',
				user_data:{
					nick: '',
					avatar: '',
				}
			}
		},
		onLoad(){
			const user = uni.getStorageSync('user');
			this.user = user.user;
			this.user_data = {...this.user_data,...(user.user_data||{})}
		},
		computed: {

		},
		methods: {
			openDialog(){
				this.$refs.popup.open()
			},
			quit(){
				uni.setStorageSync('jwtToken', '')
				uni.setStorageSync('user', '');
				uni.showToast({
				    title: '退出成功',
				});
				uni.navigateTo({
				    url: '/pages/login/index'
				});
			},
			upload(){
				const that = this;
				const file = uni.chooseImage({
					success(res) {
						const file = res.tempFilePaths[0];
						that.http.upload('http://localhost:3000/api/upload', {
						    params: {}, /* 会加在url上 */
						    filePath: file, // 要上传文件资源的路径。
						    name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
						    // #ifdef H5 || APP-PLUS
						    timeout: 3000, // H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)
						    // #endif
						    header: {}, /* 会与全局header合并，如有同名属性，局部覆盖全局 */
						    custom: {}, // 自定义参数
						    formData: {}, // HTTP 请求中其他额外的 form data
						    // 返回当前请求的task, options。请勿在此处修改options。非必填
						    getTask: (task, options) => {
						      // setTimeout(() => {
						      //   task.abort()
						      // }, 500)
						    },
						  }).then(({data:{data}}) => {
						    that.user_data = {...that.user_data, avatar: data};
						  }).catch(err => {
						
						  })
					}
				})
			},
			update(isPass) {
				if(isPass){
					if(this.pass !== this.repass){
						uni.showToast({
							title:'两次输入的密码不同',
							icon: null
						})
						return;
					}
					this.http.post('http://localhost:3000/api/user/update/pass',{
						pass:this.pass,
						repass: this.repass
					}).then(res => {
					if (res.data.code === 0) {
						uni.showToast({
							title:'更新密码成功',
						})
						setTimeout(i=>uni.navigateTo({
								url: '/pages/login/index'
							}), 1500)
					}})
					return;
				}
				this.http.post('http://localhost:3000/api/user/update',{
					user_data: this.user_data,
					user: this.user
				}).then(res => {
					if (res.data.code === 0) {
						uni.setStorageSync('jwtToken', res.data.data.token)
						uni.setStorageSync('user', res.data.data.payload)
						uni.showToast({
							title: '更新成功',
						});
						setTimeout(()=>{
							uni.switchTab({
								url: '/pages/mine/index'
							})
						}, 2000)
						return;
					}
					uni.showToast({
						title: '更新失败',
						duration: 2000,
						icon: 'none'
					});
				}).catch(err => {
					uni.showToast({
						title: '网络异常',
						duration: 2000,
						icon: 'none'
					});
				})
			}
		}
	}
</script>

<style>
	.health-btn{
		width: 200px;
		margin: 8px auto;
	}
	.health_avatar{
		width: 80px;
		height: 80px;
		margin: 15px auto;
		border-radius: 50%;
	}
	.health_avatar image{
		width: 100%;
		height: 100%;		
		border-radius: 50%;
	}
	.health-pass-update{
		display:flex;justify-content:space-between;
			height: 30px;
			margin: 5px 0;
	}
	.health-pass-update view:nth-child(2){
		font-size: 14px;
		color: #BCBEC2;
		height: 30px;
		line-height: 30px;
	}
</style>
