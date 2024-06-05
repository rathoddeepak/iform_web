import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const PhoneInput = ({ style = {}, labelStyle = {}, onChange }) => {
	const [isFocused, setIsFocused] = React.useState(false);
	const borderColor = React.useMemo(() => {
		return isFocused ? colors.borderActive : colors.border;
	}, [isFocused]);
	return (
		<>
			<Text style={[mStyle.label, labelStyle]}>Mobile Number</Text>
			<View style={[mStyle.main, { borderColor }, style]}>
				<TextInput
					style={mStyle.input}
					placeholderTextColor={colors.border}
					placeholder="+1 123 123 1234"
					onChangeText={onChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
			</View>
		</>
	);
};

const mStyle = StyleSheet.create({
	main: {
		height: 40,
		width: "100%",
		borderRadius: 10,
		borderWidth: 2,
		backgroundColor: colors.card2,
		justifyContent: "center",
		marginTop: 5,
	},
	input: {
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		paddingLeft: 10,
		borderWidth: 0,
		outline: "none",
		color: colors.text,
	},
	label: {
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.textCement,
	},
});

export default PhoneInput;