import React from "react";
import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import { X as Close } from "lucide-react";

// Custom Components
import Label from "../text/Label";
import Button from "../button";
import Input from "../input/";

// Constants
import { sizes, weights } from "../../themes/fonts";
import { DEFAULT_ERROR } from "../../utils/constants";
import colors from "../../themes/colors";

// Functions
import { isValidTitle } from "../../utils/validations";
import Backend from "../../backend";
import toast from "react-hot-toast";

const CreatePage = (props, ref) => {
	React.useImperativeHandle(
		ref,
		() => ({
			init,
		}),
		[],
	);
	const [isVisible, setIsVisible] = React.useState(false);
	const [pageId, setPageId] = React.useState(undefined);
	const [title, setTitle] = React.useState("");
	const [isBusy, setIsBusy] = React.useState(false);
	const [modalTitle, buttonText, message] = React.useMemo(() => {
		const suffix = " successfully!";
		if (pageId) {
			return ["Edit page", "Update", "Updated" + suffix];
		}
		return ["Create page", "Create", "Created" + suffix];
	}, [pageId]);

	const init = (pageData = undefined) => {
		setIsVisible(true);
		if (typeof pageData === "object") {
			setPageId(pageData.id);
			setTitle(pageData.title);
		}
	};

	const onClose = () => {
		setIsVisible(false);
		setPageId(undefined);
		setTitle("");
	};

	const createFrom = async () => {
		try {
			if (isValidTitle(title)) {
				toast.warn("Please enter valid title");
				return;
			}
			setIsBusy(true);
			const response = await Backend.Page.Create(
				pageId,
				props.formId,
				title,
			);
			if (response?.success) {
				toast.success(message);
				if (typeof props?.onCreate === "function") {
					props.onCreate(response.data);
				}
				onClose();
			} else {
				throw new Error(response?.message || DEFAULT_ERROR);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setIsBusy(false);
		}
	};

	const deletePage = async () => {
		try {
			if (isBusy) {
				return
			}
			setIsBusy(true);
			const response = await Backend.Page.Delete(
				pageId,
				props.formId,
			);
			if (response?.success) {
				toast.success("Page deleted!");
				if (typeof props?.onCreate === "function") {
					props.onCreate(response.data);
				}
				onClose();
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
		<Modal
			onRequestClose={onClose}
			transparent
			visible={isVisible}
			animationType="fade"
		>
			<View style={style.modalMain}>
				<View style={style.content}>
					<View style={style.header}>
						<Text style={style.title}>{modalTitle}</Text>
						<Pressable onPress={onClose} style={style.closeIcon}>
							<Close size={24} color={colors.text} />
						</Pressable>
					</View>

					<View style={style.mainContent}>
						<Label text="Title" />
						<Input
							inputProps={{
								onChangeText: setTitle,
								value: title,
								placeholder: "Enter title",
							}}
							style={style.input}
						/>

						<Button
							text={buttonText}
							style={style.button}
							onPress={createFrom}
							loading={isBusy}
						/>
						{pageId ? (
							<Button
								text={"Delete Page"}
								style={style.button}
								onPress={deletePage}
								loading={isBusy}
							/>
						) : null}
					</View>
				</View>
			</View>
		</Modal>
	);
};

const style = StyleSheet.create({
	modalMain: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.bgBlackTrans,
	},
	content: {
		width: 300,
		paddingBottom: 20,
		backgroundColor: colors.card,
		borderRadius: 10,
		alignItems: "center",
	},
	mainContent: {
		width: 270,
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
	input: {
		marginTop: 6,
	},
	button: {
		marginTop: 20,
	},
});

export default React.forwardRef(CreatePage);