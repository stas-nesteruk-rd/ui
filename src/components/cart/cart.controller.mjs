import HTTP_STATUS from 'http-status';
import { getCategoryList } from '../category';
import { getData } from '../product/product.service';
import fetch from 'node-fetch';
import { getCurrentUser } from '../user/user.store.mjs';
//const MAIN_DOMAIN = 'https://nesteruk-shop-application.herokuapp.com';
const MAIN_DOMAIN = process.env.MAIN_DOMAIN || 'http://localhost:4000';

export async function getCartTreatment(req, res) {
    try {
        const { products = [], totalCost = 0} = await getData(MAIN_DOMAIN + req.originalUrl, req);
        const categories = await getCategoryList(req);
        res.render('index', {
            partial: () => 'cart',
            categories,
            currentUser: getCurrentUser(),
            products: products,
            totalCost: totalCost,
        });
    } catch (error) {
        console.log(error);
    }
}

export async function addProductToCartTreatment(req, res) {
    try {
        fetch(MAIN_DOMAIN + req.originalUrl, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                id: req.body.id,
                count: req.body.count
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                res.setHeader('Cookie', response.headers.get('set-cookie'))
                return response.json()}
            )
            .then(body => console.log(body));
        res.status(HTTP_STATUS.OK).send();
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function deleteProductFromCartTreatment(req, res) {}

