import React from "react";
import { View, Pressable, Text, StyleSheet, ScrollView } from "react-native";

// Custom Components
import RadicalTop from "../../components/backgrounds/RadicalTop";
import FormSmallCard from "../../components/form/FormSmallCard";
import LightButton from "../../components/button/LightButton";
import { ArrowRight, Check } from "lucide-react";
import Page from "./Page";

// Hooks
import useIsMobile from "../../hooks/useIsMobile";
import { useParams } from "react-router-dom";

// Constants
import { DEFAULT_ERROR } from "../../utils/constants";
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

// Functions
import { getSubmissionId, setSubmissionId } from "../../local/";
import Backend from "../../backend";
import toast from "react-hot-toast";

const SubmissionScreen = () => {
	const { formCode, userFormId, responseId } = useParams();
	const formPageRef = React.useRef();
	const formId = React.useMemo(() => {
		if (userFormId) {
			return userFormId;
		}
		return parseInt(formCode?.replace(/\D/g, "") || 0);
	}, [formCode, userFormId]);

	// eslint-disable-next-line no-unused-vars
	const [isMobile, _, height] = useIsMobile();
	const [currentSubmissionId, setCurrentSubmissionId] = React.useState(0);
	const [currentPageId, setCurrentPageId] = React.useState(0);

	const [isBusy, setIsBusy] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	// eslint-disable-next-line no-unused-vars
	const [hasError, setHasError] = React.useState(false);
	const [isSubmitted, setIsSubmitted] = React.useState(false);

	const [formDetails, setFormDetails] = React.useState({});
	const [formPages, setFormPages] = React.useState([]);

	const contentWidth = isMobile ? "90%" : 600;

	const initSubmission = async () => {
		try {
			setIsLoading(true);
			setHasError(false);
			const submissionId = responseId || getSubmissionId(formId);
			const response = await Backend.Submission.Init(
				formId,
				submissionId,
			);
			if (response?.success) {
				const id = parseInt(response.data.submission_id);
				const pages = response.data?.pages || [];
				setCurrentSubmissionId(id);
				setFormDetails(response.data.form);
				setFormPages(pages);
				if (!responseId) {
					setSubmissionId(formId, id);
				}				
				setIsSubmitted(response.data?.submitted || false);
				if (pages?.length) {
					setCurrentPageId(pages[0].id);
				}
			} else {
				throw new Error(response?.message);
			}
		} catch (err) {
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const nextPage = () => {
		// eslint-disable-next-line eqeqeq
		const newIdx = formPages.findIndex((p) => p.id == currentPageId) + 1;
		if (newIdx < formPages.length) {
			setCurrentPageId(formPages[newIdx].id);
		} else {
			setIsSubmitted(true);
			setCurrentPageId(formPages[0].id);
		}
	};

	const submitForm = async () => {
		try {
			setIsBusy(true);
			await formPageRef.current.submitForm();
			nextPage();
		} catch (err) {
			toast.error(err.message || DEFAULT_ERROR);
		} finally {
			setIsBusy(false);
		}
	};

	React.useEffect(() => {
		if (formId) {
			initSubmission();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderPageTab = (page) => {
		// eslint-disable-next-line eqeqeq
		const selected = currentPageId == page.id;
		const color = selected ? colors.text : colors.textGrey;
		return (
			<Pressable
				onPress={() => {
					if (isSubmitted) {
						setCurrentPageId(page.id);
					}
				}}
				key={page.id}
				style={style.tabCover}
			>
				<Text style={[style.tabTitle, { color }]}>{page.title}</Text>
				{selected ? <View style={style.bar} /> : null}
			</Pressable>
		);
	};

	return (
		<RadicalTop>
			<View
				pointerEvents={isSubmitted ? "none" : "auto"}
				style={[style.content, { width: contentWidth, height }]}
			>
				<Page
					pageHeader={
						<FormSmallCard
							data={formDetails}
							isLoading={isLoading}
						/>
					}
					ref={formPageRef}
					formId={formId}
					pageId={currentPageId}
					submissionId={currentSubmissionId}
					isSubmitted={isSubmitted}
				/>
				<View style={style.endButton}>
					<ScrollView horizontal>
						{formPages.map(renderPageTab)}
					</ScrollView>
					{isSubmitted ? (
						<View style={style.card}>
							<Text style={style.title}>Submitted</Text>
							<View style={style.checked}>
								<Check color={colors.textBlack} size={22} />
							</View>
						</View>
					) : (
						<LightButton
							text={"Continue"}
							style={style.button}
							onPress={submitForm}
							loading={isBusy}
							renderRightIcon={() => (
								<ArrowRight size={20} color={colors.text} />
							)}
						/>
					)}
				</View>
			</View>
		</RadicalTop>
	);
};

const style = StyleSheet.create({
	content: {
		alignSelf: "center",
	},
	button: {
		height: 35,
		width: 130,
	},
	tabCover: {
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 20,
	},
	tabTitle: {
		fontWeight: weights.bold,
		fontSize: sizes.subTitle,
		color: colors.text,
		paddingHorizontal: 10,
	},
	endButton: {
		height: 50,
		marginTop: 20,
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderLeftWidth: 1,
		padding: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: colors.cardGrey,
		flexDirection: "row",
		alignItems: "center",
	},
	bar: {
		width: "100%",
		height: 3,
		position: "absolute",
		bottom: 0,
		borderRadius: 3,
		backgroundColor: colors.borderActive,
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		fontWeight: weights.semibold,
		color: colors.text,
		fontSize: 18,
	},
	checked: {
		width: 30,
		height: 30,
		marginLeft: 10,
		justifyContent: "center",
		borderRadius: 30,
		alignItems: "center",
		backgroundColor: colors.safeGreen,
	},
});

export default SubmissionScreen;