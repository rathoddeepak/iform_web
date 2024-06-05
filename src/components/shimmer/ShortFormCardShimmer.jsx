import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../themes/colors";
import Shimmer from "./Shimmer";

const FormShimmer = () => {
	return (
		<View style={style.main}>
			<Shimmer width={60} height={60} borderRadius={10} />
			<View style={style.content}>
				<Shimmer width={200} height={20} borderRadius={10} />
				<Shimmer
					width={160}
					height={16}
					borderRadius={10}
					style={{ marginTop: 10 }}
				/>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		backgroundColor: colors.card3,
		height: 80,
		borderRadius: 14,
		width: "100%",
		marginTop: 20,
		padding: 10,
		flexDirection: "row",
	},
	imgCover: {
		width: 100,
		height: 100,
		overflow: "hidden",
		borderRadius: 10,
		backgroundColor: colors.buttonLight,
	},
	content: {
		paddingHorizontal: 20,
	},
	row: {
		height: 100,
		marginTop: 10,
		flexDirection: "row",
	},
});

export default FormShimmer;