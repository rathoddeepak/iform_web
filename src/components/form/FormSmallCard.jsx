import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Custom Components
import ShortFormCardShimmer from "../shimmer/ShortFormCardShimmer";
// Lucide Icons
import { FileText } from "lucide-react";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const FormSmallCard = ({ isLoading, data = {} }) => {
	const link = `${window.location.host}/${data.link_code}`;
	return isLoading ? (
		<ShortFormCardShimmer />
	) : (
		<View style={style.main}>
			<View style={style.iconCover}>
				<FileText size={50} color={colors.textGrey} />
			</View>
			<View style={style.textContent}>
				<Text numberOfLines={1} style={style.title}>
					{data.title}
				</Text>
				<Text style={style.link}>{link}</Text>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		backgroundColor: colors.cardGrey,
		borderWidth: 1,
		borderColor: colors.border3,
		height: 80,
		borderRadius: 14,
		width: "100%",
		marginTop: 20,
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	iconCover: {
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: colors.buttonLight,
	},
	arrowCover: {
		width: 25,
		height: 25,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		backgroundColor: colors.buttonLight,
	},
	img: {
		width: "100%",
		height: "100%",
	},
	textContent: {
		flex: 1,
		paddingLeft: 10,
		justifyContent: "center",
	},
	title: {
		fontSize: sizes.title,
		fontWeight: weights.bold,
		color: colors.text,
	},
	link: {
		marginTop: 5,
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.textGrey,
	}
});

export default FormSmallCard;