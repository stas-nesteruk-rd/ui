import express from 'express';
import multer from 'multer';
import { 
    getProductsTreatment, 
    getProductsByCategoryTreatment, 
    getProductTreatment, 
    searchProductsTreatment,
    deleteProductByIdTreatment,
    createProductTreatment,
    updateProductTreatment,
} from './product.controller';

const router = express.Router();

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

router.get('/products', getProductsTreatment);
router.get('/products/search', searchProductsTreatment);
router.get('/products/:id', getProductTreatment);
router.get('/products/category/:category', getProductsByCategoryTreatment);
router.delete('/products/:id', deleteProductByIdTreatment);
router.post('/products/', upload.single('image'), createProductTreatment);
router.patch('/products/:id', upload.single('image'), updateProductTreatment);

export { router as productRouter };
