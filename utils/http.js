import Request from 'luch-request';
export const http = new Request();

console.log(http)
/* 请求之前拦截器 */
http.interceptors.request.use((config, cancel) => {
	console.log(config);
  config.header.Authorization = 'Bearer '+ uni.getStorageSync('jwtToken');
  return config
})

// http.interceptor.response(async (response) => { /* 请求之后拦截器 */
//     console.log(response);
//     // 如果是需要权限认证的路由
//     return response
// }, (response) => { // 请求错误做点什么
//     // if(response.statusCode == 401){
//     //     getApp().globalData.isLogin = false;
//     //     uni.showToast({icon:'none',duration:2000,title: "请登录"})
//     // }else if(response.statusCode == 403){
//     //     uni.showToast({
//     //         title: "您没有权限进行此项操作，请联系客服。",
//     //         icon: "none"
//     //     });
//     // }
//   return response
// })

export const pureHttp = new Request();