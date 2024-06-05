import { perform } from "./request";

export const Init = (form_id, submission_id) => {
	return perform(
		"submission/init",
		{
			form_id: parseInt(form_id),
			submission_id: parseInt(submission_id),
		},
		true,
	);
};

export const List = (form_id) => {
	return perform(
		"submission/list",
		{
			form_id: parseInt(form_id),
		},
		true,
	);
};

export const Data = (page_id, submission_id) => {
	return perform(
		"submission/submission_data",
		{
			page_id: parseInt(page_id),
			submission_id: parseInt(submission_id),
			include_config: true,
		},
		true,
	);
};

export const SubmitAnswers = (form_id, submission_id, page_id, answers) => {
	return perform(
		"submission/submit_answers",
		{
			form_id: parseInt(form_id),
			page_id: parseInt(page_id),
			submission_id: parseInt(submission_id),
			answers,
		},
		true,
	);
};
