import Vue from 'vue'

Vue.mixin({
	computed: {
		userInfo: function () {
			return this.$store.state.user.userinfo || {}
		},
		token: function () {
			return this.$store.state.user.token || ''
		},
		uid: function () {
			return this.$store.state.user.uid || ''
		},
	},
})
