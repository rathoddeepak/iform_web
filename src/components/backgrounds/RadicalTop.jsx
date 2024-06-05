import React from "react";
import { View, useWindowDimensions } from "react-native";

const RadicalCenter = ({ children }) => {
	const { width, height } = useWindowDimensions();
	return (
		<View
			style={{
				width,
				height,
				justifyContent: "center",
				alignItems: "center",
				backgroundImage:
					"radial-gradient(circle at 50% 4.3e-17%, #212121 0%, #000000 100%)",
			}}
		>
			{children}
		</View>
	);
};

export default RadicalCenter;