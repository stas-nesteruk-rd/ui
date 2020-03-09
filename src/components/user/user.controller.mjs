import HTTP_STATUS from 'http-status';
import FormData from 'form-data';
import { postData, sendPostData, updateUserProfileInfo } from './user.service';
import { setCurrentUser, getCurrentUser } from './user.store';

const MAIN_DOMAIN = process.env.MAIN_DOMAIN || 'http://localhost:4000';

export async function showSignupPageTreatment(req, res) {
    res.render('signup');
}

export async function showLoginPageTreatment(req, res) {
    res.render('login');
}

export async function loginUserTreatment(req, res) {
    try {
        const data = await postData(
            MAIN_DOMAIN + req.originalUrl,
            req,
            req.body
        );
        if (data.error) {
            return res.render('error', {
                error: data.error
            });
        }
        setCurrentUser(data);
        res.redirect('/api/products');
    } catch (error) {
        return res.render('error', {
            error: error.message
        });
    }
}

export async function signupUserTreatment(req, res) {
    try {
        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.render('error', {
                error: "Password isn't match!"
            });
        }
        const response = await postData(
            MAIN_DOMAIN + req.originalUrl,
            req,
            req.body
        );
        if (response.error) {
            return res.render('error', {
                error: response.error
            });
        }
        setCurrentUser(response);
        res.redirect('/api/products');
    } catch (error) {
        res.render('error', {
            error: error.message
        });
    }
}

export async function logoutUserTreatment(req, res) {
    try {
        const response = await sendPostData(MAIN_DOMAIN + req.originalUrl, req);
        if (response.status === 200) {
            setCurrentUser(undefined);
            return res.redirect('/api/products');
        }
        res.render('error', {
            error: response.error
        });
    } catch (error) {
        res.render('error', {
            error: error.message
        });
    }
}

export async function logoutAllUserTreatment(req, res) {}

export function getProfileTreatment(req, res) {
    try {
        const user = getCurrentUser();
        if (user === undefined) {
            return res.redirect('/api/login');
        }
        const {
            name,
            email,
            phone = undefined,
            address = undefined,
            firstName = undefined,
            lastName = undefined,
            image
        } = user.user;
        res.render('userProfile', {
            currentUser: user,
            name: name,
            email,
            phone,
            address,
            firstName,
            lastName,
            image: MAIN_DOMAIN + image
        });
    } catch (error) {
        res.render('error', {
            error: error.message
        });
    }
}

export async function deleteUserTreatment(req, res) {}

export async function updateUserTreatment(req, res) {
    try {
        const data = req.body;
        let formData = new FormData();
        const keys = Object.keys(data);
        keys.forEach(key => {
            console.log(key + ' ' + data[key])
            formData.append(key, data[key]);
        });
        if (req.file) {
            formData.append('image', req.file.buffer, {
                fieldname: 'image',
                filename: req.file.originalname,
                contentType: 'image/jpeg',
            });
        }

        const body = await updateUserProfileInfo(MAIN_DOMAIN + req.originalUrl, req, formData);
        body.image = MAIN_DOMAIN + body.image;
        setCurrentUser(body);
        delete body.token;
        res.status(HTTP_STATUS.OK).send({
            status: body.status,
            user: body
        });
    } catch (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).send({
            status: HTTP_STATUS.BAD_REQUEST,
            error: error.message
        });
    }
}
