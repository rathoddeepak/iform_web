import React from "react";
import { Pressable, Modal, View, StyleSheet, Text } from "react-native";
import { X as Close, SquareArrowOutUpRight } from "lucide-react";

// Custom Components
import SubmissionShimmer from "../../components/shimmer/SubmissionShimmer";

// Hooks Components
import { useNavigate } from "react-router-dom";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

// Functions
import Backend from "../../backend";

const ResponseViewer = (props, ref) => {
	React.useImperativeHandle(
		ref,
		() => ({
			show,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);
	const [submissions, setSubmissions] = React.useState([]);
	const [formId, setFormId] = React.useState(0);
	const [isVisible, setIsVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const navigate = useNavigate();

	const loadResponses = async (id) => {
		try {
			setIsLoading(true);
			const response = await Backend.Submission.List(id);
			if (response?.success) {
				setSubmissions(response.data);
			} else {
				throw new Error(response?.message);
			}
		} catch (err) {
			setIsVisible(false);
		} finally {
			setIsLoading(false);
		}
	};

	const show = (id) => {
		setFormId(id);
		setSubmissions([]);
		loadResponses(id);
		setIsVisible(true);
	};

	const viewResponse = (id) => {
		navigate(`/form/${formId}/response/${id}`);
	};

	const renderSubmission = (submission) => {
		return (
			<Pressable
				onPress={() => viewResponse(submission.id)}
				style={style.card}
				key={submission.id}
			>
				<Text style={style.cardTitle}>#00{submission.id}</Text>
				<View style={style.icon}>
					<SquareArrowOutUpRight size={20} color={colors.text} />
				</View>
			</Pressable>
		);
	};

	return (
		<Modal
			onRequestClose={() => setIsVisible(false)}
			transparent
			visible={isVisible}
			animationType="fade"
		>
			<View style={style.modelMain}>
				<View style={style.content}>
					<View style={style.header}>
						<Text style={style.title}>Submissions</Text>
						<Pressable
							onPress={() => setIsVisible(false)}
							style={style.closeIcon}
						>
							<Close size={24} color={colors.text} />
						</Pressable>
					</View>
					{isLoading ? (
						<>
							<SubmissionShimmer />
							<SubmissionShimmer />
							<SubmissionShimmer />
						</>
					) : submissions.length === 0 ? (
						<Text style={style.emptyText}>No Submissions!</Text>
					) : null}
					{submissions.map(renderSubmission)}
				</View>
			</View>
		</Modal>
	);
};

const style = StyleSheet.create({
	main: {
		height: 40,
		width: "100%",
		borderRadius: 7,
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.card,
		paddingHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 5,
	},
	modelMain: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.bgBlackTrans,
	},
	content: {
		width: 350,
		paddingBottom: 20,
		backgroundColor: colors.card,
		borderRadius: 10,
		alignItems: "center",
	},
	header: {
		height: 50,
		borderColor: colors.border,
		borderBottomWidth: 1,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 10,
		width: "100%",
	},
	title: {
		fontSize: sizes.subTitle2,
		color: colors.text,
		fontWeight: weights.bold,
	},
	closeIcon: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		height: 50,
		width: 320,
		alignSelf: "center",
		borderRadius: 7,
		flexDirection: "row",
		paddingLeft: 5,
		paddingRight: 10,
		borderWidth: 1,
		backgroundColor: colors.cardGrey,
		borderColor: colors.border,
		marginTop: 20,
		alignItems: "center",
		justifyContent: "space-between"
	},
	cardTitle: {
		fontSize: sizes.subTitle2,
		color: colors.text,
		fontWeight: weights.bold,
	},
	icon: {
		height: 50,
		width: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyText: {
		fontSize: sizes.subTitle2,
		color: colors.textGrey,
		fontWeight: weights.semibold,
		textAlign: "center",
		marginVertical: 20,
	},
});

export default React.forwardRef(ResponseViewer);