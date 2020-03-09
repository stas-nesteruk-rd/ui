import fetch from 'node-fetch';
//const MAIN_DOMAIN = 'https://nesteruk-shop-application.herokuapp.com';
const MAIN_DOMAIN = process.env.MAIN_DOMAIN || 'http://localhost:4000';
const url = '/api/category';


let categories = [];

const getCategories = async (url, req) => {
    const res = await fetch(url,  {
        credentials: 'include',
            headers: { 
                'Content-Type': 'application/json',
                'Cookie': req.headers.cookie
            }
    });
    const body = await res.json();
    return body;
};



export async function getCategoryList(req){
    if(categories.length === 0){
        const body = await getCategories(MAIN_DOMAIN + url, req);
        categories = body;
    }
    return categories;
};

export function refreshCategories(){
    //TODO while categoryList will be change
}
