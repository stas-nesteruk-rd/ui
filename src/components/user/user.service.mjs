import fetch from 'node-fetch';
import { getCurrentUser } from '../user/user.store';


export const postData = async (url, req, data) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Cookie: req.headers.cookie
        }
    });
    const body = await res.json();
    return body;
};

export const sendPostData = async (url, { headers }) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: headers.cookie,
            Authorization: 'Bearer ' + getCurrentUser().token
        }
    });
    return res;
};

export const updateUserProfileInfo = async (url, { headers }, formData) => {
    const res = await fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
        headers: {
            Cookie: headers.cookie,
            Authorization: 'Bearer ' + getCurrentUser().token
        }
    });
    const body = await res.json();
    body.status = res.status;
    return body;
}

