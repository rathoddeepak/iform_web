import React from "react";
import { View, Pressable, TextInput, StyleSheet } from "react-native";

// Lucide Icons
import { GripHorizontal, Trash2 } from "lucide-react";
// Sortable Components
import { sortableHandle } from "react-sortable-hoc";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

// Functions
import Backend from "../../backend";
import toast from "react-hot-toast";
import { removeSpace } from "../../utils/helper";

const DragHandle = sortableHandle(() => (
	<View style={style.grabCover}>
		<GripHorizontal size={22} color={colors.text} />
	</View>
));

const QuestionCard = (
	{ data, onChange, selected = false, onDelete, onFocus },
	ref,
) => {
	React.useImperativeHandle(ref, () => ({
		update,
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}), []);
	const questionTextRef = React.useRef(data?.question_text || "");
	const [questionText, setQuestionText] = React.useState(
		data?.question_text || "",
	);
	const [isBusy, setIsBusy] = React.useState(false);
	const update = async (updates) => {
		try {
			if (isBusy) {
				return;
			}
			if (removeSpace(questionTextRef.current).length === 0) {
				toast.error("Please enter question");
				return;
			}
			setIsBusy(true);
			const response = await Backend.Question.Update({
				id: parseInt(data.id),
				page_id: parseInt(data.page_id),
				question_text: questionTextRef.current,
				...updates,
			});
			if (response?.success) {
				// eslint-disable-next-line eqeqeq
				toast.success("Changes saved!");
				onChange();
			} else {
				throw new Error(response?.message);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setIsBusy(false);
		}
	};

	const deleteQuestion = async () => {
		try {
			setIsBusy(true);
			const response = await Backend.Question.Delete(
				data.id,
				data.page_id,
			);
			if (response?.success) {
				toast.success("Question deleted!");
				onChange();
			} else {
				throw new Error(response?.message);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setIsBusy(false);
		}
	};

	return (
		<View
			style={[
				style.main,
				{ borderWidth: selected ? 1 : 0, opacity: selected ? 1 : 0.5 },
			]}
		>
			<DragHandle />
			<View style={style.row}>
				<TextInput
					multiline
					style={style.textContent}
					placeholder="Enter Question"
					placeholderTextColor={colors.textGrey}
					onFocus={onFocus}
					value={questionText}
					onChangeText={(text) => {
						setQuestionText(text);
						questionTextRef.current = text;
					}}
				/>
				<Pressable onPress={deleteQuestion} style={style.iconCover}>
					<Trash2 size={18} color={colors.text} />
				</Pressable>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		width: "100%",
		minHeight: 100,
		backgroundColor: colors.cardGrey,
		borderColor: colors.borderActive,
		borderRadius: 10,
		marginTop: 30,
	},
	grabCover: {
		width: "100%",
		height: 30,
		justifyContent: "center",
		alignItems: "center",
		cursor: "grab",
	},
	row: {
		flexDirection: "row",
		paddingHorizontal: 10,
	},
	textContent: {
		flex: 1,
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.text,
	},
	iconCover: {
		height: 30,
		width: 30,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default React.forwardRef(QuestionCard);