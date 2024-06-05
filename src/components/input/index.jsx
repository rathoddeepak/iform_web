import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const Input = ({ style = {}, inputProps = {} }, ref) => {
	React.useImperativeHandle(
		ref,
		() => ({
			focus,
		}),
		[],
	);
	const currentInput = React.useRef();
	const [isFocused, setIsFocused] = React.useState(false);
	const borderColor = React.useMemo(() => {
		return isFocused ? colors.borderActive : colors.border;
	}, [isFocused]);

	const focus = () => {
		currentInput.current.focus();
	};

	return (
		<View style={[mStyle.main, { borderColor }, style]}>
			<TextInput
				style={mStyle.input}
				placeholderTextColor={colors.textGrey}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				ref={currentInput}
				{...inputProps}
			/>
		</View>
	);
};

const mStyle = StyleSheet.create({
	main: {
		height: 40,
		width: "100%",
		borderRadius: 7,
		borderWidth: 1,
		backgroundColor: colors.card,
		paddingLeft: 10
	},
	input: {
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.text,
		width: "100%",
		height: "100%"
	},
});

export default React.forwardRef(Input);