import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { styles } from "./InputCard";
import { Formik } from "formik";
import { Post } from "../utils/network";

const Heading = ({
  setPosts,
}: {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}) => {
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
  return (
    <View style={headStyle.container}>
      <View style={headStyle.profile}>
        <Image
          style={headStyle.image}
          source={{
            uri: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=7lrLYx-B",
          }}
        />
        <Text>Joseph Musya</Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
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
    </View>
  );
};

export default Heading;

const headStyle = StyleSheet.create({
  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 10,
    padding: 4,
    backgroundColor: "dodgerblue",
  },
  image: {
    width: 50,
    aspectRatio: 1,
    objectFit: "cover",
    borderRadius: 50,
  },
  multiLine: {
    minHeight: 120,
    maxHeight: 130,
  },
});
