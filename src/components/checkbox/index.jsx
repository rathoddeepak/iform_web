import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Check } from "lucide-react";
import colors from "../../themes/colors";

const CheckBox = ({
	style,
	borderRadius = 60,
	size = 30,
	iconSize = 20,
	onChange,
	selected = false,
}) => {
	const boxStyle = React.useMemo(() => {
		return {
			borderWidth: selected ? 0 : 2,
			width: size,
			height: size,
			borderRadius,
			backgroundColor: selected ? colors.safeGreen : colors.transparent,
		};
	}, [selected, borderRadius, size]);
	return (
		<Pressable
			onPress={() => onChange(!selected)}
			style={[mStyle.main, boxStyle, style]}
		>
			{selected ? <Check size={iconSize} color={colors.card} /> : null}
		</Pressable>
	);
};

const mStyle = StyleSheet.create({
	main: {
		justifyContent: "center",
		alignItems: "center",
		borderColor: colors.border,
	},
});

export default CheckBox;