import React from "react";
import { View, StyleSheet } from "react-native";
import InputBox from "./InputBox";

const OTPInput = ({ style = {}, length, onChange }) => {
  const inputs = React.useRef([]);
  const [otp, setOtp] = React.useState(Array(length).fill(""));

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    const newOTP = newOtp.join("");
    if (newOTP.length === length) {      
      onChange(newOTP);
    }

    // Move to the next input field if the user enters a value
    if (text && index < length - 1) {
      inputs[index + 1].focus();
    }
  };

  return (
    <View style={[styles.container, style]}>
      {otp.map((_, index) => (
        <InputBox
          key={index}
          ref={(ref) => (inputs[index] = ref)}
          inputProps={{
            value: otp[index],
            onChangeText: (text) => handleChangeText(text, index),
            maxLength: 1,
            keyboardType: "numeric",
            onKeyPress: ({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
                inputs[index - 1].focus();
              }
            },
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    margin: 5,
    width: 40,
    textAlign: "center",
    fontSize: 18,
  },
});

export default OTPInput;