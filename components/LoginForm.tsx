import { Text, TextInput, View } from "react-native";

const LoginForm = () => {
  return (
    <View>
      <Text>Username</Text>
      <TextInput placeholder="Username"></TextInput>
      <Text>Password</Text>
      <TextInput placeholder="Password" secureTextEntry></TextInput>
    </View>
  );
};

export default LoginForm;
