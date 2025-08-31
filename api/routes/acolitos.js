import express from 'express';
import { getAcolitos, getAcolitosByIdade, getNameAcolitos } from '../controllers/acolitos.js';

const router = express.Router();

router.get('/', getAcolitos);
router.get('/names', getNameAcolitos);
router.get('/idades', getAcolitosByIdade);

export default router;
