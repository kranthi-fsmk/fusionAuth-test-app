import React, { FC, useEffect } from 'react';
import { FusionAuthLogoutButton, useFusionAuth, RequireAuth } from '@fusionauth/react-sdk';
import { json, useNavigate } from 'react-router-dom';
import { AccountPage } from './AccountPage';

export const AuthCode = () => {
    const navigate = useNavigate();

    // Pull user/authentication/loading state from FusionAuth context
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "6516eddc-f3ee-49dd-ac8d-ff536dcf2ab9");
    urlencoded.append("client_secret", "");
    urlencoded.append("code", authCode ? authCode : "");
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("redirect_uri", "http://localhost:3000/auth-code");


    const accessTokenRequest = new Request("https://fsmk-uat.fusionauth.io/oauth2/token", {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      });

    fetch(accessTokenRequest)
    .then((response) => {
        if (response.status === 200) {
        return response.json();
        } else {
            console.log(response, response.status, response.json);
        throw new Error("Something went wrong on API server!");
        }
    })
    .then((response) => {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        navigate("/account")
    })
    .catch((error) => {
        console.error(error);
    });

    return (
        <div></div>
    );
};
