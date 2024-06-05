import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getSessionId } from "../../local/";

const PrivateRoute = ({ component: Component }) => {
	const location = useLocation();
	const currentSessionId = getSessionId();
	if (currentSessionId) {
		return <Component sessionId={currentSessionId} />;
	} else {
		return <Navigate to="/auth" state={{ from: location }} />;
	}
};

export default PrivateRoute;