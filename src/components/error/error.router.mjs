import express from 'express';
const router = express.Router();
import {errorTreatment} from './error.controller'
router.get('/error', errorTreatment);

export { router as errorRouter }
