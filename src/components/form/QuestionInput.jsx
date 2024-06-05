import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

// Custom Components
import CheckBoxGroup from "../../components/checkbox/CheckBoxGroup";
import RadioBoxGroup from "../../components/checkbox/RadioBoxGroup";

// Constants
import { QUESTION_TYPES } from "../../utils/constants";
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const QuestionInput = ({ data, onChange }) => {
	const renderOption = () => {
		switch (data.question_type) {
			case QUESTION_TYPES.TEXT:
			case QUESTION_TYPES.EMAIL:
			case QUESTION_TYPES.PHONE:
				return (
					<TextInput
						style={style.input}
						onChangeText={onChange}
						placeholderTextColor={colors.textGrey}
						value={data?.submission_answer?.value}
						placeholder="Your answer"
					/>
				);
			case QUESTION_TYPES.CHOICE:
				return (
					<RadioBoxGroup
						onChange={onChange}
						style={style.input}
						options={data?.question_config?.options}
						selected={data?.submission_answer?.value}
					/>
				);
			case QUESTION_TYPES.CHECKBOX:
				return (
					<CheckBoxGroup
						onChange={onChange}
						options={data?.question_config?.options}
						selected={data?.submission_answer?.value}
					/>
				);
			default:
				return null;
		}
	};

	const renderErrors = (error, idx) => {
		return (
			<Text key={idx} style={style.error}>{error}</Text>
		)
	};

	return (
		<View style={style.main}>
			<Text style={style.textContent}>
				{data.question_text}
				{data?.question_config?.required ? (
					<Text style={style.required}>*</Text>
				) : null}
			</Text>
			{renderOption()}
			{data?.errors?.map(renderErrors)}
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		width: "100%",
		backgroundColor: colors.cardGrey,
		borderColor: colors.border2,
		borderRadius: 10,
		marginTop: 30,
		borderWidth: 1,
		padding: 15,
	},
	textContent: {
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.text,
		marginBottom: 20,
	},
	required: {
		color: colors.darkRed,
		marginLeft: 5,
	},
	iconCover: {
		height: 30,
		width: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		width: "100%",
		minHeight: 30,
		fontSize: sizes.subTitle,
		color: colors.text,
	},
	error: {
		color: colors.lightRed,
		marginVertical: 8,
		fontSize: sizes.subTitle
	}
});

export default React.memo(QuestionInput);