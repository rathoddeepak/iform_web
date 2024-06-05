import { perform } from "./request";

const memCache = {};
export const GetDefaultTypes = async () => {
	const key = 'GetDefaultTypes';
	if (memCache[key]) {
		return memCache[key];
	}
	const resp = await perform("question_types/get_default_types", {});
	if (resp?.success) {
		memCache[key] = resp;
	}
	return resp;
};

export const List = () => {
	return perform("form/list", {}, true);
};

export const Create = (formId, title, timeout) => {
	return perform("form/create", {
		id: formId,
		title,
		timeout
	}, true);
};

export const GetById = (formId) => {
	return perform("form/id", {
		id: parseInt(formId),
	}, true);
};