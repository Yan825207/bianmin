/**
 * 首页
 */

import request from "@/utils/request";

export function publishImgs(data) {
	return request({
		url: "publish/trendsImgs",
		method: "POST",
		data:data
	});
}
export function publishTrend (data){
	return request({
		url: "publish/trend",
		method: "POST",
		data:data
	});
}

export function getList(data){
	return request({
		url: "getTrendList",
		method: "GET",
		data:data
	});
}