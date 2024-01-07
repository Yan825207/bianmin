import Vue from "vue";
import Vuex from "vuex";

// 引入模块
import user from "./modules/user"; // 用户
import index from "./modules/index"
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user,
		index,
	},
});
