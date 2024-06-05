import React from "react";
import { View, Pressable, Linking, Text, StyleSheet } from "react-native";

// Custom Components
import LightButton from "../button/LightButton";
import Link from "../text/Link";

// Lucide Icons
import { Pencil, FileText } from "lucide-react";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const FormCard = ({ data = {}, onResponseClick, onFormPress, onSharePress }) => {
	const link = `https://${window.location.host}/submission/${data.link_code}`;
	const onLinkPress = () => {
		Linking.openURL(link);
	};
	return (
		<Pressable onPress={onFormPress} style={style.main}>
			<View style={style.iconCover}>
				<FileText size={50} color={colors.textGrey} />
			</View>
			<View style={style.textContent}>
				<Text numberOfLines={1} style={style.title}>
					{data.title}
				</Text>
				<Link
					numberOfLines={1}
					style={style.link}
					text={link}
					onPress={onLinkPress}
				/>
				<View style={style.buttonRow}>
					<LightButton
						onPress={onResponseClick}
						text="Submissions"
						style={style.button2}
					/>
					<LightButton
						onPress={onFormPress}
						text="Manage"
						style={style.button2}
						renderIcon={() => (
							<Pencil size={15} color={colors.text} />
						)}
					/>
				</View>
			</View>
		</Pressable>
	);
};

const style = StyleSheet.create({
	main: {
		backgroundColor: colors.card3,
		borderWidth: 1,
		borderColor: colors.border3,
		height: 120,
		borderRadius: 14,
		width: "100%",
		marginTop: 20,
		padding: 10,
		flexDirection: "row",
	},
	iconCover: {
		width: 100,
		height: 100,
		overflow: "hidden",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.buttonLight,
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
	},
	buttonRow: {
		marginTop: 10,
		flexDirection: "row",
	},
	button: {
		height: 30,
		width: 100,
		borderRadius: 6,
		marginRight: 20,
	},
	button2: {
		height: 30,
		width: 120,
		borderRadius: 6,
		marginRight: 20,
	},
});

export default FormCard;