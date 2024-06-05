import React from "react";
import { Pressable, Text } from "react-native";
import colors from "../../themes/colors";

const Link = ({ style = {}, text = "", onPress }) => {
	const [isHovered, setIsHovered] = React.useState(false);
	const color = React.useMemo(() => {
		return {
			color: isHovered ? colors.text : colors.textGrey,
		};
	}, [isHovered]);
	return (
		<Pressable
			onPress={onPress}
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
		>
			<Text numberOfLines={1} style={[style, color]}>{text}</Text>
		</Pressable>
	);
};

export default Link;