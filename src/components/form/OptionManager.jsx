import React from "react";
import {
	TextInput,
	Pressable,
	Modal,
	View,
	StyleSheet,
	Text,
} from "react-native";
import { ArrowRight, X as Close, GripVertical, Trash2 } from "lucide-react";

// Custom Components
import LightButton from "../button/LightButton";

// Sortable Components
import {
	sortableContainer,
	sortableElement,
	sortableHandle,
} from "react-sortable-hoc";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

// Functions
import arrayMove from "array-move";
import { v4 as uuidv4 } from "uuid";

const DragHandle = sortableHandle(() => (
	<View style={{ cursor: "grab" }}>
		<GripVertical size={22} color={colors.text} />
	</View>
));

const SortableItem = sortableElement(({ data, onDelete, onEdit }) => (
	<View style={style.card}>
		<DragHandle />
		<TextInput
			placeholder="Enter option"
			placeholderTextColor={colors.textGrey}
			value={data.option}
			style={style.input}
			onChangeText={onEdit}
		/>
		<Pressable onPress={onDelete} style={style.icon}>
			<Trash2 size={20} color={colors.text} />
		</Pressable>
	</View>
));

const SortableList = sortableContainer(({ children }) => {
	return <View>{children}</View>;
});

const OptionManager = ({ options = [], onChange }) => {
	const [isVisible, setIsVisible] = React.useState(false);

	const handleSortEnd = ({ oldIndex, newIndex }) => {
		onChange((items) => {
			return arrayMove(items, oldIndex, newIndex);
		});
	};

	const addNewOption = () => {
		const newList = [...options];
		newList.push({
			id: uuidv4(),
			option: "",
		});
		onChange(newList);
	};

	const handleDelete = (index) => {
		const newList = [...options];
		newList.splice(index, 1)
		onChange(newList);
	};

	const handleEdit = (text, index) => {
		const newList = [...options];
		newList[index].option = text;
		onChange(newList);
	};

	const renderOptions = (item, index) => {
		return (
			<SortableItem
				onDelete={() => handleDelete(index)}
				onEdit={(text) => handleEdit(text, index)}
				index={index}
				key={item.id}
				data={item}
			/>
		);
	};

	return (
		<>
			<Pressable onPress={() => setIsVisible(true)} style={style.main}>
				<Text style={style.placeholder}>Add options</Text>
				{options.length ? (
					<View style={style.badge}>
						<Text style={style.badgeText}>
							{options.length}
						</Text>
					</View>
				) : (
					<ArrowRight size={20} color={colors.textGrey} />
				)}
			</Pressable>
			<Modal
				onRequestClose={() => setIsVisible(false)}
				transparent
				visible={isVisible}
				animationType="fade"
			>
				<View style={style.modelMain}>
					<View style={style.content}>
						<View style={style.header}>
							<Text style={style.title}>Options Manager</Text>
							<Pressable
								onPress={() => setIsVisible(false)}
								style={style.closeIcon}
							>
								<Close size={24} color={colors.text} />
							</Pressable>
						</View>
						<SortableList
							useDragHandle
							items={options}
							onSortEnd={handleSortEnd}
						>
							{options.map(renderOptions)}
						</SortableList>

						<LightButton
							style={style.button}
							textStyle={style.buttonText}
							onPress={addNewOption}
							text="Add new option"
						/>
						<LightButton
							style={style.button}
							textStyle={style.buttonText}
							onPress={() => setIsVisible(false)}
							text="Okay"
						/>
					</View>
				</View>
			</Modal>
		</>
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
	placeholder: {
		color: colors.textGrey,
		fontWeight: weights.semibold,
		fontSize: sizes.subTitle,
	},
	badge: {
		width: 25,
		height: 25,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.safeGreen,
		borderRadius: 50,
	},
	badgeText: {
		color: colors.card,
		fontWeight: weights.semibold,
		fontSize: sizes.button,
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
	button: {
		width: "90%",
		marginTop: 10,
	},
	input: {
		flex: 1,
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.text,
		marginLeft: 5,
	},
	card: {
		height: 50,
		width: 340,
		alignSelf: "center",
		borderRadius: 7,
		flexDirection: "row",
		paddingLeft: 5,
		paddingRight: 10,
		backgroundColor: colors.cardGrey,
		borderColor: colors.borderActive,
		marginTop: 20,
		alignItems: "center",
	},
	icon: {
		height: 50,
		width: 30,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default OptionManager;