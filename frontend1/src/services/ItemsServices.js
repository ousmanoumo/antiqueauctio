import HttpService from './HttpService';
export const LoadItems = (page = 1, strItem = "") => {
    const http = new HttpService();
    let profileUrl = "scopic/items?page=" + page + "&name=" + strItem;
    const tokenId = "user-token";
    return http.getData(profileUrl, tokenId).then(data => {
        console.log(data);
        return data;
    }).catch((error) => {
        console.log(error);
        return error;
    });
}


export const LoadSingleItem = (id) => {
    const http = new HttpService();
    let profileUrl = "scopic/item?id=" + id;
    const tokenId = "user-token";
    return http.getData(profileUrl, tokenId).then(data => {
        console.log(data);
        return data;
    }).catch((error) => {
        console.log(error);
        return error;
    });
}