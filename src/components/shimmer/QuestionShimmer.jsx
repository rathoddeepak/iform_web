import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../themes/colors";
import Shimmer from "./Shimmer";

const FormShimmer = () => {
	return (
		<View style={style.main}>
			<View style={style.grab}>
				<Shimmer
					fromColor={colors.buttonLight}
					width={50}
					height={20}
					borderRadius={10}
				/>
			</View>
			<Shimmer
				fromColor={colors.buttonLight}
				width={200}
				height={20}
				borderRadius={10}
			/>
			<Shimmer
				fromColor={colors.buttonLight}
				width={160}
				height={16}
				borderRadius={10}
				style={{ marginTop: 10 }}
			/>
			<View style={style.row}>
				<Shimmer
					fromColor={colors.buttonLight}
					width={100}
					height={30}
					borderRadius={10}
				/>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		backgroundColor: colors.cardGrey,
		height: 120,
		borderRadius: 14,
		width: "100%",
		marginTop: 20,
		padding: 10,
	},
	content: {
		paddingHorizontal: 20,
	},
	row: {
		height: 100,
		marginTop: 5,
		alignSelf: "flex-end",
	},
	grab: {
		alignItems: "center",
	},
});

export default FormShimmer;