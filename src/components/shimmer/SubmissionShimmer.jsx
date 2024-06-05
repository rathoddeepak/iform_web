import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../themes/colors";
import Shimmer from "./Shimmer";

const SubmissionShimmer = () => {
	return (
		<View style={style.main}>
			<Shimmer fromColor={colors.card} width={100} height={10} borderRadius={10} />			
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		height: 50,
		width: 320,
		alignSelf: "center",
		borderRadius: 7,
		paddingLeft: 10,
		backgroundColor: colors.card4,
		marginTop: 20,
		justifyContent: "center",
	}
});

export default SubmissionShimmer;