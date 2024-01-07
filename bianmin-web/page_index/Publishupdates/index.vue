<template>
	<view class="Publishupdates">
		<view class="publish">
			<view class="publish_text">
				<van-field :value="publishValue" placeholder="分享有趣的事~" border="false" type="textarea" maxlength="200"
					extra-event-params @change="onChange" :autosize="{
					  maxHeight: 100,
					   minHeight: 150,
				  }" />
			</view>
			<view class="publish_img">
				<van-uploader :file-list="fileList" multiple preview-size="86" max-count="9" @after-read="afterRead" />
			</view>
		</view>
		<view class="release" @click="release">
			发布
		</view>
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '@vant/weapp/dist/toast/toast';
	import {
		mapState
	} from 'vuex';
	import {
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				publishValue: "",
				fileList: [],

			};
		},
		computed: {
			...mapState("index", ["fileListServe"]),
		},
		methods: {
			...mapActions({
				publishUploadIdleItemsImg: "index/publishUploadIdleItemsImg",
				releaseTrend: "index/releaseTrend",
				clearData:"index/clearData"
			}),
			onChange(e) {
				this.publishValue = e.detail.value
			},
			async afterRead(e) {
				this.fileList = [...this.fileList, ...e.detail.file];

			},
			// 图片 转码
			getBase64ImageUrl(base64Url) {
				/// 获取到base64Data
				var base64Data = base64Url;
				/// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
				base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
				/// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
				const base64ImgUrl = "data:image/png;base64," + base64Data;
				/// 得到的base64ImgUrl直接给图片:src使用即可
				return base64ImgUrl;
			},
			async release() {
				// const _this = this
				// const user = uni.getStorageSync("user")
				// if (!this.publishValue) {
				// 	return Toast("分享内容不能为空！！")
				// }
				// for (let i = 0; i < this.fileList.length; i++) {
				//  wx.getFileSystemManager().readFile({
				// 		filePath: this.fileList[i].url, //选择图片返回的相对路径
				// 		encoding: "base64", //这个是很重要的
				// 		success: (res) => { //成功的回调
				// 			//返回base64格式
				// 		await this.publishUploadIdleItemsImg({
				// 				path: this.getBase64ImageUrl(res.data)
				// 			})
				// 		}
				// 	})
				// }
				
			 // _this.releaseTrend({
				// 	content: _this.publishValue,
				// 	fileList: _this.fileListServe,
				// 	id: user ? user.id : ""
				// })
				// console.log(this.fileListServe,this.fileListServe);
				// await this.releaseTrend({
				// 	content: this.publishValue,
				// 	fileList: this.fileListServe,
				// 	id: user ? user.id : ""
				// })
				
				  const _this = this;
				  const user = uni.getStorageSync("user");
				
				  if (!this.publishValue) {
				    return Toast("分享内容不能为空！！");
				  }
				
				  // 定义一个包装异步读取文件的函数
				  const readFileAsync = (filePath) => {
				    return new Promise((resolve, reject) => {
				      wx.getFileSystemManager().readFile({
				        filePath: filePath,
				        encoding: "base64",
				        success: (res) => {
				          resolve(res.data);
				        },
				        fail: (error) => {
				          reject(error);
				        },
				      });
				    });
				  };
				
				  try {
				    // 使用 Promise.all 等待所有异步操作完成
				    const base64ImageArray = await Promise.all(
				      this.fileList.map((file) => readFileAsync(file.url))
				    );
				
				    // 处理 base64 图片数组
				    const imageUploadPromises = base64ImageArray.map((base64Image) => {
				      return _this.publishUploadIdleItemsImg({
				        path: _this.getBase64ImageUrl(base64Image),
				      });
				    });
				
				    // 等待所有图片上传完成
				    await Promise.all(imageUploadPromises);
				
				    // 发布动态
				    _this.releaseTrend({
				      content: _this.publishValue,
				      fileList: _this.fileListServe,
				      id: user ? user.id : "",
				    });
					
					_this.clearData()
					_this.fileList = []
					this.publishValue = ""
				
				  } catch (error) {
				    console.error("An error occurred:", error);
				    // 处理错误情况
				  }
			}
		}
	}
</script>

<style lang="less">
	.Publishupdates {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;

		// background-color: #ccc;
		.publish {
			background-color: #fff;
		}

		.publish_img {
			padding: 0 32rpx;
			display: flex;

		}

		// /deep/.van-uploader__upload {
		// 	width: 80px;
		// 	    height: 80px;
		// 	    background-color: #dedbdb;
		// 	    text-align: center;
		// 	    line-height: 80px;
		// }
		.release {

			width: 80%;
			height: 100rpx;
			border-radius: 30rpx;
			margin: 60rpx auto;
			margin-top: 200rpx;
			background-color: #FB4D22;
			text-align: center;
			line-height: 100rpx;
			color: #FFF;
		}
	}


	/deep/ .van-cell:after {
		content: "";
		display: none;
	}

	/deep/ .van-uploader .van-uploader__preview {
		width: 33.3333%;
		margin: 0;
		margin-bottom: 30rpx;

		image {
			margin: 0 auto;
		}
	}
</style>
