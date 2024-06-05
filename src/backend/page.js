import { perform } from "./request";

export const List = (form_id) => {
	return perform(
		"page/list",
		{
			form_id: parseInt(form_id),
		},
		true,
	);
};

export const Create = (id, form_id, title) => {
	return perform(
		"page/create",
		{
			form_id: parseInt(form_id),
			id: id ? parseInt(id) : undefined,
			title,
		},
		true,
	);
};

export const Delete = (id, form_id) => {
	return perform(
		"page/delete",
		{
			id: parseInt(id),
			form_id: parseInt(form_id)
		},
		true,
	);
};

export const Order = (page_ids) => {
	return perform(
		"page/order",
		{
			page_ids,
		},
		true,
	);
};