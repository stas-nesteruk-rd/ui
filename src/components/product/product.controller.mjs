import HTTP_STATUS from 'http-status';
import { getCategoryList } from '../category';
import { getData } from './product.service';
import { getCurrentUser } from '../user/user.store';

//const MAIN_DOMAIN = 'https://nesteruk-shop-application.herokuapp.com';
const MAIN_DOMAIN = process.env.MAIN_DOMAIN || 'http://localhost:4000';

export async function getProductsTreatment(req, res) {
    try {
        const products = await getData(MAIN_DOMAIN + req.originalUrl, req);
        const categories = await getCategoryList(req);
        res.render('index', {
            partial: () => 'products',
            currentUser: getCurrentUser(),
            products,
            categories, 
            currentCategory: req.originalUrl
        });
    } catch (error) {
        res.render('error',{
            error: error.message
        });
    }
}

export async function getProductsByCategoryTreatment(req, res) {
    try {
        const parts = req.originalUrl.split('/');
        const currentCategory = '/'+parts[parts.length-1];
        const products = await getData(MAIN_DOMAIN + req.originalUrl, req);
        const categories = await getCategoryList(req);
        res.render('index', {
            partial: () => 'products',
            currentUser: getCurrentUser(),
            products,
            categories, 
            currentCategory
        });
    } catch (error) {
        res.render('error',{
            error: error.message
        });
    }
}

export async function getProductTreatment(req, res) {
    try {
        const product = await getData(MAIN_DOMAIN + req.originalUrl, req);
        const categories = await getCategoryList(req);
        res.render('index', {
            partial: () => 'productInfo',
            currentUser: getCurrentUser(),
            product,
            categories
        });
    } catch (error) {
        res.render('error',{
            error: error.message
        });
    }
}

export async function searchProductsTreatment(req, res) {
    try {
        const searchQuery = req.query.value;
        const products = await getData(MAIN_DOMAIN + req.originalUrl, req);
        const categories = await getCategoryList(req);
        res.render('index', {
            partial: () => 'products',
            currentUser: getCurrentUser(),
            products,
            categories,
            searchQuery
        });
    } catch (error) {
        res.render('error',{
            error: error.message
        });
    }
}

export async function deleteProductByIdTreatment(req, res) {}


async function saveImage(file, category) {}

export async function createProductTreatment(req, res) {}

export async function updateProductTreatment(req, res) {}
