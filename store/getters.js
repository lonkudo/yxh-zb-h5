const getters = {
	token: (state) => state.user.token,
	uid: (state) => state.user.uid,
	userinfo: (state) => state.user.userinfo,
	lan: (state) => state.settings.lan,
	record: (state) => state.history.record,
	menuList: (state) => state.data.menuList,
	siteInfo: (state) => state.settings.siteInfo,
	isSuccessConnect: (state) => state.settings.isSuccessConnect,
}
export default getters
