import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const InputBox = ({ style = {}, inputProps = {} }, ref) => {
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
				style={[mStyle.input]}
				placeholderTextColor={colors.border}
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
		width: 40,
		borderRadius: 10,
		borderWidth: 2,
		backgroundColor: colors.card2,
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.text,
		width: 40,
		height: 40,
		textAlign: "center"
	},
});

export default React.forwardRef(InputBox);