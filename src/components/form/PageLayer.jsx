import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

// Custom Components
import PageShimmer from "../shimmer/PageShimmer";
import LightButton from "../button/LightButton";
import CreatePage from "./CreatePage";
import Preloader from "../preloader";

// Sortable Components
import {
	sortableContainer,
	sortableElement,
	sortableHandle,
} from "react-sortable-hoc";

// Lucide Icons
import { GripVertical, Pencil } from "lucide-react";

// Hooks
import { useParams } from "react-router-dom";

// Constants
import colors from "../../themes/colors";
import { sizes, weights } from "../../themes/fonts";

// Functions
import Backend from "../../backend";
import arrayMove from "array-move";

const DragHandle = sortableHandle(() => (
	<View style={{ cursor: "grab" }}>
		<GripVertical size={22} color={colors.text} />
	</View>
));

const SortableItem = sortableElement(({ data, selected, onPress, onEdit }) => (
	<View style={[style.card, { borderWidth: selected ? 1 : 0, opacity: selected ? 1 : 0.5 }]}>
		<DragHandle />
		<Text onPress={onPress} style={style.title}>{data.title}</Text>
		<Pressable onPress={onEdit} style={style.icon}>
			<Pencil size={20} color={colors.text} />
		</Pressable>
	</View>
));

const SortableList = sortableContainer(({ children }) => {
	return <View>{children}</View>;
});

const PageLayer = ({ data, currentPageId, onChange, onSelect }) => {
	const { formId } = useParams();
	const createPageRef = React.useRef();
	const [hasError, setHasError] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [pageList, setPageList] = React.useState([]);

	const loadData = async () => {
		try {
			setIsLoading(true);
			setHasError(false);
			setPageList([]);
			const response = await Backend.Page.List(formId);
			if (response?.success) {
				setPageList(response.data);
				if (!currentPageId && response.data.length) {
					onSelect(response.data[0].id);
				}
			} else {
				throw new Error(response?.message);
			}
		} catch (err) {
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCreate = (page) => {
		onSelect(page.id);
		loadData();
	}	

	React.useEffect(() => {
		loadData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderLoading = () => {
		return (
			<>
				<PageShimmer />
				<PageShimmer />
				<PageShimmer />
			</>
		);
	};

	const renderError = () => {
		return (
			<Text onPress={loadData} style={style.retry}>
				Try again
			</Text>
		);
	};

	const handleSortEnd = ({ oldIndex, newIndex }) => {
		setPageList((currentPages) => {
			const list = arrayMove(currentPages, oldIndex, newIndex);
			Backend.Page.Order(list.map((p) => parseInt(p.id)));
			return list;
		});
	};

	return (
		<>
			<View style={style.main}>
				<View style={style.header}>
					<Text style={style.headerText}>Pages</Text>
				</View>
				<Preloader
					renderLoading={renderLoading}
					renderError={renderError}
					isEmpty={!pageList.length}
					isLoading={isLoading}
					hasError={hasError}
				>
					<SortableList
						useDragHandle
						items={pageList}
						onSortEnd={handleSortEnd}
					>
						{pageList.map((page, index) => (
							<SortableItem
								onEdit={() => {
									createPageRef.current.init(page);
								}}
								onPress={() => {
									onSelect(page.id)	
								}}
								// eslint-disable-next-line eqeqeq
								selected={page.id == currentPageId}
								key={page.id}
								index={index}
								data={page}
							/>
						))}
					</SortableList>
				</Preloader>

				<LightButton
					style={style.button}
					bgColor={colors.cardGrey}
					textStyle={style.buttonText}
					onPress={() => {
						createPageRef.current.init();
					}}
					text="Add new page"
				/>
			</View>
			<CreatePage
				onCreate={handleCreate}
				formId={formId}
				ref={createPageRef}
			/>
		</>
	);
};

const style = StyleSheet.create({
	main: {
		width: 250,
		height: "100%",
		borderRightWidth: 1,
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
	button: {
		width: 230,
		height: 35,
		alignSelf: "center",
		borderRadius: 7,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	buttonText: {
		fontSize: sizes.button,
	},
	card: {
		height: 50,
		width: 230,
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
	title: {
		flex: 1,
		fontSize: sizes.subTitle,
		fontWeight: weights.semibold,
		color: colors.text,
		marginLeft: 5,
	},
	icon: {
		height: 50,
		width: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	retry: {
		fontSize: 18,
		color: colors.text,
		textAlign: "center",
		marginTop: 20,
	},
});

export default PageLayer;