<template>
	<scroll-view scroll-y="true">
		<view class="b-f">
			<view v-for="(item, index) in 15" :key="index" class="flex align-center">
				<view class="flex flex-direction">
					<text>2022-04-26</text>
					<text>12:83</text>
				</view>
				<image-left
					:img="'/static/avatar.jpg'"
					:width="500"
					:top="'Sing'"
				></image-left>
				<text>+5</text>
			</view>
		</view>
	</scroll-view>
</template>

<script></script>

<style lang="scss"></style>
