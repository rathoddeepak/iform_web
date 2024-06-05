import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "./index";

// Constants
import { sizes } from "../../themes/fonts";
import colors from "../../themes/colors";

const RadioBoxGroup = ({ options, selected, onChange }) => {
	const renderOption = (option, index) => {
		return (
			<View key={option.id} style={style.row}>				
				<CheckBox
					size={20}
					iconSize={18}		
					onChange={() => onChange(option.id)}
					selected={selected === option.id}
				/>
				<Text style={style.label}>{option.option}</Text>
			</View>
		);
	};

	return options.map(renderOption);
};

const style = StyleSheet.create({
	row: {
		flexDirection: "row",
		height: 40,
		alignItems: 'center',
		width: "100%",
	},
	label: {
		fontSize: sizes.subTitle,
		color: colors.text,
		marginLeft: 10
	}
});

export default RadioBoxGroup;