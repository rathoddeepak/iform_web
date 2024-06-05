import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Custom Components
import ChevronBackButton from "../../components/back/ChevronBackButton";
import RadicalCenter from "../../components/backgrounds/RadicalCenter";
import PhoneInput from "../../components/input/PhoneInput";
import OTPInput from "../../components/input/OTPInput";
import Footer from "../../components/footer";
import Button from "../../components/button/";
import Logo from "../../components/avatar/Logo";
import Link from "../../components/text/Link";

// Constants
import { sizes, weights } from "../../themes/fonts";
import { DEFAULT_ERROR } from "../../utils/constants";
import colors from "../../themes/colors";

// Functions
import * as validations from "../../utils/validations";
import * as helper from "../../utils/helper";
import * as local from "../../local";

// Hooks
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import Backend from "../../backend";

const CONTACT_VIEW = 0;
const OTP_VIEW = 1;
const margin = 25;

const Auth = () => {
	const [currentState, setCurrentState] = React.useState(CONTACT_VIEW);
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [isBusy, setIsBusy] = React.useState(false);
	const navigate = useNavigate();

	const loginUser = async () => {
		try {
			const mPhoneNumber = helper.removeSpace(phoneNumber);
			if (!validations.isValidPhoneNumber(phoneNumber)) {
				throw new Error("Enter valid phone number with country code");
			}
			setIsBusy(true);
			const response = await Backend.User.LoginUser(mPhoneNumber);
			if (response?.success) {
				setCurrentState(OTP_VIEW);
			} else {
				throw new Error(response?.message);
			}
		} catch (err) {
			toast.error(err.message || DEFAULT_ERROR);
		} finally {
			setIsBusy(false);
		}
	};

	const handleOTP = async (otp) => {
		try {
			setIsBusy(true);
			const mPhoneNumber = helper.removeSpace(phoneNumber);
			const response = await Backend.User.ValidateOTP(mPhoneNumber, otp);
			if (response?.success) {
				local.clearStorage();
				local.setSessionCookie(response.data.session_id);						
				navigate("/home");
			} else {
				throw new Error(response?.message);
			}
		} catch (err) {
			toast.error(err.message || DEFAULT_ERROR);
		} finally {
			setIsBusy(false);
		}
	};

	const renderView = () => {
		if (currentState === OTP_VIEW) {
			return (
				<>
					<ChevronBackButton
						onPress={() => setCurrentState(CONTACT_VIEW)}
					/>
					<Text style={style.title}>Enter Code</Text>
					<Text style={style.subTitle}>
						We sent a code to {phoneNumber} via SMS. Please enter it
						below.
					</Text>
					<OTPInput
						style={style.otpInput}
						length={6}
						onChange={handleOTP}
					/>
					<Link text="Resend code" style={style.resend} />
				</>
			);
		}
		return (
			<>
				<Logo size={80} />
				<View style={style.cardContent}>
					<Text style={style.title}>Welcome to iForm</Text>
					<Text style={style.subTitle}>
						Please enter phone number.
					</Text>
					<PhoneInput
						onChange={setPhoneNumber}
						labelStyle={style.phoneInput}
					/>
					<Button
						onPress={loginUser}
						text="Continue"
						style={style.button}
						loading={isBusy}
					/>
				</View>
			</>
		);
	};
	return (
		<RadicalCenter>
			<View style={style.content}>
				<View style={style.card}>{renderView()}</View>
			</View>
			<Footer />
		</RadicalCenter>
	);
};

const style = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		backgroundColor: colors.card,
		borderColor: colors.border,
		borderWidth: 1,
		paddingHorizontal: 20,
		paddingVertical: margin,
		borderRadius: 20,
		width: 350,
	},
	title: {
		fontSize: sizes.title,
		fontWeight: weights.semibold,
		color: colors.text,
		marginTop: margin,
	},
	cardContent: {
		paddingLeft: 5,
	},
	subTitle: {
		color: colors.textGrey,
		marginTop: 5,
		fontSize: sizes.subTitle,
	},
	button: {
		marginTop: margin,
	},
	phoneInput: {
		marginTop: margin,
	},
	resend: {
		textAlign: "right",
		width: "100%",
		fontSize: sizes.subTitle,
	},
	otpInput: {
		marginVertical: margin,
	},
});

export default Auth;