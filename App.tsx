import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import InputCard from "./components/InputCard";
import Card, { CardParams } from "./components/Card";
import users from "./utils/cards";
import Heading from "./components/Heading";
import PostCard from "./components/Post";
import { Post, fetchPosts } from "./utils/network";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

export default function App() {
  interface Separator {
    height: number;
  }

  const [posts, setPosts] = useState<Post[]>([]);

  const separator = ({ height }: Separator) => (
    <View style={{ height: height, width: height }} />
  );

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/posts?_limit=2";
    fetchPosts(url).then((posts: Post[]) => {
      setPosts(posts);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 21 }}>
      <StatusBar backgroundColor="dodgerblue" />
      <Heading setPosts={setPosts} />
      <ScrollView style={styles.container}>
        <InputCard />
        <View>
          <Text style={styles.cardTitle}>Added Cards</Text>
        </View>
        <FlatList
          data={users}
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
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Trending Post</Text>
          <FlatList
            data={posts}
            renderItem={({ item }: { item: Post }) => {
              return (
                <PostCard
                  body={item.body}
                  id={item.id}
                  title={item.title}
                  userId={item.userId}
                />
              );
            }}
            ItemSeparatorComponent={() => separator({ height: 10 })}
            ListEmptyComponent={
              <ActivityIndicator size="large" color="dodgerblue" />
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
