import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/provider';
import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout({errorMessage: result.errorMessage})); //Importante colocar el return para que no siga ejecutandose

        //Pero si todo sale bien, hago dispatch al login:
        dispatch( login(result) );
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch (checkingCredentials());

        const result = await registerUserWithEmailPassword({email, password, displayName});
        if (!result.ok) return dispatch(logout( {errorMessage: result.errorMessage})); //Importante colocar el return para que no siga ejecutandose

        //Pero si todo sale bien, hago dispatch al login:   
        dispatch( login(result) );
    }

}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password });

        if ( !result.ok ) return dispatch( logout( result ) );
        dispatch( login( result ));

    }
}

export const startlogout = () => {
    return async( dispatch ) => {

        await logoutFirebase();

        dispatch (logout());
    }
}