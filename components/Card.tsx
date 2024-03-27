import { Pressable, StyleSheet, Text, View } from "react-native";

export interface CardParams {
  color?: "blue" | "dodgerblue" | "orange" | "plum" | any;
  holdersName: string;
  accountNumber: number;
  expiry: string;
  issuer: "VISA" | "M-CARD";
  bank:
    | "Family Bank"
    | "Equity Bank"
    | "KCB Bank"
    | "Coperative Bank"
    | "NCBA Bank";
}

const Card = ({
  color = "orange",
  holdersName,
  accountNumber,
  expiry = "11/25",
  issuer,
  bank,
}: CardParams) => {
  return (
    <Pressable style={[styles.card, { backgroundColor: color }]}>
      <View style={styles.cardTitle}>
        <Text>Classic</Text>
        <View>
          <Text style={styles.largeFont}>{bank}</Text>
          <Text style={styles.xsmall}>With you for life</Text>
        </View>
      </View>
      <View style={styles.abs}>
        <View>
          <Text style={[styles.xsmall, { fontStyle: "normal" }]}>
            VALID THRU <Text style={{ fontSize: 14 }}>{expiry}</Text>
          </Text>
          <Text>{holdersName}</Text>
          <Text>{accountNumber}</Text>
        </View>
        <Text style={styles.visa}>{issuer}</Text>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  largeFont: {
    fontWeight: "bold",
    fontSize: 16,
  },
  xsmall: {
    fontSize: 8,
    fontStyle: "italic",
  },
  cardTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: 300,
    height: 185,
    borderRadius: 4,
    padding: 10,
    paddingTop: 20,
  },
  abs: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  visa: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 20,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
