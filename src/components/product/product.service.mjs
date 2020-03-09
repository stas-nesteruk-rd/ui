import fetch from 'node-fetch';

export const getData = async (url, req) => {
    const res = await fetch(url, {
        credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
                'Cookie': req.headers.cookie
            }
    });
    const body = await res.json();
    return body;
};

export const getDataCookie = async (url) => {
    const res = await fetch(url, {
        credentials: 'include'
    });
    const body = await res.json();
    return body;
};
