import express from 'express';
const router = express.Router();
import {
    getProducersTreatment,
    createProducerTreatment,
    deleteProducerTreatment,
    updateProducerTreatment
} from './producer.controller';

router.get('/producer', getProducersTreatment);
router.post('/producer', createProducerTreatment);
router.delete('/producer/:id',deleteProducerTreatment);
router.patch('/producer/:id', updateProducerTreatment);

export { router as producerRouter };
