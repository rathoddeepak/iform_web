import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

// Custom Components
import ResponseViewer from "../../components/form/ResponseViewer";
import RadicalTop from "../../components/backgrounds/RadicalTop";
import LightButton from "../../components/button/LightButton";
import FormShimmer from "../../components/shimmer/FormShimmer";
import CreateForm from "../../components/form/CreateForm";
import FormCard from "../../components/form/FormCard";
import Preloader from "../../components/preloader/";
import Footer from "../../components/footer/";
import Header from "../../components/header/";

// Lucide Icons
import { Plus, Cable } from "lucide-react";

// Hooks
import useIsMobile from "../../hooks/useIsMobile";

// Assets
import { ReactComponent as FormIcon } from "../../assets/icons/form.svg";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

// Hooks
import { useNavigate } from "react-router-dom";

// Functions
import Backend from "../../backend/";

const Home = () => {
	const navigate = useNavigate();
	const createFormRef = React.useRef();
	const responseViewer = React.useRef();
	const [isLoading, setIsLoading] = React.useState(false);
	const [hasError, setHasError] = React.useState(false);
	const [formList, setFormList] = React.useState([]);
	const [isMobile, currentWidth] = useIsMobile();
	const cardWidth = React.useMemo(() => {
		return currentWidth * (isMobile ? 0.9 : 0.45);
	}, [isMobile, currentWidth]);

	const loadData = async () => {
		try {
			setIsLoading(true);
			setHasError(false);
			const response = await Backend.Form.List();
			console.log(response);
			if (response?.success) {
				setFormList(response.data);
			} else {
				throw new Error(response?.message);
			}
		} catch (err) {
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const showForm = (formId) => {
		navigate("/form/" + formId);
	};

	React.useEffect(() => {
		loadData();
	}, []);

	const renderCreateNew = () => {
		return (
			<View style={style.content}>
				<FormIcon />
				<Text style={style.note}>
					You have not created any form. Get started by creating one
				</Text>
				<LightButton
					text="Create new"
					style={style.button}
					onPress={() => createFormRef.current.init()}
					renderIcon={() => <Plus size={20} color={colors.text} />}
				/>
			</View>
		);
	};

	const renderError = () => {
		return (
			<View style={style.content}>
				<Cable size={100} color={colors.textGrey} />
				<Text style={style.note}>
					Something went wrong! Please try again.
				</Text>
				<LightButton
					text="Try again"
					style={style.button}
					onPress={loadData}
				/>
			</View>
		);
	};

	const renderFormItems = ({ item }) => {
		return (
			<FormCard
				onResponseClick={() => responseViewer.current.show(item.id)}
				onFormPress={() => showForm(item.id)}
				data={item}
			/>
		);
	};

	const renderHeader = () => {
		return (
			<View style={style.titleBar}>
				<Text style={style.title}>My Forms</Text>
				<LightButton
					text="Create new"
					style={style.button2}
					onPress={() => createFormRef.current.init()}
					renderIcon={() => <Plus size={20} color={colors.text} />}
				/>
			</View>
		);
	};

	const renderLoading = () => {
		return (
			<View style={[style.content2, { width: cardWidth }]}>
				{renderHeader()}
				<FormShimmer />
				<FormShimmer />
				<FormShimmer />
			</View>
		);
	};

	return (
		<>
			<RadicalTop>
				<Header />
				<Preloader
					renderEmpty={renderCreateNew}
					renderLoading={renderLoading}
					renderError={renderError}
					isEmpty={!formList.length}
					isLoading={isLoading}
					hasError={hasError}
				>
					<View style={[style.content2, { width: cardWidth }]}>
						{renderHeader()}
						<FlatList
							showsVerticalScrollIndicator={false}
							data={formList}
							style={{ width: "100%" }}
							renderItem={renderFormItems}
							ListFooterComponent={<View style={style.gap} />}
						/>
					</View>
				</Preloader>
				<Footer />
			</RadicalTop>
			<CreateForm onCreate={loadData} ref={createFormRef} />
			<ResponseViewer ref={responseViewer} />
		</>
	);
};

const style = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	content2: {
		alignItems: "center",
		flex: 1,
	},
	note: {
		color: colors.textGrey,
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		marginTop: 30,
		textAlign: "center",
		width: "90%",
	},
	button: {
		marginTop: 30,
		width: 170,
		height: 35,
	},
	button2: {
		width: 140,
		height: 35,
	},
	titleBar: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 50,
		marginTop: 30,
	},
	title: {
		fontSize: sizes.title2,
		fontWeight: weights.bold,
		color: colors.text,
	},
	gap: {
		height: 50,
	},
});

export default Home;