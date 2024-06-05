import Avatar from "./index.jsx";

const logoImage = require("../../assets/images/logo.png");

const Logo = (props) => {
	return <Avatar {...props} source={logoImage} />;
};

export default Logo;