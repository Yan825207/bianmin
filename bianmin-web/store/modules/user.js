/**
 * 用户
 */

import {
	user_login,
	user_register,
	user_uploadUserAvatar
} from "@/servers"
import Toast from '@vant/weapp/dist/toast/toast';
import Dialog from '@vant/weapp/dist/dialog/dialog';

const state = {
	info:""
};
const getters = {};

const mutations = {
	update(state, payload) {
		for (let key in payload) {
			state[key] = payload[key];
		}
	},
};

const actions = {
	// 登录
	async Login({commit},payload) {
		let result = await user_login(payload);
		if (result.status == 200) {
			uni.setStorageSync("token", result.token)
			uni.setStorageSync("user", result.result[0])
			// 登录成功
			commit("update", {
				info: result.result
			})
			Toast("登录成功")
			uni.switchTab({
				url:"/pages/index/index",
			})
			Toast("登录成功")
			
		}else{
			Dialog.alert({
			  title: '登录失败',
			  message: '用户名或密码错误，请重新登录！',
			}).then(() => {
			  // on close
			});
		}
	},
	// 注册
	async register({commit},payload){
		let result = await user_register(payload)
		if(result.code == 200){
			Toast("注册成功")
			setTimeout(()=>{
				uni.switchTab({
					url:"/pages/index/index"
				})
			},500)
		}else{
			if(result.message){
				Toast(result.message)
			}else{
				Toast("注册失败，请稍后重试！")
			}
		}
	},
	// 上传头像
	async uploadUserAvatar({commit},payload){
		let result = await user_uploadUserAvatar(payload)
		return result
	}
	
};


export default {
	namespaced: true,
	modules: {},
	state,
	getters,
	mutations,
	actions,
};