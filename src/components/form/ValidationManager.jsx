import React from "react";
import { Pressable, Modal, View, StyleSheet, Text } from "react-native";
import { ArrowRight, X as Close } from "lucide-react";

// Custom Components
import NumberInput from "./NumberInput";
import CheckBox from "../checkbox/";

// Constants
import { sizes, weights } from "../../themes/fonts";
import colors from "../../themes/colors";

// Functions
import { bindValidations } from "../../utils/helper";

const TEXT_CHAR_LEN = "text_char_len";
const VALID_PHONE = "valid_phone";
const VALID_EMAIL = "valid_email";
const OPTION_SELECT_LIMIT = "option_select_limit";

const ValidationManager = ({
	supportedValidations = [],
	currentValidations = [],
	onChange,
}) => {
	const [isVisible, setIsVisible] = React.useState(false);
	const activeCount = React.useMemo(() => {
		return currentValidations.reduce((acc, curr) => {
			if (curr?.isActive) {
				return acc + 1;
			} else {
				return acc;
			}
		}, 0)
	}, [currentValidations])
	return (
		<>
			<Pressable onPress={() => setIsVisible(true)} style={style.main}>
				<Text style={style.placeholder}>Set validations</Text>
				{activeCount ? (
					<View style={style.badge}>
						<Text style={style.badgeText}>
							{activeCount}
						</Text>
					</View>
				) : (
					<ArrowRight size={20} color={colors.textGrey} />
				)}
			</Pressable>
			{isVisible ? (
				<ValidationModal
					supported={supportedValidations}
					initial={currentValidations}
					onChange={onChange}
					onClose={() => setIsVisible(false)}
				/>
			) : null}
		</>
	);
};

const ValidNumCard = ({
	title,
	isActive,
	value,
	onValueChange,
	onActiveChange,
}) => {
	return (
		<View style={style.cardHeader}>
			<View style={style.cardRow}>
				<Text style={style.cardTitle}>{title}</Text>
				<CheckBox
					selected={isActive}
					onChange={() => onActiveChange(!isActive)}
				/>
			</View>
			{isActive ? (
				<NumberInput
					placeholder="Enter value"
					style={style.numberInput}
					onChange={onValueChange}
					value={value}
				/>
			) : null}
		</View>
	);
};

const ValidFixed = ({ title }) => {
	return (
		<View style={style.cardHeader}>
			<View style={style.cardRow}>
				<Text style={style.cardTitle}>{title}</Text>
				<CheckBox selected={true} onChange={() => {}} />
			</View>
		</View>
	);
};

const ValidationModal = ({ onClose, onChange, initial = [], supported = [] }) => {
	const [currentValidations, setCurrentValidations] = React.useState([]);
	const [isVisible, setIsVisible] = React.useState(false);

	const bindInitial = () => {
		const current = bindValidations(initial, supported);		
		setCurrentValidations(current);
	};

	const handleValueChange = (newValue, item, index) => {
		const newValidations = [...currentValidations];
		const newItem = { ...item };
		newItem.value = newValue;
		newValidations[index] = newItem;
		setCurrentValidations(newValidations);
		onChange(newValidations);
	};

	const handleActiveChange = (newValue, item, index) => {
		const newValidations = [...currentValidations];
		const newItem = { ...item };
		newItem.isActive = newValue;
		newItem.value = "";
		newValidations[index] = newItem;
		setCurrentValidations(newValidations);
		onChange(newValidations);
	};

	React.useEffect(() => {
		setIsVisible(true);
		bindInitial();
	}, []);

	const renderValidationCard = (item, index) => {
		switch (item.id) {
			case TEXT_CHAR_LEN:
				return (
					<ValidNumCard
						title="Limit answer charecters"
						isActive={item.isActive}
						value={item.value}
						onActiveChange={(newValue) => {
							handleActiveChange(newValue, item, index);
						}}
						onValueChange={(newValue) =>
							handleValueChange(newValue, item, index)
						}
					/>
				);
			case VALID_PHONE:
				return <ValidFixed title="Check for valid phone number" />;
			case VALID_EMAIL:
				return <ValidFixed title="Check for valid email" />;
			case OPTION_SELECT_LIMIT:
				return (
					<ValidNumCard
						title="Limit max selection allowed"
						isActive={item.isActive}
						value={item.value}
						onActiveChange={(newValue) => {
							handleActiveChange(newValue, item, index);
						}}
						onValueChange={(newValue) =>
							handleValueChange(newValue, item, index)
						}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<Modal
			onRequestClose={onClose}
			transparent
			visible={isVisible}
			animationType="fade"
		>
			<View style={style.modelMain}>
				<View style={style.content}>
					<View style={style.header}>
						<Text style={style.title}>Validation Manager</Text>
						<Pressable onPress={onClose} style={style.closeIcon}>
							<Close size={24} color={colors.text} />
						</Pressable>
					</View>
					{currentValidations.map(renderValidationCard)}
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
		borderRadius: 50
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
		width: 500,
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
	cardHeader: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: colors.border,
		marginTop: 20,
		width: "95%",
	},
	cardRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	cardTitle: {
		flex: 1,
		fontWeight: weights.semibold,
		fontSize: sizes.subTitle,
		color: colors.text,
	},
	numberInput: {
		height: 35,
		width: 120,
	},
});

export default ValidationManager;