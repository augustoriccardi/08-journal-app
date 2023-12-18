import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

// Se crea un proveedor
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Metodo para crear la atenticacion con google
export const signInWithGoogle = async () => {
  try {
    // Se crea la autenticacion que aparezca un popup cuando se inicie sesion
    // primer parametro el metodo de autenticacion y el segundo el proveedor de autenticacion
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,

      //User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Manejar errores aquí. Hay más, chequear documentación
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,

      errorCode,
      errorMessage,
    };
  }
};

export const resgisterUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    // console.log(resp);
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const logoutFireBase = async () => {
  return await FirebaseAuth.signOut();
};
