import { getData } from "../product/product.service";
import { getCurrentUser } from '../user/user.store'
const MAIN_DOMAIN = process.env.MAIN_DOMAIN || 'http://localhost:4000';

export async function getDashBoardTreatment(req, res){
    const products = await getData(MAIN_DOMAIN + '/api/products', req);
    let i = 1;
    products.forEach(product => {
        product.number = i++;
    });
    res.render('dashboard', {
        currentUser: getCurrentUser(),
        products
    });
}