import HttpService from './HttpService';
export const RegisterUserService = (credentials) => {
    const http = new HttpService();
    let signupUrl = "scopic/register";
    return http.postData(credentials, signupUrl).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;
    })
}
export const LoginUserService = (credentials) => {
    const http = new HttpService();
    let loginUrl = "scopic/login";
    return http.postData(credentials, loginUrl).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;
    })
}
export const LogOutUserService = () => {
    const http = new HttpService();
    let loginUrl = "scopic/logout";
    const tokenId = "user-token";
    return http.getData(loginUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;
    })
}