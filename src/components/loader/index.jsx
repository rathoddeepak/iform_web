import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import colors from "../../themes/colors";

function Loader({ theme = "dark" }) {
	const animTime = React.useRef();
	const translateX = React.useRef(new Animated.Value(0)).current;
	const [bgColor, nobColor] = React.useMemo(() => {
		if (theme === "dark") {
			return [colors.textBlack, colors.text];
		}
		return [colors.text, colors.textBlack];
	}, [theme]);

	const animate = (forward = true) => {
		Animated.timing(translateX, {
			toValue: forward ? 16 : 0,
			useNativeDriver: true,
		}).start();
		animTime.current = setTimeout(() => {
			animate(!forward);
		}, 500);
	};
	React.useEffect(() => {
		animate();
		return () => {
			clearTimeout(animTime.current);
		};
	}, []);
	return (
		<View style={[style.main, { backgroundColor: bgColor }]}>
			<Animated.View
				style={[
					style.bar,
					{
						transform: [{ translateX }],
						backgroundColor: nobColor,
					},
				]}
			/>
		</View>
	);
}

const style = StyleSheet.create({
	main: {
		height: 10,
		borderRadius: 20,
		width: 30,
		justifyContent: "center",
		paddingHorizontal: 5,
	},
	bar: {
		height: 7,
		borderRadius: 20,
		width: 7,
	},
});

export default Loader;