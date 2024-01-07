function getBase64ImageUrl(base64Url) {
	/// 获取到base64Data
	var base64Data = base64Url;
	/// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
	base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
	/// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
	const base64ImgUrl = "data:image/png;base64," + base64Data;
	/// 得到的base64ImgUrl直接给图片:src使用即可
	return base64ImgUrl;
}

export default getBase64ImageUrl
