/**
 * Validation functions
 */

export const isValidPhoneNumber = (phoneNumber = "") => {
	// eslint-disable-next-line no-useless-escape
	const phoneRegExp = /^\+\d{1,3}\s?\(?\d{3,}\)?[-\s\.]?\d{3,}$/;
	return phoneRegExp.test(phoneNumber) || false;
};

export const isValidEmail = (email = "") => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email) || false;
};

/**
 * Input: String
 * must greater then 2 and can contain Alphabets, number and _, -
 */
export const isValidTitle = (str = "") => {
	const titleRegExp = /^[A-Za-z0-9_-]{3,}$/;
	return titleRegExp?.test(str) || false;
};