import React, { useState } from 'react';
import styles from 'styles/AccountPage.module.scss';
import userIcon from 'assets/user_icon.svg';
import { FusionAuthLogoutButton } from '@fusionauth/react-sdk';

function logout() {
    console.log("redirecting......");
    // window.location.href = 'https://fsmk-uat.fusionauth.io/oauth2/authorize?client_id=6516eddc-f3ee-49dd-ac8d-ff536dcf2ab9&response_type=code&scope=offline_access&redirect_uri=http%3A%2F%2Flocalhost%3A3000';
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('refresh_state');
    window.location.href = '/';

} 

async function doRefresh() {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    let headers = new Headers()
    headers.append("Content-Type", "application/json")
    const response = await fetch("https://fsmk-uat.fusionauth.io/api/jwt/refresh", {
        method: 'POST',
        body: JSON.stringify({
            "refreshToken": refreshToken,
            "token": token
          }),
          headers: headers
        })
        if (response.status !== 200) {
            console.log("failed to refresh token");
            console.log(response);
            throw new Error("failed to refresh token");
        }
        // .then((response) => {
        //     console.log(response);
        //     if (response.status === 200) {
        //         return response.json;
        //     }
        //     throw new Error("failed to refresh token");
        // })
        const jsonResponse = await response.json();
            console.log(jsonResponse);
            localStorage.setItem("access_token", jsonResponse.token);
            localStorage.setItem("refresh_state", "true");        
        // .then((jsonResponse: any) => {
        //     console.log(jsonResponse);
        //     localStorage.setItem("access_token", jsonResponse.token);
        //     localStorage.setItem("refresh_state", "true");
        // })
        // .catch(err => console.log(err))
        return
}

export const AccountPage = () => {

    const [user, setUser] = useState({email: "", firstName: "", rendered: false});

    const token = localStorage.getItem("access_token");

    if (token == null || token == "") {
        window.location.href = '/'
        return <div></div>
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
 
    if (!user.rendered) {
        fetch("https://fsmk-uat.fusionauth.io/oauth2/userinfo", {
            method: 'GET',
            headers: myHeaders,
            })
            .then((response) => {
                if (response.status === 401 && localStorage.getItem("refresh_state") == null) {
                    doRefresh();
                    window.location.reload();
                } else {
                    return response.json()
                }
            })
            .then((result) => {
                console.log(result);
                if (result.email != null) {
                    setUser({email: result.email, firstName: result.first_name, rendered: true})
                }
                return result;
            })
            .catch(error => console.log('error', error));
    }

    return (
        token ?
        <div>

            {/* The out-of-the-box Logout button. You may customize how logout is performed by */}
            {/* utilizing the `logout` method supplied by the FusionAuthContext */}
            <div>
                <button className={styles.logout} onClick={() => logout()}>Log out</button>
                <button className={styles.refresh} onClick={() => doRefresh()}>Refresh</button>
            </div>      

            <div className={styles.container}>
                <div className={styles.blueContainer} />

                <div className={styles.ovalContainer}>
                    <div>
                        <img src={userIcon} alt="User icon" className={styles.userIcon} />
                    </div>

                </div>

                <div className={styles.textContainer}>
                    <p className={styles.name}/>

                    <table>
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td>First Name</td>
                                <td>{user.firstName}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div> : <div></div>
    );
};
