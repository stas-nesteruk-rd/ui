import { getCategoryList } from '../category';
import fetch from 'node-fetch';
import { getCurrentUser } from '../user/user.store';
//const MAIN_DOMAIN = 'https://nesteruk-shop-application.herokuapp.com';
const MAIN_DOMAIN = process.env.MAIN_DOMAIN || 'http://localhost:4000';

const sendPostData = async (url, { headers }) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: headers.cookie,
            Authorization: 'Bearer ' + getCurrentUser().token
        }
    });
    const body = await res.json();
    return body;
};

const getData = async (url, { headers }) => {
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: headers.cookie,
            Authorization: 'Bearer ' + getCurrentUser().token
        }
    });
    const body = await res.json();
    return body;
};

const removeOrder = async (url, { headers }) => {
    const res = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Cookie: headers.cookie,
            Authorization: 'Bearer ' + getCurrentUser().token
        }
    });
    const body = await res.json();
    return body;
};

export async function makeOrderTreatment(req, res) {
    try {
        const user = getCurrentUser();
        if(!user){
            throw new Error('Please log in!')
        }
        const data = await sendPostData(MAIN_DOMAIN + req.originalUrl, req);
        const categories = await getCategoryList(req);
        if (!data.error) {
            return res.render('index', {
                partial: () => 'order',
                currentUser: getCurrentUser(),
                success: true,
                categories,
                products: data.products,
                totalCost: data.totalCost
            });
        }
        res.render('error', {
            error: data.error
        });
    } catch (error) {
        res.render('error', {
            error: error.message
        });
    }
}

export async function getOrderTreatment(req, res) {
    try {
        const categories = await getCategoryList(req);
        const data = await getData(MAIN_DOMAIN + req.originalUrl, req);
        res.render('index', {
            partial: () => 'order',
            categories,
            currentUser: getCurrentUser(),
            products: data[0].products,
            totalCost: data[0].totalCost
        });
    } catch (error) {
        res.render('error', {
            error: error.message
        });
    }
}

export async function getUserOrdersTreatment(req, res) {
    const categories = await getCategoryList(req);
    const orders = await getData(MAIN_DOMAIN + '/api/my-orders', req);
    let number = 1;
    orders.forEach(order => {
        order.number = number++;
    });
    res.render('index', {
        partial: () => 'userOrders',
        currentUser: getCurrentUser(),
        categories,
        orders
    });
}

export async function deleteOrderTreatment(req, res) {
    const id = req.params.id;
    try {
        const response = await removeOrder(MAIN_DOMAIN + req.originalUrl, req);
        if (!response.status === 200) {
            return res.status(400).send({
                error: response.error
            })
        }
        res.status(200).send({
            message: response.message,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}
