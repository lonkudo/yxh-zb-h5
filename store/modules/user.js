const user = {
	state: {
		token: uni.getStorage({
			key: 'token',
			success: (res) => {
				console.log(res);	
				return res.data 
			},
			fail: (err) => {
				console.log(err)
				return 'inti failed'
			}
		}) || 'default'
	}
}

export default user