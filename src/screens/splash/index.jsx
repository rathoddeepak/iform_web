import React from "react";
import { View } from "react-native";
import { useNavigate } from "react-router-dom";
// Functions
import { getSessionId } from "../../local";

const Splash = () => {
	const navigate = useNavigate();

	const init = () => {
		const sessionId = getSessionId();
		if (sessionId) {
			navigate("/home");
		} else {
			navigate("/auth");
		}
	};

	React.useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <View />;
};

export default Splash;