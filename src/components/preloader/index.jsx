import React from "react";

const emptyFunc = () => null;

const Preloader = ({
	children,
	isEmpty = false,
	hasError = false,
	isLoading = false,
	renderLoading = emptyFunc,
	renderError = emptyFunc,
	renderEmpty = emptyFunc,
}) => {
	if (isLoading) {
		return renderLoading();
	}

	if (hasError) {
		return renderError();
	}

	if (isEmpty) {
		return renderEmpty();
	}

	return children;
};

export default React.memo(Preloader);