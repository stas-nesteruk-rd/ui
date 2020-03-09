// import fetch from 'node-fetch';
// let cookie = '';

// const MAIN_DOMAIN = 'http://localhost:4000';

// const getSession = async (url) => {
//     const res = await fetch(url);
//     return res;
// }

// function parseCookies(response) {
//     const raw = response.headers.raw()['set-cookie'];
//     return raw.map((entry) => {
//       const parts = entry.split(';');
//       const cookiePart = parts[0];
//       return cookiePart;
//     }).join(';');
// }

// export async function getCookie(){
//     if(cookie.length === 0){
//         const response = await getSession(MAIN_DOMAIN + '/session');
//         cookie = parseCookies(response);
//         console.log(response.headers);
//         console.log('GET COOKIE');
//         console.log(cookie);
//     }
//     return cookie;
// }

// app.use(async (req, res ,next) => {
//     if(cookie.length === 0){
//         const response = await getSession(MAIN_DOMAIN + '/session');
        
//         cookie = response.headers.get('set-cookie');
//         const cons = parseCookies(response);
//         //console.log(cons);
//         //console.log(response.headers);
//     }
//     console.log(req.headers.cookie);
//     console.log(req.cookies)
//     //console.log(cookie);
//     next();
// });