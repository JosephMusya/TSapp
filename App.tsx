import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PostsScreen from "./screens/PostsScreen";
import Heading from "./components/Heading";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

// interface Params {
//   name: string
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "dodgerblue",
          },
          contentStyle: {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "My Cards",
            headerRight: () => <Heading />,
          }}
        />
        <Stack.Screen
          name="Posts"
          component={PostsScreen}
          options={({ route }: any) => ({
            headerRight: () => (
              <Text style={{ color: "#fff" }}>{route.params.name}</Text>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
