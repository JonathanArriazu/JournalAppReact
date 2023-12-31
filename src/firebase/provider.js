import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        /* const credentials = GoogleAuthProvider.credentialFromResult( result ); */
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({email, password, displayName}) => {
    try {
        //Para crear usuario en firebase utilizamos "createUserWithEmailAndPassword de Firebase"
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid} = resp.user
        console.log(resp)

        //ACTUALIZAR el usuario en firebase> usamos updateProfile() de firebase
        await updateProfile(FirebaseAuth.currentUser, {displayName});

        return {
            ok: true,
            uid, email, displayName // => email y displayName los estamos recibiendo como argumento
        }
    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message};
    }
}

export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => {
    //FirebaseAuth.signOut() cierra cualquier inicio de sesion
    //incluido google, facebook, etc...
    return await FirebaseAuth.signOut();
}