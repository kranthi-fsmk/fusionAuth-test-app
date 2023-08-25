import React from 'react';
import styles from 'styles/LoginPage.module.scss';

export const LoginPage = () => {

    const isAuthenticated = localStorage.getItem('access_token');

    const login = function () {
        console.log("redirecting......");
    window.location.href = 'https://fsmk-uat.fusionauth.io/oauth2/authorize?client_id=6516eddc-f3ee-49dd-ac8d-ff536dcf2ab9&response_type=code&scope=offline_access&redirect_uri=http%3A%2F%2Flocalhost%3A3000/auth-code';
    }  
    
    if (isAuthenticated) {
        window.location.href = "/account";
    }


    return (


        <div className={styles.container}>
            <h1 className={styles.welcome}>
                Welcome
            </h1>


            {/* The out-of-the-box Login button. You may customize how logout is performed by */}
            {/* utilizing the `login` method supplied by the FusionAuthContext */}
            <div>
            <button className={styles.button} onClick={() => login()}>Log in</button>
            </div>
        </div>

    );   
};
