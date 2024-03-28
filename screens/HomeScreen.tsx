import {
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  View,
  StyleSheet,
  Button,
} from "react-native";
// import Heading from "../components/Heading";
import { StatusBar } from "expo-status-bar";
import InputCard from "../components/InputCard";
import Card, { CardParams } from "../components/Card";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import users from "../utils/cards";

export interface Separator {
  height: number;
}

export const separator = ({ height }: Separator) => (
  <View style={{ height: height, width: height }} />
);

const HomeScreen = ({ navigation }: any) => {
  const [cards, setCards] = useState<CardParams[] | null>([]);
  useEffect(() => {
    setCards(users);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 21 }}>
      <StatusBar backgroundColor="dodgerblue" />
      {/* <Heading setPosts={setPosts} /> */}
      <ScrollView style={styles.container}>
        <InputCard setCards={setCards} />
        <View>
          <Text style={styles.cardTitle}>Added Cards</Text>
        </View>
        <FlatList
          data={cards}
          renderItem={({ item }: { item: CardParams }) => {
            return (
              <Card
                accountNumber={item.accountNumber}
                bank={item.bank}
                expiry={item.expiry}
                holdersName={item.holdersName}
                issuer={item.issuer}
                color={item.color}
              />
            );
          }}
          ItemSeparatorComponent={() => separator({ height: 10 })}
          ListEmptyComponent={
            <View style={styles.cardPlaceholder}>
              <Feather name="alert-octagon" size={25} color="orange" />
              <Text>No Cards</Text>
            </View>
          }
          horizontal={true}
          snapToInterval={300}
          showsHorizontalScrollIndicator={false}
        />
        <View style={{ marginTop: 5 }}>
          <Button
            title="View Posts"
            onPress={() =>
              navigation.navigate("Posts", {
                name: "Josee",
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  container: {
    padding: 4,
    height: "auto",
  },
  cardTitle: {
    fontWeight: "500",
    marginTop: 20,
  },
  cardPlaceholder: {
    display: "flex",
    flexDirection: "row",
    columnGap: 4,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
});
