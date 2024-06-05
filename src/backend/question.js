import { perform } from "./request";

export const List = (page_id) => {
	return perform(
		"question/list",
		{
			page_id: parseInt(page_id),
		},
		true,
	);
};

export const Create = (page_id) => {
	return perform(
		"question/create",
		{
			page_id: parseInt(page_id),
			title: "",
		},
		true,
	);
};

export const Delete = (id, page_id) => {
	return perform(
		"question/delete",
		{
			id: parseInt(id),
			page_id: parseInt(page_id)
		},
		true,
	);
};

export const Update = (data = {}) => {
	return perform("question/create", data, true);
};

export const Order = (question_ids) => {
	return perform(
		"question/order",
		{
			question_ids,
		},
		true,
	);
};