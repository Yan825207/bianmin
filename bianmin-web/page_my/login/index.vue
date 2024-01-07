<template>
	<view class="main">
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
		<image class="login_bg" src="/page_my/static/login_bg.png" mode=""></image>
		<view class="login_box">
			<!-- <image class="login_box_bg" src="/page_my/static/login_bg.png" mode="bottom left"></image> -->
		</view>
		<view class="login_box_content">
			<view class="login_way">
				<view :class="active == 'name' ? 'name' : 'name active'" @click="()=>change_way('name')">
					账号密码登录
				</view>
				<view class="divider">

				</view>
				<view :class="active == 'phone' ? 'phone' : 'phone active'" @click="()=>change_way('phone')">
					快捷登录
				</view>
			</view>
			<view class="" v-if="active == 'name'">
				<van-field :value="name" placeholder="请输入用户名" @change="changeName" placeholder-style="placeholder"
					:border="false" />
				<van-field type="password" :value="password" placeholder="请输入密码" @change="changePassword"
					placeholder-style="placeholder" :border="false" bind:change="onChange" />
					<view class="register">
						<text @click="register">注册</text>
					</view>
				<view class="forgot">
					<text>忘记密码</text>
				</view>
				<button class="login_btn" @click="login">立即登录</button>
			</view>
			<view class="" v-else>
				<button  class="phone_btn" open-type="getPhoneNumber" plain="true" @getphonenumber="getPhoneNumber"
					v-if="true">手机号快捷登录</button>
				<button type="default" @click="setPhone" v-else>手机号快捷登录</button>
			</view>
		</view>

	</view>
</template>

<script>
	import Toast from "@vant/weapp/dist/toast/toast";
import {
		mapActions,
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				active: 'name',
				name: "大元宵",
				password: "111111"
			};
		},
		methods: {
			...mapActions({
				Login: "user/Login"
			}),
			change_way(type) {
				this.active = type
			},
			login() {
				if(!this.name || !this.password) return Toast("账号或密码不能为空")
				this.Login({
					name: this.name,
					password: this.password
				})
			},
			changePassword(e) {
				this.password = e.detail
			},
			changeName(e) {
				this.name = e.detail
			},
			// 快捷登录
			getPhoneNumber(e) {
				console.log(e,'e');
				// 获取版本号
				const accountInfo = wx.getAccountInfoSync();
				let version = accountInfo.miniProgram.version
				this.editon = version
				this.code = e.detail.code
				if (this.code) {
					this.getPhone({
						code: this.code,
						editon: this.editon,
						promoterPhone: this.phoneNumber // 推广码
					}).then(res => {
						let info = uni.getStorageSync("info")
						uni.setStorageSync("collect", true)
					})
					}
			},
			register(){
				uni.navigateTo({
						url:"/page_my/register/index"
				})
			}

		},

	}
</script>

<style lang="less">
	.main {
		position: relative;
		width: 100%;
		height: 100vh;

		.login_bg {
			position: absolute;
			z-index: -99;
			width: 100%;
			height: 100%;
		}

		.login_box {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 70%;
			height: 60%;
			// background-color: #FFF;
			border: 1px solid #ccc;
			border-radius: 20rpx;

			// opacity: 0.5;
			overflow: hidden;
		}

		.login_box_bg {
			width: 100%;
			height: 100%;
		}

		.login_box_content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 70%;
			height: 60%;
			background-color: transparent;
			border-radius: 20rpx;
			// padding-top: 50rpx;
			box-sizing: border-box;

			.divider {
				width: 2rpx;
				background-color: #CCC;
			}

			.login_way {
				display: flex;
				height: 100rpx;
				text-align: center;
				color: #FFF;
				line-height: 100rpx;
				margin-bottom: 20rpx;

				.name {
					flex: 1;
				}

				.phone {
					flex: 1;
				}

				.active {
					border-bottom: 1px solid #CCC;
				}
			}

			.login_btn {
				position: absolute;
				left: 50%;
				bottom: 50rpx;
				transform: translateX(-50%);
				width: 400rpx;
				height: 100rpx;
				border-radius: 20rpx;
				background-color: transparent;
				color: #FFF;
			}
			.register{
				width: 50%;
				display: inline-block;
				box-sizing: border-box;
				font-size: 28rpx;
				margin-top: 20rpx;
				padding-left: 30rpx;
				text-align: left;
				color: #7009f9
			}

			.forgot {
					width: 50%;
				display: inline-block;
				font-size: 28rpx;			
				box-sizing: border-box;
				margin-top: 20rpx;
				padding-right: 30rpx;
				text-align: right;
				color: #7009f9
			}

			.phone_btn {
				position: absolute;
				left: 50%;
				bottom: 50rpx;
				transform: translateX(-50%);
				width: 400rpx;
				height: 100rpx;
				margin: 0 auto;
				text-align: center;
				line-height: 100rpx;
				color: #FFF;
				border-radius: 20rpx;
				background-color: #d780e6;
			}

		}

		.custom-class {
			border-bottom: 1px solid #000;
		}

	}

	/deep/.van-cell,
	.van-field {
		width: auto !important;
		background-color: transparent;
		border-bottom: 1px solid #FFF;
		// opacity: 1;	
		margin: 0 30rpx;
		box-sizing: border-box;
		background: none !important;
	}

	/deep/ .van-field__control {
		color: #fff !important;
	}

	/deep/ .van-field__placeholder {
		color: #FFF !important;
	}

	/deep/ #van-toast {
		width: 600rpx;
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #000;
		// opacity: 0.5;
		z-index: 999;
	}
</style>
