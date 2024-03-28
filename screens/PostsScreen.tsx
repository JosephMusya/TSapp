import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { fetchPosts, Post } from "../utils/network";
import PostCard from "../components/Post";
import { separator } from "./HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { styles } from "../components/InputCard";

const PostsScreen = ({}: any) => {
  //   const from: { name: string } = route.params;
  const [posts, setPosts] = useState<Post[]>([]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  //   const url: string = "https://jsonplaceholder.typicode.com/posts";

  const submitPost = (post: Post) => {
    console.log("Submitting post...");
    // const re = await makePost(url, post.title, post.body);
    // console.log(re);
    setPosts((prev) => {
      return [post, ...prev];
    });
    setModalVisible(false);
  };

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/posts?_limit=10";
    fetchPosts(url).then((posts: Post[]) => {
      setPosts(posts);
    });
  }, []);

  return (
    <SafeAreaView style={headStyle.container}>
      <View style={headStyle.posts}>
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
          ListHeaderComponent={
            <Text style={{ fontSize: 18, fontWeight: "600", paddingBottom: 5 }}>
              Trending Post
            </Text>
          }
          ListEmptyComponent={
            <ActivityIndicator size="large" color="dodgerblue" />
          }
        />
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View>
          <Text>Add New Post</Text>
        </View>
        <Formik
          initialValues={{
            title: "",
            body: "",
          }}
          onSubmit={(values: Post) => {
            submitPost(values);
          }}
        >
          {(props) => (
            <View style={{ padding: 4, display: "flex", rowGap: 4 }}>
              <TextInput
                cursorColor="dodgerblue"
                placeholder="Title"
                style={styles.input}
                value={props.values.title}
                onChangeText={props.handleChange("title")}
              />
              <TextInput
                cursorColor="dodgerblue"
                placeholder="Body"
                style={[styles.input, headStyle.multiLine]}
                value={props.values.body}
                onChangeText={props.handleChange("body")}
                textAlignVertical="top"
                multiline
              />
              <Button title="Submit" onPress={props.submitForm} />
            </View>
          )}
        </Formik>
      </Modal>
      <TouchableOpacity
        style={headStyle.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PostsScreen;

const headStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  multiLine: {
    minHeight: 120,
    maxHeight: 130,
  },
  floatingButton: {
    position: "absolute",
    backgroundColor: "dodgerblue",
    borderRadius: 50,
    bottom: 20,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  posts: {
    padding: 4,
  },
});
