/**
 * 用户
 */

import request from "@/utils/request";

export function user_login(data) {
	return request({
		url: "userInfo/login",
		method: "POST",
		data:data
	});
}

export function user_register(data) {
	return request({
		url: "userInfo/register",
		method: "POST",
		data:data
	});
}

export function user_uploadUserAvatar(data) {
	return request({
		url: "userInfo/uploadUserAvatar",
		method: "PUT",
		data:data
	});
}
