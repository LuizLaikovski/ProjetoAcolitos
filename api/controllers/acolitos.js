import { db } from "../db.js";
import { calcularDataMaximaPorIdade, insertComunidades, insertMissas, updateRelacionamentos } from "../dto/acolitosDTO.js";
import { BASE_QUERY, GROUP_ORDER } from "../querys/querys.js";

// Função runQuery com pool
export const runQuery = (res, query, params = []) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Erro ao obter conexão:", err);
            return res.status(500).json({ 
                error: "ERRO DE CONEXÃO COM O BANCO", 
                message: "Não foi possível conectar ao banco de dados" 
            });
        }
        console.log('Executando query:', query);
        console.log('🔑 Parâmetros:', params);

        connection.query(query, params, (err, data) => {
            // ⚠️ SEMPRE libere a conexão!
            connection.release();

            if (err) {
                console.error("❌ Erro na query:", err);
                return res.status(500).json({ 
                    error: "ERRO NO BANCO DE DADOS", 
                    message: err.sqlMessage || "Erro ao executar consulta" 
                });
            }
            console.log('Query executada com sucesso. Linhas:', data.length);
            return res.status(200).json(data);
        });
    });
};

// Função runAuthQuery corrigida
export const runAuthQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) {
                console.error("❌ Erro ao obter conexão:", err);
                reject(err);
                return;
            }

            console.log('📊 Executando query:', query);
            console.log('🔑 Parâmetros:', params);

            connection.query(query, params, (error, data) => {
                // ⚠️ SEMPRE libere a conexão!
                connection.release();
                
                if (error) {
                    console.error("❌ Erro na query:", error);
                    reject(error);
                    return;
                }
                
                console.log('✅ Query executada. Linhas:', data.length);
                resolve(data.length > 0);
            });
        });
    });
};

// Rota de login
export const usersAcess = async (req, res) => {
    try {
        const { user, password } = req.body;
        
        console.log('🔐 Tentativa de login:', { user });

        const userExists = await runAuthQuery(
            `SELECT user, password FROM adms WHERE user = ? AND password = ?`, 
            [user, password]
        );

        console.log('📊 Usuário autorizado?:', userExists);

        if (userExists) {
            console.log('✅ Login autorizado para:', user);
            return res.status(200).json({ access: true });
        } else {
            console.log('❌ Login negado para:', user);
            return res.status(200).json({ access: false });
        }
    } catch (error) {
        console.error('💥 Erro no processo de login:', error);
        return res.status(500).json({ 
            access: false, 
            error: 'Erro interno do servidor',
            message: error.message 
        });
    }
};


export const getAcolitosSearch = (req, res) => {
    const {idade, sexo, missas, comunidades, cerimonialista} = req.query;

    let sqlComand = 'select * from viewAcolitos where 1=1';
    let params = [];

    if (idade) {
        const dataMax = calcularDataMaximaPorIdade(idade);
        sqlComand += ' AND dataNascimento < ?';
        params.push(dataMax);
    }

    if (sexo) {
        sqlComand += ' AND sexo = ?';
        params.push(sexo);
    }

    if (missas) {
        sqlComand += ' AND missas = ?';
        params.push(missas);
    }

    if (comunidades) {
        sqlComand += ' AND comunidades = ?';
        params.push(comunidades);
    }

    if (cerimonialista) {
        sqlComand += ' AND cerimonialista = 1'
    }

    console.log(sqlComand);
    sqlComand += ';'
    let debugQuery = sqlComand;
    params.forEach(p => {
        debugQuery = debugQuery.replace("?", `'${p}'`);
    });
    console.log("Query final:", debugQuery);
    runQuery(res,sqlComand, params)
}

export const getAcolitos = (_, res) => {
    runQuery(res, `select * from viewAcolitos;`);
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
    runQuery(res, `${BASE_QUERY} WHERE EXISTS (
        SELECT 1 
        FROM acolitos_missas am2
        WHERE am2.idAcolito = a.idAcolitos 
        AND am2.idMissa = ? ) ${GROUP_ORDER}`, [req.params.idMissa]);
};

