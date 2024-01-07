/**
 * 把wx.request封装成promise
 * @param {*} params wx.request支持的参数
 * @returns Promise
 */

function request(params) {
	let token = uni.getStorageSync("token")
	var header = {
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest"
	}
	if (token) {
		// header["token"] = token;
		header["Authorization"] = `${token}`
	} else {
		header["Authorization"] = " "
	}

	return new Promise((resolve, reject) => {
		wx.request({
			header: header,
			url: `192.168.0.102:3000/${params.url}`, 
			method: params.method,
			data: params.data,
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

export default request