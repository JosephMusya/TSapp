import { Pressable, StyleSheet, Text, View } from "react-native";

export interface CardParams {
  color?: "darkblue" | "dodgerblue" | "orange" | "plum" | any;
  textColor?: "white" | "black";
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

const textColor: { [key in CardParams["bank"]]: CardParams["textColor"] } = {
  "Family Bank": "white",
  "Coperative Bank": "black",
  "Equity Bank": "white",
  "KCB Bank": "black",
  "NCBA Bank": "black",
};

function getTextColor(
  bank: Partial<CardParams["bank"]>
): Partial<CardParams["textColor"]> {
  return textColor[bank];
}

// Define a mapping of banks to colors
const bankColors: { [key in CardParams["bank"]]: CardParams["color"] } = {
  "Family Bank": "darkblue",
  "Equity Bank": "dodgerblue",
  "KCB Bank": "orange",
  "Coperative Bank": "plum",
  "NCBA Bank": "plum", // Adjust this according to your color mapping
};

// Function to get the color based on the bank name
function getBankColor(
  bankName: Partial<CardParams["bank"]>
): CardParams["color"] | undefined {
  return bankColors[bankName];
}

const Card = ({
  holdersName,
  accountNumber,
  expiry = "11/25",
  issuer,
  bank,
}: CardParams) => {
  return (
    <Pressable style={[styles.card, { backgroundColor: getBankColor(bank) }]}>
      <View style={styles.cardTitle}>
        <Text style={{ color: getTextColor(bank) }}>Classic</Text>
        <View>
          <Text style={[styles.largeFont, { color: getTextColor(bank) }]}>
            {bank}
          </Text>
          <Text style={[styles.xsmall, { color: getTextColor(bank) }]}>
            With you for life
          </Text>
        </View>
      </View>
      <View style={styles.abs}>
        <View>
          <Text
            style={[
              styles.xsmall,
              { fontStyle: "normal", color: getTextColor(bank) },
            ]}
          >
            VALID THRU <Text style={{ fontSize: 14 }}>{expiry}</Text>
          </Text>
          <Text style={{ color: getTextColor(bank) }}>{holdersName}</Text>
          <Text style={{ color: getTextColor(bank) }}>{accountNumber}</Text>
        </View>
        <Text style={[styles.visa, { color: getTextColor(bank) }]}>
          {issuer}
        </Text>
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
