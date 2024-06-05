import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

// constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const Button = ({
	text,
	onPress,
	renderIcon = false,
	renderRightIcon = false,
	style = {},
	textStyle = {},
	bgColor = colors.buttonLight,
}) => {
	const [isActive, setIsActive] = React.useState(false);
	const [backgroundColor, marginLeft, marginRight] = React.useMemo(() => {
		const color = isActive ? bgColor + "b4" : bgColor;
		const ml = renderIcon === false ? 0 : 4;
		const mr = renderRightIcon === false ? 0 : 4;
		return [color, ml, mr];
	}, [isActive, bgColor, renderIcon, renderRightIcon]);
	return (
		<Pressable
			onHoverIn={() => setIsActive(true)}
			onHoverOut={() => setIsActive(false)}
			onPress={onPress}
			style={[mStyle.main, style, { backgroundColor }]}
		>
			{renderIcon ? renderIcon() : null}
			<Text style={[mStyle.text, { marginLeft, marginRight }, textStyle]}>
				{text}
			</Text>
			{renderRightIcon ? renderRightIcon() : null}
		</Pressable>
	);
};

const mStyle = StyleSheet.create({
	main: {
		height: 40,
		width: "100%",
		flexDirection: "row",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.text,
	},
});

export default Button;