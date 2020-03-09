import express from 'express';
import {
    getCategoriesTreatment,
    deleteCategoryTreatment,
    updateCategoryTreatment,
    createCategoryTreatment
} from './category.controller';


const router = express.Router();

router.get('/category', getCategoriesTreatment);
router.post('/category', createCategoryTreatment);
router.delete('/category/:id', deleteCategoryTreatment);
router.patch('/category/:id', updateCategoryTreatment);

export { router as categoryRouter };
