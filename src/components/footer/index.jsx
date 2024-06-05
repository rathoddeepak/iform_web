import React from "react";
import { View, Linking, StyleSheet } from "react-native";
// Custom Components
import Link from "../text/Link";
// Constants
import { sizes } from "../../themes/fonts";
import colors from "../../themes/colors";
import { CODE_URL, MY_URL } from "../../utils/constants";
const Footer = () => {
	return (
		<View style={style.main}>
			<Link
				onPress={() => Linking.openURL(CODE_URL)}
				style={style.text}
				text="Source Code"
			/>
			<View style={style.gap} />
			<Link
				onPress={() => Linking.openURL(MY_URL)}
				style={style.text}
				text="About me"
			/>
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		width: "100%",
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		bottom: 0,
		borderTopWidth: 0.5,
		borderColor: colors.border2,
	},
	text: {
		fontSize: sizes.subTitle,
	},
	gap: {
		width: 80,
	},
});

export default Footer;