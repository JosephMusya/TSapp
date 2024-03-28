import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PostsScreen from "./screens/PostsScreen";
import Heading from "./components/Heading";
import { SafeAreaView, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProfileScreen() {
  return (
    <SafeAreaView>
      <Text>Profile Section</Text>
    </SafeAreaView>
  );
}
function NotificationScreen() {
  return (
    <SafeAreaView>
      <Text>Notification Section</Text>
    </SafeAreaView>
  );
}
function SettingsScreen() {
  return (
    <SafeAreaView>
      <Text>Setting Section</Text>
    </SafeAreaView>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Cards Section"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Cards Section" component={HomeScreen} />
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
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTintColor: "#fff",
          // tabbaricon
          tabBarShowLabel: true,
          tabBarActiveTintColor: "dodgerblue",
          tabBarInactiveTintColor: "gray",
          headerStyle: {
            backgroundColor: "dodgerblue",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={StackNavigator}
          options={{
            title: "My Cards",
            tabBarIcon: ({ color }) => (
              <AntDesign name="creditcard" size={24} color={color} />
            ),
            headerRight: () => <Heading />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="settings" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Octicons name="bell" size={24} color={color} />
            ),
            tabBarBadge: 3,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
