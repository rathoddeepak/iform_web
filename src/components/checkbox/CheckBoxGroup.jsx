import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "./index";

// Constants
import { sizes } from "../../themes/fonts";
import colors from "../../themes/colors";

const CheckBoxGroup = ({ options, selected = [], onChange }) => {
	const handleOption = (addedIdx, id) => {
		const list = [...selected];
		if (addedIdx === -1) {
			list.push(id)
		} else {
			list.splice(addedIdx, 1);
		}
		onChange(list);
	}
	const renderOption = (option, index) => {
		const addedIdx = selected.findIndex((id) => id === option.id);
		const isAdded = addedIdx !== -1;
		return (
			<View key={option.id} style={style.row}>				
				<CheckBox
					size={20}
					iconSize={18}
					borderRadius={5}
					onChange={() => handleOption(addedIdx, option.id)}
					selected={isAdded}
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

export default CheckBoxGroup;