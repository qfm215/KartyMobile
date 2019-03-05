// app/services/alertService.js

import { Alert } from "react-native";

export function simpleAlert(title, text, closeButtonText) {
  Alert.alert(
    title,
    text,
    [
      { text: closeButtonText }
    ],
    { cancelable: false }
  );
};