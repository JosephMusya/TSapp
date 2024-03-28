import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Switch,
} from "react-native";
import { Formik } from "formik";
import { CardParams } from "./Card";
import { Picker } from "@react-native-picker/picker";
const InputCard = ({
  setCards,
}: {
  setCards: React.Dispatch<React.SetStateAction<CardParams[] | null>>;
}) => {
  const [isPrimary, setIsPrimary] = useState<boolean>(false);

  const toggleState = (val: boolean) => {
    console.log(val);
    setIsPrimary(val);
  };

  const submitCard = (cardValues: CardParams) => {
    setCards((prev) => {
      return [cardValues, ...prev!];
    });
  };

  // interface FormErrors {
  //   error?: string;
  // }

  // const [errors, setErrors] = useState<FormErrors[] | null>();

  return (
    <Formik
      initialValues={
        {
          holdersName: "",
          bank: "Family Bank",
          accountNumber: "",
          issuer: "VISA",
        } as unknown as CardParams
      }
      onSubmit={(values, { resetForm }) => {
        submitCard(values);
        resetForm();
      }}
      validate={(values) => {
        const errors: Partial<CardParams> = {};
        if (values.accountNumber.toString().length < 12) {
          errors.holdersName = "Account number must be at least 11 characters";
        }
        return errors;
      }}
    >
      {(props) => (
        <View style={styles.container}>
          <Text numberOfLines={1}>Add a new card to your list</Text>
          <TextInput
            cursorColor="dodgerblue"
            placeholder="Card Holder's"
            style={styles.input}
            value={props.values.holdersName}
            onChangeText={props.handleChange("holdersName")}
          />
          <TextInput
            cursorColor="dodgerblue"
            placeholder="Card Number"
            style={styles.input}
            keyboardType="numeric"
            value={props.values.accountNumber.toString()}
            onChangeText={props.handleChange("accountNumber")}
          />
          {props.errors.holdersName && (
            <Text style={styles.error}>{props.errors.holdersName}</Text>
          )}

          <Picker
            selectedValue={props.values.bank}
            onValueChange={props.handleChange("bank")}
            dropdownIconColor="dodgerblue"
          >
            <Picker.Item label="Family Bank" value="Family Bank" />
            <Picker.Item label="Equity Bank" value="Equity Bank" />
            <Picker.Item label="KCB Bank" value="KCB Bank" />
            <Picker.Item label="Coperative Bank" value="Coperative Bank" />
            <Picker.Item label="NCBA Bank" value="NCBA Bank" />
          </Picker>

          <Picker
            selectedValue={props.values.issuer}
            onValueChange={props.handleChange("issuer")}
            dropdownIconColor="dodgerblue"
          >
            <Picker.Item label="VISA" value="VISA" />
            <Picker.Item label="M-CARD" value="M-CARD" />
          </Picker>
          <View style={[styles.centerAligned, { columnGap: 20 }]}>
            <Text>Set card as primary</Text>
            <Switch
              value={isPrimary}
              onValueChange={(state: boolean) => toggleState(state)}
              trackColor={{ true: "lightblue" }}
              thumbColor={`${isPrimary}` ? "dodgerblue" : "red"}
            />
          </View>
          <View style={[styles.button]}>
            <Button onPress={props.submitForm} title="Add Card" />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default InputCard;

export const styles = StyleSheet.create({
  centerAligned: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    display: "flex",
    rowGap: 10,
  },
  input: {
    borderColor: "dodgerblue",
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
  },
  button: {
    width: 150,
  },
  multiline: {
    minHeight: 100,
    maxHeight: 120,
  },

  error: {
    color: "red",
  },
});
