import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Switch from "./Switch";
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const SwitchBox = ({
	style = {},
	enabled,
	onChange,
	placeholder,
	options = [],
}) => {
	return (
		<View style={[mStyle.main, style]}>
			<Text style={mStyle.placeholder}>{placeholder}</Text>
			<Switch enabled={enabled} onChange={onChange} />
		</View>
	);
};

const mStyle = StyleSheet.create({
	main: {
		height: 40,
		width: "100%",
		borderRadius: 7,
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.card,
		paddingHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	placeholder: {
		color: colors.textGrey,
		fontWeight: weights.semibold,
		fontSize: sizes.subTitle,
	},
});

export default SwitchBox;