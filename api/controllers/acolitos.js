import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  calcularDataMaximaPorIdade,
  insertComunidades,
  insertMissas,
  updateRelacionamentos
} from "../dto/acolitosDTO.js";
import { BASE_QUERY, GROUP_ORDER } from "../querys/querys.js";
import dotenv from 'dotenv';

dotenv.config();

// ========================================================
// CONFIG
// ========================================================
const SECRET = process.env.SECRET_KEY; // use variável de ambiente em produção

// ========================================================
// FUNÇÕES GENÉRICAS DE CONSULTA
// ========================================================
export const runQuery = (res, query, params = []) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Erro ao obter conexão:", err);
      return res.status(500).json({
        error: "ERRO DE CONEXÃO COM O BANCO",
        message: "Não foi possível conectar ao banco de dados"
      });
    }

    console.log("Executando query:", query);
    console.log("🔑 Parâmetros:", params);

    connection.query(query, params, (err, data) => {
      connection.release();

      if (err) {
        console.error("❌ Erro na query:", err);
        return res.status(500).json({
          error: "ERRO NO BANCO DE DADOS",
          message: err.sqlMessage || "Erro ao executar consulta"
        });
      }

      console.log("✅ Query executada com sucesso. Linhas:", data.length);
      return res.status(200).json(data);
    });
  });
};

// ========================================================
// LOGIN (AUTENTICAÇÃO JWT)
// ========================================================
export const usersAcess = async (req, res) => {
  try {
    const { user, password } = req.body;
    console.log("🔐 Tentativa de login:", { user });

    const sql = `SELECT user, password FROM adms WHERE user = ?`;
    db.query(sql, [user], async (err, data) => {
      if (err) {
        console.error("❌ Erro no banco:", err);
        return res.status(500).json({ error: "Erro no banco", message: err.sqlMessage });
      }

      if (data.length === 0) {
        console.log("❌ Usuário não encontrado");
        return res.status(401).json({ msg: "Usuário não encontrado" });
      }

      const usuario = data[0];
      const senhaCorreta =
        password === usuario.password ||
        (await bcrypt.compare(password, usuario.password));

      if (!senhaCorreta) {
        console.log("❌ Senha incorreta");
        return res.status(401).json({ msg: "Senha incorreta" });
      }
      
      const token = jwt.sign({ user: usuario.user }, SECRET, { expiresIn: "1d" });

      console.log("✅ Login autorizado, token gerado para:", user);
      return res.status(200).json({ access: true, token });
    });
  } catch (error) {
    console.error("💥 Erro no processo de login:", error);
    return res.status(500).json({
      access: false,
      error: "Erro interno do servidor",
      message: error.message
    });
  }
};

// ========================================================
// MIDDLEWARE DE VERIFICAÇÃO DE TOKEN
// ========================================================
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "Token ausente" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Token inválido" });
    req.user = user;
    next();
  });
};

// ========================================================
// CONSULTAS DE ACÓLITOS
// ========================================================
export const getAcolitosSearch = (req, res) => {
  const { idade, sexo, missas, comunidades, cerimonialista } = req.query;

  let sqlComand = "SELECT * FROM viewAcolitos WHERE 1=1";
  const params = [];

  if (idade) {
    const dataMax = calcularDataMaximaPorIdade(idade);
    sqlComand += " AND dataNascimento < ?";
    params.push(dataMax);
  }

  if (sexo) {
    sqlComand += " AND sexo = ?";
    params.push(sexo);
  }

  if (missas) {
    sqlComand += " AND missas = ?";
    params.push(missas);
  }

  if (comunidades) {
    sqlComand += " AND comunidades = ?";
    params.push(comunidades);
  }

  if (cerimonialista) {
    sqlComand += " AND cerimonialista = 1";
  }

  sqlComand += ";";
  console.log("📄 Query final:", sqlComand);
  runQuery(res, sqlComand, params);
};

export const getAcolitos = (_, res) => {
    runQuery(res, `SELECT * FROM viewAcolitos;`);
};

export const getAcolito = (req, res) => {
    runQuery(res, `${BASE_QUERY} WHERE a.idAcolitos = ? ${GROUP_ORDER}`, [req.params.id]);
};

