<template>
	<view>
		<!-- 头像 -->
		<van-toast id="van-toast" />
		<view class="page_mian_header">
			<view class="touxiang_box">
				<van-image round width="150rpx" height="150rpx" mode="aspectFill" data-type="pictures"
					:src="avatar || defaultAvarat" data-index="0" @click="chooseImage" />
				<image src="/static/xiangji.png" mode="widthFix" class="xiangji"></image>
			</view>
			
			<view class="weixin_tx">
				<button type="primary" @chooseavatar="onChooseAvatar" open-type="chooseAvatar" class="weixin_tx_btn">
					<!-- <button class="primary" open-type="getUserInfo" @click="bindGetUserInfo">获取个人信息</button> -->

					<image src="/static/weixin.png" mode=""></image>
					<text>使用微信名和头像</text>
				</button>
			</view>
		</view>
		<view class="message">
			<form @submit="formSubmit" class="page_mian_content_form">
				<van-field name="username" :value="username" label="用户名" required input-align="right" placeholder="请输入"
					bind:change="onChange" />
				<van-field name="password" :value="password" label="密码" required input-align="right" placeholder="请输入"
					bind:change="onChange" />
				<van-field name="confirmPassword" :value="confirmPassword" label="确认密码" required input-align="right"
					placeholder="请输入" bind:change="onChange" />
				<van-field name="phone" :value="phone" label="手机号" required input-align="right" placeholder="请输入"
					bind:change="onChange" />
				</van-cell-group>
				<van-field name="age" :value="age" label="年龄" input-align="right" placeholder="请输入"
					bind:change="onChange" />
				</van-cell-group>
				<van-field name="gender" :value="gender" label="性别" input-align="right" placeholder="请输入"
					bind:change="onChange" />
				</van-cell-group>
				<view class="save">
					<button form-type="submit" class="saveBtn">保存</button>
				</view>
			</form>
		</view>

	</view>
</template>

<script>
	import Toast from '@vant/weapp/dist/toast/toast';
import { mapActions } from 'vuex';
import getBase64ImageUrl from "@/utils/Base64Image.js"
	export default {
		data() {
			return {
				src: "",
				defaultAvarat: "/static/defaultAvarat.png",
				username: "",
				password: "",
				confirmPassword: "",
				phone: "",
				age: "",
				gender: "",
				avatar:"",
			};
		},
		methods: {
			formSubmit(e) {
				const {
					username,
					age,
					password,
					confirmPassword,
					phone,
					gender
				} = e.detail.value
				const phoneNumberRegex = /^1[3456789]\d{9}$/;

				if (!username) {
				return	Toast("用户名不能为空")
				} else if (!password) {
					return Toast("密码不能为空")
				} else if (password !== confirmPassword) {
					return Toast("两次输入密码不一致，请重新输入")
				} else if (!phone) {
					return Toast("手机号不能为空")
				}else if(!phoneNumberRegex.test(phone)){
					return Toast("手机号格式不正确！")
				}
				// 0 未知  1 男 2 女
				this.register({
					username,
					age : age?age:0,
					password,
					confirmPassword,
					phone,
					gender:gender?gender:0,
					avatar:this.avatar,
				})
			},
			// 上传头像
			chooseImage(e) {
				wx.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						var tempFilePaths = res.tempFilePaths;
						for (var x = 0; x < res.tempFilePaths.length; x++) {
							wx.getFileSystemManager().readFile({
								filePath: res.tempFilePaths[x], //选择图片返回的相对路径
								encoding: "base64", //这个是很重要的
								success: (res) => { //成功的回调
									//返回base64格式
									this.uploadUserAvatar({
										path: getBase64ImageUrl(res.data)
									}).then(res => {
										console.log(res);
										this.avatar = res
									})
								}
							})
						}
					}
				})
			},
			uploadFile(file) {
			 const formData = new FormData();
			      if (file) {
			        formData.append('file', file);
			
			        // 你需要将以下地址替换为实际的服务器上传接口
			        const uploadUrl = 'https://telegraph-image-cij.pages.dev/upload';
			
			        fetch(uploadUrl, {
			          method: 'POST',
			          body: formData,
			        })
			        .then(response => response.json())
			        .then(data => {
			          console.log('File uploaded successfully:', data);
			        })
			        .catch(error => {
			          console.error('Error uploading file:', error);
			        });
			      } else {
			        console.warn('No file selected.');
			      }
			    },
			...mapActions({
				register:"user/register",
				uploadUserAvatar:"user/uploadUserAvatar"
			})
		},
	}
</script>

<style lang="less" scoped>
	.page_mian_header {
		width: 100%;
		margin: 30rpx 0 0 0;
		flex-direction: column;
		display: flex;
		justify-content: center;
		align-items: center;

		.touxiang_box {
			width: 150rpx;
			height: 150rpx;
			position: relative;
			border-radius: 50%;
			margin-bottom: 15rpx;

			.xiangji {
				width: 42rpx;
				height: 42rpx;
				position: absolute;
				bottom: 10rpx;
				right: 10rpx;
				z-index: 999;
			}
		}

		.weixin_tx {
			margin: 20rpx 0;
			width: 300rpx;
			height: 56rpx;
			border-radius: 50rpx;
			overflow: hidden;
			border: solid 1px #16bc22;

			.weixin_tx_btn {
				width: 300rpx;
				height: 56rpx;
				border-radius: 50rpx;
				background-color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 34rpx;
					height: 34rpx;
				}

				text {
					padding: 0 0 0 10rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #16bc22;
				}
			}
		}

		button::after {
			border: none;
		}
	}

	.save {
		margin: 50rpx 50rpx;
		margin-top: 200rpx;
		border: none;
		// width: 100%;
		height: 98rpx;
		border-radius: 50rpx;
		// margin: 10rpx 0;
		background-color: #fb4d22;
		color: #fff;
		font-size: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.saveBtn {
			width: 100%;
			height: 100%;
			background-color: transparent;
			color: #FFF;
		}

	}

	/deep/ .van-field__error-message,
	.van-field__error-message--error {
		text-align: right !important;
	}
</style>
