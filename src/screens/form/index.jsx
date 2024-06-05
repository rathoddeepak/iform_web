import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Custom Components
import RadicalTop from "../../components/backgrounds/RadicalTop";
import QuestionList from "../../components/form/QuestionList";
import FormHeader from "../../components/header/FormHeader";
import PageLayer from "../../components/form/PageLayer";
import Preloader from "../../components/preloader/";

// Lucide Icons
import { Plus } from "lucide-react";

// Hooks
import useIsMobile from "../../hooks/useIsMobile";
import { useParams } from "react-router-dom";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const FormScreen = () => {
	const { formId } = useParams();
	const [isLoading, setIsLoading] = React.useState(false);
	const [hasError, setHasError] = React.useState(false);
	const [currentPageId, setCurrentPageId] = React.useState(0);	
	const isFirstPage = true;
	const [isMobile] = useIsMobile();

	return (
		<RadicalTop>
			<FormHeader title="Manage form" />
			<Preloader
				isEmpty={false}
				isLoading={isLoading}
				hasError={hasError}
			>
				<View style={style.main}>
					<PageLayer
						currentPageId={currentPageId}
						onSelect={setCurrentPageId}
					/>
					<QuestionList
						pageId={currentPageId}
					/>
				</View>
			</Preloader>
		</RadicalTop>
	);
};

const style = StyleSheet.create({
	main: {
		flexDirection: "row",
		width: "100%",
		flex: 1,
	},
	content: {
		flex: 1,
	},
});

export default FormScreen;