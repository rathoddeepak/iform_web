import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

// Lucide Icons
import { ArrowLeft } from "lucide-react";

// Hooks
import { useNavigate } from "react-router-dom";

// Constants
import colors from "../../themes/colors";

const Header = ({ title }) => {
	const navigate = useNavigate();
	return (
		<View style={style.main}>
			<View style={style.titleCover}>
				<Pressable onPress={() => navigate(-1)} style={style.iconCover}>
					<ArrowLeft size={20} color={colors.text} />
				</Pressable>
				<Text style={style.brandText}>{title}</Text>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		height: 50,
		width: "100%",
		borderBottomWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
		backgroundColor: colors.bgBlackTrans,
		borderBottomColor: colors.borderHeader,
	},
	titleCover: {
		flexDirection: "row",
		alignItems: "center",
	},
	brandText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.text,
		marginLeft: 10,
	},
	button: {
		height: 30,
		width: 140,
	},
});

export default Header;