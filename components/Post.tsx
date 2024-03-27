import { StyleSheet, Text, View } from "react-native";
import { Post } from "../utils/network";

const PostCard = ({ body, id, title }: Post) => {
  return (
    <View style={styles.container} key={id}>
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={4}>{body}</Text>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 4,
  },

  title: {
    fontWeight: "600",
  },
});
