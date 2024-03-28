import { View, Image, StyleSheet } from "react-native";

const Heading = () => {
  return (
    <View style={headStyle.container}>
      <View style={headStyle.profile}>
        <Image
          style={headStyle.image}
          source={{
            uri: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=7lrLYx-B",
          }}
        />
      </View>
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
    width: 43.5,
    aspectRatio: 1,
    objectFit: "cover",
    borderRadius: 50,
  },
  multiLine: {
    minHeight: 120,
    maxHeight: 130,
  },
});
