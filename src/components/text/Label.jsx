import React from "react";
import { Text, StyleSheet } from "react-native";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const Label = ({ text = "" }) => {
	return (
		<Text numberOfLines={1} style={style.text}>{text}</Text>
	);
};

const style = StyleSheet.create({
	text: {
		marginTop: 20,
		fontSize: sizes.subTitle,
		color: colors.textGrey,
		fontWeight: weights.semibold
	}
});

export default Label;