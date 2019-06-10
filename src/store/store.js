export default {
	state: {
		userInfo: {},
		extendStr: '',
	},

	//派生，相当于computed
	getters: {
		//YP表示一批和厂商，MD表示二批，配送商，门店GR表示个人
		extendStr: state => {
			var str = state.quickUserInfo.extend
			if(str == '001' || str == '007') {
				//一批、厂商
				return state.extendStr = 'YP'
			} else if(str == '002' || str == '004' || str == '008') {
				//二批、门店、配送商
				return state.extendStr = 'MD'
			} else if(str == '005') {
				//个人
				return state.extendStr = 'GR'
			} else if(str == '003') {
				//自营平台
				return state.extendStr = 'ZY'
			} else {
				//管理员=
				return state.extendStr = 'GL'
			}
		},
	},
	//变更状态,同步
	mutations: {
		storeUserInfo(state, obj) {
			state.userInfo = obj
			sessionStorage.setItem('qr_userinfo', JSON.stringify(state.userInfo))
		},
		//登录调用
		getExtendStr(state, obj) {
			if(obj.str == '001' || obj.str == '007') {
				//一批、厂商
				state.extendStr = 'YP'
			} else if(obj.str == '002' || obj.str == '004' || obj.str == '008') {
				//二批、门店、配送商
				state.extendStr = 'MD'
			} else if(obj.str == '005') {
				//个人
				state.extendStr = 'GR'
			} else if(obj.str == '006') {
				//自营平台
				state.extendStr = 'ZY'
			} else {
				//管理员
				state.extendStr = 'GL'
			}
		},
	},
	//提交mutations状态，可以用于异步
	actions: {

	}
}