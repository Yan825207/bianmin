<template>
	<view class="content">
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
		<!-- 公告 -->
		<view class="index_notice" @click="goToServerPage">
			<van-notice-bar left-icon="volume-o" background="#FFF0C3" scrollable :text="text">{{text}}</van-notice-bar>
		</view>
		<!-- 广告 -->

		<!-- 轮播图 -->
		<view class="slideshow">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item>
						<view class="xianzhi">
							<image src="../../static/xianzhi.png"></image>
						</view>
					</swiper-item>
					<swiper-item class="swiper_item">
						<image class="cunjiebg" src="../../static/cunjiebg.jpg" mode=""></image>
						<text class="downTime">据2024年春节还剩：</text>
						<van-count-down use-slot :time="time" @change="onChange">

							<text class="item_d item">{{ timeData.days }}</text>
							<text class="segmentation">天</text>
							<text class="item_h item">{{ timeData.hours }}</text>
							<text class="segmentation">时</text>
							<text class="item_m item">{{ timeData.minutes }}</text>
							<text class="segmentation">分</text>
							<text class="item_s item">{{ timeData.seconds }}</text>
							<text class="segmentation">秒</text>
						</van-count-down>
					</swiper-item>
				</swiper>
			</view>

		</view>
		<!-- 功能列表 -->
		<view class="function_list">
			<view class="function_item">
				<van-icon size="50rpx" color="#dea014" name="bag" />
				<text>二手集市</text>
			</view>
			<view class="function_item">
				<van-icon size="50rpx" color="#dea014" name="bag" />
				<text>二手集市</text>
			</view>
			<view class="function_item">
				<van-icon size="50rpx" color="#dea014" name="bag" />
				<text>二手集市</text>
			</view>
			<view class="function_item">
				<van-icon size="50rpx" color="#dea014" name="bag" />
				<text>二手集市</text>
			</view>
			<view class="function_item">
				<van-icon size="50rpx" color="#dea014" name="bag" />
				<text>二手集市</text>
			</view>
			<view class="function_item">
				<van-icon size="50rpx" color="#dea014" name="bag" />
				<text>二手集市</text>
			</view>
		</view>
		<!-- 动态 -->
		<view class="trends">
			<view class="trends_header">
				<view class="release_trends" @click="goToPublish">
					+ 动态
				</view>
				<text class="trends_text">发布动态，分享美好生活</text>
			</view>
			<view class="trends_list">
				<view class="trends_item" v-for="(item,index) in trendList" :key="index">
					<view class="msg">
						<view class="left_avatar">
							<image :src="item.avatar || defaultAvarat" mode=""></image>
						</view>
						<view class="right_msg">
							<view class="name">
								{{item.username}}
							</view>
							<view class="date">
								{{item.created}}
							</view>
						</view>
					</view>
					<view class="trends_content">
						{{item.content}}
					</view>
					<view class="trends_imgs">
						<view class="img_item" v-for="item1 in item.imgs">
							<image :src="item1" mode=""></image>
						</view>
					</view>
					<view class="trends_bottom">
						<view class="chat">
							<van-icon name="chat" />
							<text> 评论</text>
						</view>
						<view class="">
							<van-icon name="good-job" />
							<text> 赞</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapActions,
		mapState
	} from "vuex"
	import "./index.less"
	export default {
		data() {
			return {
				title: 'Hello',
				text: "近期天气寒冷，据气象部门预报，受强冷空气影响，近日气温将有大幅度下降，并伴有雨雪天气，物业提醒您做好防护措施。",
				time: new Date("2024-02-10") - new Date().getTime(),
				timeData: {},
				pageNum: 1,
				pageSize: 10,
					defaultAvarat: "/static/defaultAvarat.png",
			}
		},
		computed: {
			...mapState("index", ["trendList"])
		},
		onShow() {
			this.getTrendList({
				pageNum: this.pageNum,
				pageSize: this.pageSize
			})
		},
		methods: {
			onChange(e) {
				// this.setData({
				//   timeData: e.detail,
				// });
				this.timeData = e.detail
			},
			goToPublish() {
				uni.navigateTo({
					url: "/page_index/Publishupdates/index"
				})
			},
			...mapActions({
				getTrendList: "index/getTrendList"
			})
		}
	}
</script>

<style scoped lang="less">
	/deep/.van-notice-bar {
		height: 100%;
	}

	/deep/.van-notice-bar__wrap {
		font-size: 30rpx;
		height: 48rpx;
		display: flex;
		align-items: center;
	}

	/deep/.van-notice-bar__left-icon,
	.van-notice-bar__right-icon {
		font-size: 30rpx;
	}

	/deep/ .slideshow .swiper_item {
		line-height: normal !important;
	}
</style>
