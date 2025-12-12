import express from "express";
import {
  getAcolitos,
  deleteAcolito,
  updateAcolito,
  setAcolito,
  getAcolitosByIdadeMinima,
  getAcolitosBySexo,
  getAcolitosByMissaDisponivel,
  getAcolitosCerimonialistas,
  getAcolito,
  getAcolitosSearch,
  usersAcess,
  verificarToken
} from "../controllers/acolitos.js";

const router = express.Router();

router.post("/login", usersAcess);

router.get("/", getAcolitos);
router.use(verificarToken);
router.get("/search", getAcolitosSearch);
router.get("/:id", getAcolito);
router.get("/idade/:idadeMinima", getAcolitosByIdadeMinima);
router.get("/sexo/:sexo", getAcolitosBySexo);
router.get("/acolitosDisponivelMissa/:idMissa", getAcolitosByMissaDisponivel);
router.get("/cerimonialistas", getAcolitosCerimonialistas);
router.delete("/delete/:id", deleteAcolito);
router.put("/update/:id", updateAcolito);
router.post("/newAcolito", setAcolito);

export default router;
