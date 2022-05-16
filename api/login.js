import Request from '@/utils/request'

const request = new Request()
import { getToken, getUid } from '@/utils/auth'

// 	会员注册
export function UserReg(
	user_login,
	user_pass,
	user_pass2,
	code,
	source,
	avatar,
	user_nicename
) {
	const data = {
		user_login,
		user_pass,
		user_pass2,
		code,
		source,
		avatar,
		user_nicename,
	}
	return request({
		method: 'post',
		data: data,
	})
}

// 会员登录
export function userLogin(user_login, user_pass) {
	return request({
		url: '?service=Login.UserLogin',
		method: 'POST',
		data: {
			service: 'Login.UserLogin',
			user_login: user_login,
			user_pass: user_pass,
		},
	})
}

// 会员验证码登录
export function userCodeLogin(user_login, code) {
	return request({
		url: '?service=Login.UserLoginByCode',
		method: 'POST',
		data: {
			service: 'Login.UserLoginByCode',
			user_login: parseInt(user_login),
			code: parseInt(code),
		},
	})
}

// 退出方法
export function logout(token, uid) {
	const data = {
		service: 'Login.Logout',
		token,
		uid,
	}
	return request({
		url: '?service=Login.Logout',
		method: 'POST',
		data,
	})
}

// 获取验证码
export function getCode(mobile) {
	return request({
		url: '?service=Login.GetCode',
		method: 'POST',
		data: {
			mobile: mobile,
		},
	})
}
