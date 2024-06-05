import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { ChevronLeft } from "lucide-react";
import colors from "../../themes/colors";

const ChevronBackButton = ({ onPress }) => {
	const [isActive, setIsActive] = React.useState(false);
	const bw = React.useMemo(() => {
		return { borderWidth: isActive ? 1 : 0 };
	}, [isActive]);

	return (
		<Pressable
			onHoverIn={() => setIsActive(true)}
			onHoverOut={() => setIsActive(false)}
			onPress={onPress}
			style={[style.main, bw]}
		>
			<ChevronLeft size={20} color={colors.textCement} />
		</Pressable>
	);
};

const style = StyleSheet.create({
	main: {
		width: 28,
		height: 28,
		borderRadius: 100,
		backgroundColor: colors.buttonLight,
		justifyContent: "center",
		alignItems: "center",
		borderColor: colors.buttonPrimary
	},
});

export default ChevronBackButton;