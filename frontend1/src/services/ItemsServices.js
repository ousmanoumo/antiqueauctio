import HttpService from './HttpService';
export const LoadItems = (page = 1, strItem = "") => {
    const http = new HttpService();
    let itemUrl = "scopic/items?page=" + page + "&name=" + strItem;
    const tokenId = "user-token";
    return http.getData(itemUrl, tokenId).then(data => {
        console.log(data);
        return data;
    }).catch((error) => {
        console.log(error);
        return error;
    });
}
export const LoadBidItems = (page = 1, strItem = "") => {
    const http = new HttpService();
    let itemUrl = "scopic/bidItems?page=" + page + "&name=" + strItem;
    const tokenId = "user-token";
    return http.getData(itemUrl, tokenId).then(data => {
        console.log(data);
        return data;
    }).catch((error) => {
        console.log(error);
        return error;
    });
}


export const LoadSingleItem = (id) => {
    const http = new HttpService();
    let itemUrl = "scopic/item?id=" + id;
    const tokenId = "user-token";
    return http.getData(itemUrl, tokenId).then(data => {
        console.log(data);
        return data;
    }).catch((error) => {
        console.log(error);
        return error;
    });
}
export const HighestBidService = async (id) => {
    const http = new HttpService();
    let itemUrl = "scopic/bidhighest?id=" + id;
    const tokenId = "user-token";
    try {
        const data = await http.getData(itemUrl, tokenId);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}



export const BidNowService = async (id, amount) => {
    const http = new HttpService();
    const tokenId = "user-token";
    let itemUrl = "scopic/bidnow";
    let params = { 'id': id, 'amount': amount};

    try {
        const data = await http.postData(params, itemUrl, tokenId);
        console.log('Bid now service'+data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
