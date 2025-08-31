import express from 'express';
import { getAcolitos, getAcolitosByIdade, getNameAcolitos, deleteAcolito, updateAcolito, setAcolito } from '../controllers/acolitos.js';

const router = express.Router();

router.get('/', getAcolitos);
router.get('/names', getNameAcolitos);
router.get('/idades', getAcolitosByIdade);
router.delete('/delete/:id', deleteAcolito);
router.put('/update/:id', updateAcolito);
router.post('/newAcolito/', setAcolito);

export default router;
