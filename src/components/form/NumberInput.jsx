import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const NumberInput = ({ style = {}, placeholder, onChange, value }) => {
	const [isFocused, setIsFocused] = React.useState(false);
	const borderColor = React.useMemo(() => {
		return isFocused ? colors.borderActive : colors.border;
	}, [isFocused]);
	const handleChangeText = (text = "") => {
		const newText = text?.replace(/\D/g, "") || "";
		onChange(newText);
	};

	return (
		<View style={[mStyle.inputCover, { borderColor }, style]}>
			<TextInput
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholder={placeholder}
				placeholderTextColor={colors.textGrey}
				onChangeText={handleChangeText}
				value={value}
				style={mStyle.input}
			/>
		</View>
	);
};

const mStyle = StyleSheet.create({
	inputCover: {
		height: 40,
		width: "100%",
		borderRadius: 7,
		borderWidth: 1,
		backgroundColor: colors.card,
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	input: {		
		fontWeight: weights.semibold,
		fontSize: sizes.subTitle,
		color: colors.text,
	},
});

export default NumberInput;