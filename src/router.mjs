import express from 'express';
import { 
    productRouter, 
    cartRouter, 
    orderRouter, 
    userRouter, 
    categoryRouter,
    producerRouter,
    errorRouter,
    dashboardRouter
} from './components';

const router = express.Router();

router.use('/api', productRouter);
router.use('/api', cartRouter);
router.use('/api', orderRouter);
router.use('/api', userRouter);
router.use('/api', categoryRouter);
router.use('/api', producerRouter);
router.use('/api', errorRouter);
router.use('/api', dashboardRouter);

export { router as apiRouter };
