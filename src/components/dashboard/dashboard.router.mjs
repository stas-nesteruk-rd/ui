import express from 'express'
import {
    getDashBoardTreatment
} from './dashboard.controller'

const router = express.Router();

router.get('/dashboard', getDashBoardTreatment)

export {router as dashboardRouter}