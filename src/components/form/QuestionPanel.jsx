import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

// Custom Components
import { MousePointer2 } from "lucide-react";
import ValidationManager from "./ValidationManager";
import OptionManager from "./OptionManager";
import LightButton from "../button/LightButton";
import SwitchBox from "../switch/SwitchBox";
import Dropdown from "../dropdown/";
import Label from "../text/Label";

// Constants
import colors from "../../themes/colors";
import { sizes, weights } from "../../themes/fonts";

// Functions
import { bindValidations } from "../../utils/helper";
import Backend from "../../backend";
import toast from "react-hot-toast";

const QuestionPanel = ({ data = {}, onChange, onCancel }) => {
	const opacity = React.useRef(new Animated.Value(0)).current;
	const [questionTypes, setQuestionTypes] = React.useState([]);	
	const [currentQuestionType, setCurrentQuestionType] = React.useState(
		data?.question_type || "",
	);
	const [currentValidations, setCurrentValidations] = React.useState(
		data?.validations || [],
	);
	const [currentConfig, setCurrentConfig] = React.useState(
		data?.config || {
			required: false,
			hasOptions: false,
		},
	);
	const [supportedValidations, setSupportedValidations] = React.useState([]);
	const switchPlaceholder = React.useMemo(() => {
		const suffix = currentConfig.required ? "required" : "optional";
		return "It is " + suffix;
	}, [currentConfig.required]);
	const typeOptions = React.useMemo(() => {
		return questionTypes.map((item) => ({
			id: item.id,
			title: item.title,
		}));
	}, [questionTypes]);

	const handleTypeChange = (type, index) => {
		const validations = questionTypes[index].validations;
		const newConfig = questionTypes[index].config;
		handleCurrentValidations(validations);
		setCurrentConfig((config) => ({
			...config,
			...newConfig,
		}));
		setCurrentQuestionType(type);
	};

	const handleCurrentValidations = (validations) => {
		setSupportedValidations(validations);
		setCurrentValidations(bindValidations([], validations));
	};

	const loadInitialData = async () => {
		try {
			const response = await Backend.Form.GetDefaultTypes();
			if (response?.success) {
				setQuestionTypes(response.data);
			} else {
				throw new Error(response?.message);
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	React.useEffect(() => {
		loadInitialData();
		Animated.timing(opacity, {
			toValue: 1,
			useNativeDriver: false,
			duration: 200
		}).start();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		const selectedIdx = questionTypes.findIndex((qt) => {
			console.log(qt);
			return qt.id === data.question_type;
		});
		if (selectedIdx !== -1) {
			const selectedItem = questionTypes[selectedIdx];
			handleTypeChange(selectedItem.id, selectedIdx);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionTypes]);

	const onSubmit = () => {
		if (currentConfig?.hasOptions) {
			let error = false;
			const options = (currentConfig.options || []).filter((op) => {
				if (!op?.option?.length) {
					error = true;
					return false;
				}
				return true;
			});
			if (error) {
				toast.error("Options are not entered correctly!");
				return
			} else if (options.length < 2) {
				toast.error("Atleast 2 options are required!");
				return
			}
		}
		const validations = currentValidations.map((v) => {
			return {
				id: v.id,
				value: v.value,
			};
		});
		onChange({
			question_type: currentQuestionType,
			config: currentConfig,
			validations,
		});
	};

	return (
		<Animated.View style={{ opacity }}>
			<View style={style.header}>
				<Text style={style.headerText}>Manage Question</Text>
			</View>
			<View style={style.content}>
				<Label text="Question type" />
				<Dropdown
					style={style.input}
					label="Type"
					value={currentQuestionType}
					options={typeOptions}
					onChange={handleTypeChange}
				/>

				<Label text="Required" />
				<SwitchBox
					style={style.input}
					placeholder={switchPlaceholder}
					enabled={currentConfig.required}
					onChange={(required) => {
						setCurrentConfig((config) => ({
							...config,
							required,
						}));
					}}
				/>

				{currentConfig?.hasOptions ? (
					<>
						<Label text="Set options" />
						<OptionManager
							options={currentConfig?.options}
							onChange={(options) => {
								setCurrentConfig((config) => ({
									...config,
									options,
								}));
							}}
						/>
					</>
				) : (
					<>
						<Label text="Validations" />
						<ValidationManager
							supportedValidations={supportedValidations}
							currentValidations={currentValidations}
							onChange={setCurrentValidations}
						/>
					</>
				)}

				<View style={style.hr} />

				<LightButton
					style={style.button}
					bgColor={colors.cardGrey}
					textStyle={style.buttonText}
					onPress={onSubmit}
					text="Save Changes"
				/>
				<LightButton
					style={style.button}
					bgColor={colors.cardGrey}
					textStyle={style.buttonText}
					onPress={onCancel}
					text="Cancel"
				/>
			</View>
		</Animated.View>
	);
};

const Wrapper = (props) => {
	return (
		<View style={style.main}>
			{props?.data ? (
				<QuestionPanel {...props} />
			) : (
				<View style={style.selectCover}>
					<MousePointer2 size={60} color={colors.textGrey} />
					<Text style={style.selectText}>
						Select question to modify
					</Text>
				</View>
			)}
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		width: 300,
		height: "100%",
		borderLeftWidth: 1,
		borderColor: colors.borderHeader,
	},
	header: {
		height: 40,
		width: "100%",
		paddingLeft: 10,
		borderBottomWidth: 1,
		justifyContent: "center",
		borderColor: colors.borderHeader,
	},
	headerText: {
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.text,
	},
	input: {
		marginTop: 10,
	},
	content: {
		width: "95%",
		alignSelf: "center",
	},
	button: {
		alignSelf: "center",
		borderRadius: 7,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	buttonText: {
		fontSize: sizes.button,
	},
	hr: {
		width: "100%",
		height: 1,
		marginTop: 20,
		backgroundColor: colors.border3,
	},
	selectCover: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
	},
	selectText: {
		marginTop: 10,
		fontSize: sizes.subTitle,
		color: colors.textGrey,
	},
});

export default Wrapper;