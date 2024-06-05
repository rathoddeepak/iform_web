import { useWindowDimensions } from "react-native";

const useIsMobile = () => {
	const { width, height } = useWindowDimensions();
	return [width < height, width, height];
}

export default useIsMobile;