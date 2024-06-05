import React from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import colors from "../../themes/colors";

const Avatar = ({ source, style = {}, onPress, size = 100 }) => {
	const [isHovered, setIsHovered] = React.useState(false);
	const coverStyle = React.useMemo(() => {
		const borderRadius = parseInt(size / 2);
		let borderWidth = 0;
		if (onPress !== undefined) {
			borderWidth = isHovered ? 1 : 0
		}
		return { width: size, height: size, borderRadius, borderWidth };
	}, [size, onPress, isHovered]);
	return (
		<Pressable
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
			onPress={onPress}
			style={[mStyle.main, coverStyle, style]}
		>
			<Image style={mStyle.img} source={source} />
		</Pressable>
	);
};

const mStyle = StyleSheet.create({
	main: {
		overflow: "hidden",
		borderColor: colors.buttonPrimary
	},
	img: {
		height: "100%",
		width: "100%",
	},
});

export default Avatar;