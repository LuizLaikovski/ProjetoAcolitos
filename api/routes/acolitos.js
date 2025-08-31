import express from 'express';
import { getAcolitos, getNameAcolitos, deleteAcolito, updateAcolito, setAcolito, getAcolitosByIdadeMinima, getAcolitosBySexo, getAcolitosByMissaDisponivel } from '../controllers/acolitos.js';

const router = express.Router();

router.get('/', getAcolitos);
router.get('/names', getNameAcolitos);
router.get('/idade/:idadeMinima', getAcolitosByIdadeMinima);    // idade/18
router.get('/:id', getAcolitos);
router.get('/sexo/:sexo', getAcolitosBySexo);
router.get('/acolitosDisponivelMissa/:idMissa', getAcolitosByMissaDisponivel);
router.delete('/delete/:id', deleteAcolito);
router.put('/update/:id', updateAcolito);
router.post('/newAcolito/', setAcolito);

export default router;
