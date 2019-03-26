module.exports.responses = {
	INVALID_INPUT: {code: 1, message: "Input data không hợp lệ"},
	NOT_AUTHORIZED: {code: 2, message: "Chưa đăng nhập. Vui lòng tải lại ứng dụng"},
	NO_PERMISSION: {code: 3, message: "Không có quyền thực thi"},

	/* AUTHORIZATION */
	LOGIN_SUCCESS: {code: 200, message: "Đăng nhập thành công"},
	LOGIN_FAIL: {code: 200, message: "Tài khoản hoặc mật khẩu không đúng !"},

	/* USER */
	USER_CHANGE_NAME_SUCCESS: {code: 200, message: "Đổi tên thành công !"},

	/* APP */
	GET_DATA_SUCCESS: {code: 200, message: "Lấy dữ liệu thành công !"},
	UPDATE_DATA_SUCCESS: {code: 200, message: "Cập nhật dữ liệu thành công !"},

};