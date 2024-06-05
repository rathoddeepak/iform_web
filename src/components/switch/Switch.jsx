import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import colors from "../../themes/colors";

const Switch = ({ enabled, onChange }) => {
	const nobStyle = React.useMemo(() => {
		const backgroundColor = enabled ? colors.safeGreen : colors.textGrey;
		const alignSelf = enabled ? "flex-end" : "flex-start";
		return {
			backgroundColor,
			alignSelf,
		};
	}, [enabled]);

	return (
		<Pressable onPress={() => onChange(!enabled)} style={style.main}>
			<View style={[style.nob, nobStyle]} />
		</Pressable>
	);
};

const style = StyleSheet.create({
	main: {
		height: 27,
		width: 50,
		paddingHorizontal: 3,
		backgroundColor: colors.border,
		justifyContent: 'center',
		borderRadius: 100
	},
	nob: {
		width: 22,
		height: 22,
		borderRadius: 25,
	},
});

export default Switch;