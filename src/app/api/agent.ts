import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5011/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep();
    /*
     * pagination doit etre ecrit de la meme maniere que dans le header reçu de l'api et
     * doit etre ecris en miniscule car axios ne reconnait que siil est en majuscule" 
    */
    const pagination = response.headers['pagination'];
    if(pagination) {
        response.data = new PaginatedResponse(
            response.data,
            JSON.parse(pagination)
        );
        return response;
    }
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if(data.errors) {
                const modelStateErrors: string[] = [];
                for(const key in data.errors) {
                    if(data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('Products/GetProducts', params),
    details: (id: number) => requests.get(`Products/GetProduct/${id}`),
    fetchFilters: () => requests.get('Products/GetFilters/filters')
}


const TestErrors = {
    get400Error: () => requests.get('Buggy/GetBadRequest/bad-request'),
    get401Error: () => requests.get('Buggy/GetUnauthorised/unauthorised'),
    get404Error: () => requests.get('Buggy/GetNotFound/not-found'),
    get500Error: () => requests.get('Buggy/GetServerError/server-error'),
    getValidationError: () => requests.get('Buggy/GetValidationError/validation-error'),
}

const Basket = {
    get: () => requests.get('Basket/GetBasket'),
    addItem: (productId: number, quantity = 1) => requests.post(`Basket/AddItemToBasket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`Basket/RemoveBasket?productId=${productId}&quantity=${quantity}`),
}

const Account = {
    login: (values: any) => requests.post('Account/Login/login', values),
    register: (values: any) => requests.post('Account/Register/register', values),
    currentUser: () => requests.get('Account/GetCurrentUser/currentUser'),
    fetchAddress: () => requests.get('Account/GetSavedAddress/savedAddress')
}

const Orders = {
    list: () => requests.get('Orders/GetOrders'),
    fetch: (id: number) => requests.get(`Orders/GetOrder/${id}`),
    create: (values: any) => requests.post('Orders/CreateOrder', values)
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account,
    Orders
}

export default agent;