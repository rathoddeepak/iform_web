import { perform } from "./request";

export const LoginUser = (phone_number) => {
	return perform("user/login_user", {
		phone_number
	});
};

export const ValidateOTP = (phone_number, otp) => {
	return perform("user/validate_otp", {
		phone_number,
		otp
	});
};


