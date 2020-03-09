import express from 'express';
const router = express.Router();
import multer from 'multer';

import {
    loginUserTreatment,
    signupUserTreatment,
    logoutUserTreatment,
    logoutAllUserTreatment,
    deleteUserTreatment,
    updateUserTreatment,
    getProfileTreatment,
    showLoginPageTreatment,
    showSignupPageTreatment
} from './user.controller';

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a jpg, jpeg or png'))
        }
        cb(undefined, true);
    }
});

router.get('/login', showLoginPageTreatment);
router.get('/signup', showSignupPageTreatment);

router.post('/login', loginUserTreatment);
router.post('/signup', signupUserTreatment);

router.get('/logout', logoutUserTreatment);
router.post('/logout-all', logoutAllUserTreatment);

router.get('/me', getProfileTreatment);
router.delete('/me', deleteUserTreatment);
router.patch('/me', upload.single('image'), updateUserTreatment, (error, req, res, next) =>{
    res.status(400).send({
        status: 400,
        error: error.message
    })
});

export { router as userRouter };

