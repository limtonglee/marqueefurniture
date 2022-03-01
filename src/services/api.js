import axios from 'axios';

//get post delete methods 

const instance = axios.create({
    withCredentials:true,
    baseURL: '',
    timeout: 30000
  });

const request = (options) => instance.request(options);

export const get = (url,params, headers={}) => request({
    method: 'GET',
    url,
    params,
    headers
});

export const postAsJson = (url, data, headers = {}) => instance.request({
    method:'POST',
    url,
    data,
    headers,
    responseType: 'json'
})


export const postAsFormInput = (url, data, headers = {}) => instance.request({
    method:'POST',
    url,
    data,
    headers,
    responseType: 'json'
})