export const getAcolitosCerimonialistas = (_, res) => {
    runQuery(res, `${BASE_QUERY} WHERE a.cerimonialista = 1 ${GROUP_ORDER}`);
};


// ========================================================
// INSERIR UM NOVO ACÓLITO
// ========================================================
// {
//   "nome": "Luiz TESTE",
//   "sexo": "MAS",                         MAS ou FEM
//   "dataNascimento": "2008-01-16",        YYYY-MM-DD
//   "telefone": "47988729248",
//   "tamTunica": "G",                      P, M, G, 42
//   "comunidades": [1],                    ID DE ACORDO COM A TABELA DO BANCO DE DADOS
//   "missas": [1, 2, 3, 4],                IDS DE ACORDO COM A TABELA DO BANCO DE DADOS
//   "cerimonislista": 1                   1 = true   0 = false
//   "comentario": "COORDENADOR"
// }
export const setAcolito = (req, res) => {
    const { nome, sexo, dataNascimento, telefone, tamTunica, cerimonialista, comentario, comunidades, missas } = req.body;

    const query = `
        INSERT INTO dataAcolitos (nome, sexo, dataNascimento, telefone, tamTunica, comentario, cerimonialista) 
        VALUES (?)
    `;
    const values = [nome, sexo, dataNascimento, telefone, tamTunica, comentario, cerimonialista];

    db.query(query, [values], (err, result) => {
        if (err) {
            console.error("Erro ao inserir acólito:", err);
            return res.status(500).json({ error: err.sqlMessage || "ERRO NO BANCO DE DADOS" });
        }

        insertComunidades(result.insertId, comunidades);
        insertMissas(result.insertId, missas);

        return res.status(201).json({ message: "Acólito criado com sucesso", id: result.insertId });
    });
};


// ========================================================
// UPDATE (ATUALIZA CAMPOS E RELACIONAMENTOS SE VIEREM NO BODY;
// NOME, SEXO E DATA DE NASCIMENTO NÃO PODEM SER ALTERADOS) 
// ========================================================
// { 
//   "telefone": "47988729248", 
//   "tamTunica": "G",                   P, M, G, 42
//   "comunidades": [1],                 ID DE ACORDO COM A TABELA DO BANCO DE DADOS
//   "missas": [1, 2, 3, 4],             IDS DE ACORDO COM A TABELA DO BANCO DE DADOS
//   "cerimonialista": 1                 1 = true 0 = false
//   "comentario": "COORDENADOR"
// }
export const updateAcolito = (req, res) => {
    const { id } = req.params;
    const { telefone, tamTunica, cerimonialista, comentario, comunidades, missas } = req.body;

    // atualiza só os campos simples
    const fields = [];
    const values = [];

    if (telefone) { fields.push("telefone = ?"); values.push(telefone); }
    if (tamTunica) { fields.push("tamTunica = ?"); values.push(tamTunica); }
    if (comentario) { fields.push("comentario = ?"); values.push(comentario); }
    if (cerimonialista !== undefined) { fields.push("cerimonialista = ?"); values.push(cerimonialista); }

    if (fields.length > 0) {
        const query = `UPDATE dataAcolitos SET ${fields.join(", ")} WHERE idAcolitos = ?`;
        db.query(query, [...values, id]);
    }

    updateRelacionamentos(id, comunidades, missas);

    return res.status(200).json({ message: "Acólito atualizado com sucesso!" });
};

export const deleteAcolito = (req, res) => {
    const { id } = req.params;

    // remove relacionamentos antes
    db.query("DELETE FROM acolitos_comunidades WHERE idAcolito = ?", [id]);
    db.query("DELETE FROM acolitos_missas WHERE idAcolito = ?", [id]);

    // remove o acólito
    db.query("DELETE FROM dataAcolitos WHERE idAcolitos = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: "ERRO NO BANCO DE DADOS" });

        return res.status(200).json({ message: "Acólito removido com sucesso!" });
    });
};
