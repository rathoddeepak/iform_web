/**
 * Helper Functions
*/
export const bindValidations = (initial, supported) => {
	const initialMap = {};
	initial.forEach((item) => {
		initialMap[item.id] = {
			value: item.value,
		};
	});
	const current = supported.map((item) => {
		if (initialMap[item.id]) {
			item.value = initialMap[item.id].value;
			item.isActive = true;
		} else if (item?.defaultValue !== undefined) {	
			item.value = item.defaultValue;
			item.isActive = true;
		}
		if (
			typeof item?.value === "string" &&
			item.value.length === 0
		) {
			item.isActive = false;
		}
		return item;
	});
	return current;
}

export const removeSpace = (str = "") => {
	return str?.replace(/\s/g, '') || ""
}