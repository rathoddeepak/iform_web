import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../themes/colors";
import Shimmer from "./Shimmer";

const PageShimmer = () => {
	return (
		<View style={style.main}>
			<Shimmer fromColor={colors.buttonLight} width={30} height={30} borderRadius={10} />
			<Shimmer fromColor={colors.buttonLight} width={100} style={{ marginLeft: 10 }} height={20} borderRadius={10} />							
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		height: 50,
		width: 230,
		alignSelf: "center",
		borderRadius: 7,
		flexDirection: "row",
		paddingLeft: 5,
		paddingRight: 10,
		backgroundColor: colors.cardGrey,
		marginTop: 20,
		alignItems: "center",
	}
});

export default PageShimmer;