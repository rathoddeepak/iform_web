import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

// Custom Components
import ShortFormCardShimmer from "../shimmer/ShortFormCardShimmer";
import CreateForm from "./CreateForm";

// Lucide Icons
import { FileText, ChevronRight } from "lucide-react";

// Constants
import { DEFAULT_ERROR } from "../../utils/constants";
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

// Hooks
import { useParams } from "react-router-dom";

// Functions
import Backend from "../../backend";

const FormInput = () => {
	const { formId } = useParams();
	const createFormRef = React.useRef(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [data, setData] = React.useState({});
	const link = `${window.location.host}/${data.link_code}`;

	const loadData = async () => {
		try {
			setIsLoading(true);
			const response = await Backend.Form.GetById(formId);
			if (response?.success) {
				console.log(response);
				setData(response.data);
				setIsLoading(false);
			} else {
				throw new Error(response?.message || DEFAULT_ERROR);
			}
		} catch (err) {
			// toast.error(err.message);
		}
	};

	React.useEffect(() => {
		loadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{isLoading ? (
				<ShortFormCardShimmer />
			) : (
				<Pressable
					onPress={() => {
						createFormRef.current.init(data);
					}}
					style={style.main}
				>
					<View style={style.iconCover}>
						<FileText size={50} color={colors.textGrey} />
					</View>
					<View style={style.textContent}>
						<Text numberOfLines={1} style={style.title}>
							{data.title}
						</Text>
						<Text style={style.link}>{link}</Text>
					</View>
					<View style={style.arrowCover}>
						<ChevronRight size={20} color={colors.textGrey} />
					</View>
				</Pressable>
			)}
			<CreateForm onCreate={loadData} ref={createFormRef} />
		</>
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
		alignItems: 'center'
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
	},
	row: {
		flexDirection: "row",
	},
	button: {
		height: 30,
		width: 120,
		borderRadius: 6,
		marginTop: 10,
	},
});

export default FormInput;