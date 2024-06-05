import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

// Custom components
import Loader from "../loader";

// constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const Button = ({
	text,
	loading = false,
	onPress,
	style = {},
	textStyle = {},
	loaderColor = colors.textBlack
}) => {
	const [isActive, setIsActive] = React.useState(false);
	const bgColor = React.useMemo(() => {
		const color = isActive
			? colors.buttonPrimary + "b4"
			: colors.buttonPrimary;
		return { backgroundColor: color };
	}, [isActive]);
	const handlePress = () => {
		if (loading || typeof onPress !== "function") {
			return;
		}
		onPress();
	};
	return (
		<Pressable
			onHoverIn={() => setIsActive(true)}
			onHoverOut={() => setIsActive(false)}
			onPress={handlePress}
			style={[mStyle.main, style, bgColor]}
		>
			{loading ? (
				<Loader stroke={loaderColor} />
			) : (
				<Text style={[mStyle.text, textStyle]}>{text}</Text>
			)}
		</Pressable>
	);
};

const mStyle = StyleSheet.create({
	main: {
		height: 40,
		width: "100%",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.textBlack,
	},
});

export default Button;