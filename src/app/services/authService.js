// app/services/auth.js
import { AsyncStorage } from "react-native";

const TOKEN_STORAGE_LOCATION = "TOKEN";
const MAIL_STORAGE_LOCATION = "MAIL";

export async function onSignIn(token: string, mail: string) {
  try {
    await Promise.all([
      AsyncStorage.setItem(TOKEN_STORAGE_LOCATION, token),
      AsyncStorage.setItem(MAIL_STORAGE_LOCATION, mail)
    ]);
  } catch (error) {
    console.error(error);
  }
}

export async function onSignOut() {
  try {
    await Promise.all([
      AsyncStorage.removeItem(TOKEN_STORAGE_LOCATION),
      AsyncStorage.removeItem(MAIL_STORAGE_LOCATION)
    ]);
  } catch (error) {
    console.error(error);
  }
}

export async function getToken(): string {
  let token = null;

  try {
    token = await AsyncStorage.getItem(TOKEN_STORAGE_LOCATION);
  } catch (error) {
    console.error(error.message);
  }
  return token;
}

export async function getMail(): string {
  let mail = null;

  try {
    mail = await AsyncStorage.getItem(MAIL_STORAGE_LOCATION);
  } catch (error) {
    console.error(error.message);
  }
  return mail;
}