export const getAcolitosByIdadeMinima = (req, res) => {
  try {
    const idadeMinima = parseInt(req.params.idadeMinima, 10);
    const dataMaxima = calcularDataMaximaPorIdade(idadeMinima);

    const query = `${BASE_QUERY} WHERE a.dataNascimento <= ? ${GROUP_ORDER}`;
    runQuery(res, query, [dataMaxima]);
  } catch (err) {
    console.error("Erro ao obter acolitos por idade mínima:", err);
    return res.status(500).json({ error: "ERRO AO OBTER ACOLITOS", details: err });
  }
};

export const getAcolitosBySexo = (req, res) => {
  runQuery(res, `${BASE_QUERY} WHERE a.sexo = ? ${GROUP_ORDER}`, [req.params.sexo]);
};

export const getAcolitosByMissaDisponivel = (req, res) => {
  runQuery(
    res,
    `${BASE_QUERY} WHERE EXISTS (
      SELECT 1 
      FROM acolitos_missas am2
      WHERE am2.idAcolito = a.idAcolitos 
      AND am2.idMissa = ? ) ${GROUP_ORDER}`,
    [req.params.idMissa]
  );
};

export const getAcolitosCerimonialistas = (_, res) => {
  runQuery(res, `${BASE_QUERY} WHERE a.cerimonialista = 1 ${GROUP_ORDER}`);
};

// ========================================================
// INSERIR UM NOVO ACÓLITO
// ========================================================
export const setAcolito = (req, res) => {
  const {
    nome,
    sexo,
    dataNascimento,
    telefone,
    tamTunica,
    cerimonialista,
    comentario,
    comunidades,
    missas
  } = req.body;

  const query = `
    INSERT INTO dataAcolitos (nome, sexo, dataNascimento, telefone, tamTunica, comentario, cerimonialista)
    VALUES (?)
  `;
  const values = [nome, sexo, dataNascimento, telefone, tamTunica, comentario, cerimonialista];

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error("Erro ao inserir acólito:", err);
      return res
        .status(500)
        .json({ error: err.sqlMessage || "ERRO NO BANCO DE DADOS" });
    }

    insertComunidades(result.insertId, comunidades);
    insertMissas(result.insertId, missas);

    return res
      .status(201)
      .json({ message: "Acólito criado com sucesso", id: result.insertId });
  });
};

// ========================================================
// ATUALIZAR UM ACÓLITO
// ========================================================
export const updateAcolito = (req, res) => {
  const { id } = req.params;
  const { telefone, tamTunica, cerimonialista, comentario, comunidades, missas } = req.body;

  const fields = [];
  const values = [];

  if (telefone) {
    fields.push("telefone = ?");
    values.push(telefone);
  }
  if (tamTunica) {
    fields.push("tamTunica = ?");
    values.push(tamTunica);
  }
  if (comentario) {
    fields.push("comentario = ?");
    values.push(comentario);
  }
  if (cerimonialista !== undefined) {
    fields.push("cerimonialista = ?");
    values.push(cerimonialista);
  }

  if (fields.length > 0) {
    const query = `UPDATE dataAcolitos SET ${fields.join(", ")} WHERE idAcolitos = ?`;
    db.query(query, [...values, id]);
  }

  updateRelacionamentos(id, comunidades, missas);
  return res.status(200).json({ message: "Acólito atualizado com sucesso!" });
};

// ========================================================
// EXCLUIR UM ACÓLITO
// ========================================================
export const deleteAcolito = (req, res) => {
  const { id } = req.params;

  console.log("Recebendo DELETE de acolito:", id);
  db.query("DELETE FROM acolitos_comunidades WHERE idAcolito = ?", [id]);
  db.query("DELETE FROM acolitos_missas WHERE idAcolito = ?", [id]);

  db.query("DELETE FROM dataAcolitos WHERE idAcolitos = ?", [id], (err) => {
    if (err)
      return res.status(500).json({ error: "ERRO NO BANCO DE DADOS" });

    return res.status(200).json({ message: "Acólito removido com sucesso!" });
  });
};