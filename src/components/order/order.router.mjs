import express from 'express';
import {
    makeOrderTreatment,
    getOrderTreatment,
    getUserOrdersTreatment,
    deleteOrderTreatment
} from './order.controller';

const router = express.Router();

router.post('/order', makeOrderTreatment);
router.get('/order/:id', getOrderTreatment);
router.delete('/order/:id', deleteOrderTreatment);
router.get('/my-orders', getUserOrdersTreatment);

export { router as orderRouter };
