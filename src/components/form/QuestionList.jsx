import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

// Custom Components
import QuestionShimmer from "../shimmer/QuestionShimmer";
import LightButton from "../button/LightButton";
import QuestionPanel from "./QuestionPanel";
import QuestionCard from "./QuestionCard";
import FormInput from "./FormInput";

// Sortable Components
import { sortableContainer, sortableElement } from "react-sortable-hoc";

// Constants
import colors from "../../themes/colors";
import { DEFAULT_ERROR } from "../../utils/constants";

// Functions
import Backend from "../../backend";
import toast from "react-hot-toast";
import arrayMove from "array-move";

const SortableItem = sortableElement(
	React.forwardRef((props, ref) => <QuestionCard {...props} ref={ref} />),
	{
		withRef: true,
	},
);

const SortableList = sortableContainer(({ children }) => {
	return (
		<ScrollView style={style.max} showsVerticalScrollIndicator={false}>
			<View style={style.max}>{children}</View>
		</ScrollView>
	);
});

const QuestionList = ({ data, pageId }) => {
	const questionCards = React.useRef([]);
	// eslint-disable-next-line no-unused-vars
	const [hasError, setHasError] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	// eslint-disable-next-line no-unused-vars
	const [isBusy, setIsBusy] = React.useState(false);
	const [currentQuestion, setCurrentQuestion] = React.useState(0);
	const [questionList, setQuestionList] = React.useState([]);

	const loadData = async () => {
		try {
			if (!pageId || isLoading) {
				setQuestionList([]);
				return;
			}
			setIsLoading(true);
			setHasError(false);
			setQuestionList([]);
			const response = await Backend.Question.List(pageId);
			if (response?.success) {
				setQuestionList(response.data);
			} else {
				throw new Error(response?.message || DEFAULT_ERROR);
			}
		} catch (err) {
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const addNewQuestion = async () => {
		try {
			setIsBusy(true);
			const response = await Backend.Question.Create(pageId);
			if (response?.success) {
				loadData();
			} else {
				throw new Error(response?.message || DEFAULT_ERROR);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setIsBusy(false);
		}
	};

	const reset = () => {
		loadData();
		setCurrentQuestion(null);
	};

	const handleFocus = (item) => {
		if(item.id === currentQuestion?.id) {
			return;
		}
		setCurrentQuestion(null);
		setTimeout(() => {
			setCurrentQuestion(item);
		}, 100);
	};

	const handleSortEnd = ({ oldIndex, newIndex }) => {
		setQuestionList((currentQuestions) => {
			const list = arrayMove(currentQuestions, oldIndex, newIndex);
			Backend.Question.Order(list.map((p) => parseInt(p.id)));
			return list;
		});
	};

	React.useEffect(() => {
		reset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageId]);

	const renderQuestion = (item, index) => {
		return (
			<SortableItem
				onFocus={() => handleFocus(item)}
				data={item}
				key={item.id}
				index={index}
				onChange={reset}
				ref={(ref) =>
					(questionCards[item.id] = ref?.getWrappedInstance())
				}
				onChangeText={(question_text) => {
					setQuestionList((list) => {
						list[index].question_text = question_text;
						return list;
					});
				}}
				// eslint-disable-next-line eqeqeq
				selected={currentQuestion?.id == item.id}
			/>
		);
	};
	// Pending Shimmers
	return (
		<>
			<View style={style.main}>
				<FormInput />
				{isLoading ? (
					<>
						<QuestionShimmer />
						<QuestionShimmer />
						<QuestionShimmer />
					</>
				) : null}
				<SortableList
					useDragHandle
					items={questionList}
					onSortEnd={handleSortEnd}
				>
					{questionList.map(renderQuestion)}
				</SortableList>
				<LightButton
					style={style.button}
					bgColor={colors.cardGrey}
					textStyle={style.buttonText}
					onPress={addNewQuestion}
					text="Add new question"
				/>
			</View>
			<QuestionPanel
				onChange={(updates) => {
					questionCards[currentQuestion.id].update(updates);
				}}
				data={currentQuestion}
				onSave={reset}
				onCancel={() => setCurrentQuestion(null)}
			/>
		</>
	);
};

const style = StyleSheet.create({
	main: {
		flex: 1,
		alignItems: "center",
		paddingTop: 30,
		paddingHorizontal: 70,
	},
	button: {
		marginVertical: 20,
	},
	max: {
		width: "100%",
	},
});

export default QuestionList;