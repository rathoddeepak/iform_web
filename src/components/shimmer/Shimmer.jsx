import React from "react";
import { View } from "react-native";
import colors from "../../themes/colors";

function Shimmer({ width, height, style = {}, borderRadius, fromColor = colors.card }) {
	const baseStyle = {
		width,
		height,
		borderRadius,
		backgroundImage: `linear-gradient(to right, ${fromColor} 8%, ${colors.card4} 18%, ${fromColor} 33%)`,
		backgroundSize: "200% 100%",
		animation: "shimmer 1.5s infinite ease-in-out",
		...style,
	};

	return <View style={baseStyle} />;
}

export default Shimmer;