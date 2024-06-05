import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

// Hooks
import { useNavigate } from "react-router-dom";

// Functions
import { clearStorage, deleteAllCookies } from "../../local/";

const Header = () => {
	const navigate = useNavigate();
	const logout = () => {		
		if (window.confirm("Are you sure you want to logout!")) {
			clearStorage();
			deleteAllCookies();
			navigate("/")
		}
		// Alert.alert("Alert Title", "My Alert Msg", [
		// 	{
		// 		text: "Cancel",
		// 		style: "cancel",
		// 	},
		// 	{
		// 		text: "Yes",
		// 		onPress: () => {
		// 			clearStorage();
		// 			deleteAllCookies();
		// 		},
		// 	},
		// ]);
	};
	return (
		<View style={style.main}>
			<Text style={style.brandText}>
				<Text style={style.primary}>i</Text>Form
			</Text>
			<Text onPress={logout} style={style.logout}>
				Logout
			</Text>
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		height: 50,
		width: "100%",
		borderBottomWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
		backgroundColor: colors.bgBlackTrans,
		borderBottomColor: colors.borderHeader,
	},
	brandText: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.text,
	},
	primary: {
		color: colors.primary,
	},
	logout: {
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.textGrey,
	},
});

export default Header;