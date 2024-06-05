import React from "react";
import { StyleSheet, FlatList } from "react-native";

// Custom components
import QuestionInput from "../../components/form/QuestionInput";

// Constants
import { DEFAULT_ERROR, QUESTION_VALIDATIONS } from "../../utils/constants";

// Functions
import * as validations from "../../utils/validations";
import Backend from "../../backend";

const Page = ({ formId, submissionId, pageId, onSubmit, pageHeader }, ref) => {	
	const [fields, setFields] = React.useState([]);
	// eslint-disable-next-line no-unused-vars
	const [isLoading, setIsLoading] = React.useState(false);
	// eslint-disable-next-line no-unused-vars
	const [hasError, setHasError] = React.useState(false);
	React.useImperativeHandle(
		ref,
		() => ({
			submitForm,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[fields],
	);

	const updateValue = (value, index) => {
		const currentFields = [...fields];
		if (currentFields[index]?.submission_answer) {
			currentFields[index].submission_answer.value = value;
		} else {
			currentFields[index].submission_answer = {
				value,
			};
		}
		setFields(currentFields);
	};

	const loadSubmission = async () => {
		try {
			setIsLoading(true);
			setHasError(false);
			setFields([]);
			const response = await Backend.Submission.Data(
				pageId,
				submissionId,
			);
			if (response?.success) {
				setFields(response.data);
			} else {
				throw new Error(response?.message);
			}
		} catch (err) {
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		if (pageId) {
			loadSubmission();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageId]);

	const validateSubmission = () => {
		let hasError = false;
		const newFields = [];
		const answers = [];
		fields.forEach((field) => {			
			const errors = [];
			const required = field?.question_config?.required;
			const hasOptions = field?.question_config?.hasOptions;
			const answer = field?.submission_answer;
			if (required && !answer) {
				errors.push("Field is requred!");
			}
			const questionValidations = field?.question_validations || [];
			if (!hasOptions) {
				questionValidations.forEach((vld) => {
					switch (vld.id) {
						case QUESTION_VALIDATIONS.TEXT_CHAR_LEN:
							const limit = parseInt(vld.value);
							if (answer?.length > limit) {
								errors.push("Charecter limit exceeded");
							}
							break;
						case QUESTION_VALIDATIONS.VALID_PHONE:
							if (!validations.isValidPhoneNumber(answer)) {
								errors.push("Invalid Phone number");
							}
							break;
						case QUESTION_VALIDATIONS.VALID_EMAIL:
							if (!validations.isValidEmail(answer)) {
								errors.push("Invalid email");
							}
							break;
						default:
							return;
					}
				});
			}
			field.errors = errors;
			if (errors.length) {
				hasError = true;
			}
			newFields.push(field);			
			answers.push({
				submission_id: parseInt(submissionId),				
				question_id: parseInt(field.question_id),
				answer,
			});
		});
		if (hasError) {
			setFields(newFields);
			throw new Error("Form has errors");
		}
		return answers;
	};

	const submitForm = async () => {
		const answers = validateSubmission();
		const response = await Backend.Submission.SubmitAnswers(
			formId,
			submissionId,
			pageId,			
			answers,
		);
		if (!response?.success) {			
			throw new Error(response?.message || DEFAULT_ERROR);
		}
	};

	const renderItem = ({ item, index }) => {
		return (
			<QuestionInput
				onChange={(v) => updateValue(v, index)}
				data={item}
			/>
		);
	};

	return (
		<FlatList
			style={style.max}
			data={fields}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={pageHeader}
			renderItem={renderItem}
		/>
	);
};

const style = StyleSheet.create({
	max: {
		width: "100%",
	},
});

export default React.forwardRef(Page);