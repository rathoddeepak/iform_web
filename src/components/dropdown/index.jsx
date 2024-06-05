import React from "react";
import { View, StyleSheet, Picker } from "react-native"
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

const Dropdown = ({ style = {}, value, onChange, options = [] }) => {
	return (
		<View style={[mStyle.main, style]}>
			<Picker value={value} onValueChange={onChange} style={mStyle.picker}>
			  {options?.map((item) => {
			  	return (
			  		<Picker.Item key={item.id} label={item.title} value={item.id} />
			  	)
			  })}
			</Picker>
		</View>
	)
}

const mStyle = StyleSheet.create({
	main: {
		height: 40,
		width: "100%",
		borderRadius: 7,
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.card,
		justifyContent: "center",
		paddingHorizontal: 10,		
	},
	picker: {
		color: colors.text,
		backgroundColor: colors.card,
		fontWeight: weights.semibold,
		fontSize: sizes.subTitle,
		borderWidth: 0
	}
})

export default Dropdown;