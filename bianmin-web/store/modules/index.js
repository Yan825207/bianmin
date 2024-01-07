/**
 * 用户
 */

import {
	publishImgs,
	publishTrend,
	getList
} from "@/servers"
import Toast from "@vant/weapp/dist/toast/toast";

const state = {
	fileListServe: [],
	trendList: []
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
	// 上传动态图片
	async publishUploadIdleItemsImg({
		commit
	}, payload) {
		let result = await publishImgs(payload);
		console.log(result);
		let data = [...state.fileListServe, result.src]
		commit("update", {
			fileListServe: data
		})
		console.log(state.fileListServe);
	},
	// 发布动态
	async releaseTrend({
		commit
	}, payload) {
		let result = await publishTrend(payload);
		if (result.status == 200) {
			Toast("发布成功")
			setTimeout(() => {
				uni.switchTab({
					url: "/pages/index/index"
				}, 1000000)
			})

			Toast("注册成功")
			setTimeout(() => {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}, 500)
		};
	},
	// 清除数据

	async getTrendList({
		commit
	}, payload) {
		let result = await getList(payload);
		if (result.status == 200) {
			commit("update", {
				trendList: [...state.trendList, ...result.result]
			})
		}
	},
	async clearData({
		commit
	}, payload) {
		commit("update", {
			trendList: []
		})
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
