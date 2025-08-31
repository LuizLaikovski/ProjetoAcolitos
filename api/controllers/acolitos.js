import { db } from "../db.js";

// ========================================================
// LISTAR TODOS OS ACÓLITOS COM COMUNIDADES E MISSAS
// ========================================================
export const getAcolitos = (req, res) => {
    const query = `
        SELECT 
            a.idAcolitos,
            a.nome,
            a.sexo,
            a.dataNascimento,
            a.telefone,
            JSON_ARRAYAGG(c.nome) AS comunidades,
            JSON_ARRAYAGG(m.nome) AS missas,
            a.tamTunica,
            a.comentario
        FROM dataAcolitos a
        LEFT JOIN acolitos_comunidades ac ON a.idAcolitos = ac.idAcolito
        LEFT JOIN comunidades c ON ac.idComunidade = c.idComunidade
        LEFT JOIN acolitos_missas am ON a.idAcolitos = am.idAcolito
        LEFT JOIN missas m ON am.idMissa = m.idMissa
        GROUP BY a.idAcolitos, a.nome, a.sexo, a.dataNascimento, a.telefone, a.tamTunica, a.comentario
        ORDER BY a.idAcolitos;
    `;

    db.query(query, (err, data) => {
        if (err) return res.status(500).json({ error: "ERRO NO BANCO DE DADOS" });

        const result = data.map(item => {
            const idade = new Date().getFullYear() - new Date(item.dataNascimento).getFullYear();

            let comunidades = [];
            let missas = [];

            try {
                comunidades = item.comunidades ? JSON.parse(item.comunidades) : [];
                missas = item.missas ? JSON.parse(item.missas) : [];
            } catch (parseErr) {
                console.error("Erro ao parsear JSON:", parseErr);
            }

            return {
                idAcolito: item.idAcolitos,
                nome: item.nome,
                sexo: item.sexo,
                idade,
                telefone: item.telefone,
                tamTunica: item.tamTunica,
                comunidades: [...new Set(comunidades)],
                missas: [...new Set(missas)],
                comentario: item.comentario
            };
        });

        return res.status(200).json(result);
    });
};

// ========================================================
// LISTAR IDADE ACIMA DA INFORMADA NA URL
// ========================================================
export const getAcolitosByIdadeMinima = (req, res) => {
    const idadeMinima = parseInt(req.params.idadeMinima);

    if (isNaN(idadeMinima)) {
        return res.status(400).json({ error: "Parâmetro de idade inválido" });
    }

    // Calcula data de nascimento máxima permitida
    const anoAtual = new Date().getFullYear();
    const dataMaxima = `${anoAtual - idadeMinima}-12-31`; // Quem nasceu antes dessa data tem idade >= idadeMinima

    const query = `
        SELECT 
            a.idAcolitos,
            a.nome,
            a.sexo,
            a.dataNascimento,
            a.telefone,
            JSON_ARRAYAGG(c.nome) AS comunidades,
            JSON_ARRAYAGG(m.nome) AS missas,
            a.tamTunica,
            a.comentario
        FROM dataAcolitos a
        LEFT JOIN acolitos_comunidades ac ON a.idAcolitos = ac.idAcolito
        LEFT JOIN comunidades c ON ac.idComunidade = c.idComunidade
        LEFT JOIN acolitos_missas am ON a.idAcolitos = am.idAcolito
        LEFT JOIN missas m ON am.idMissa = m.idMissa
        WHERE a.dataNascimento <= ?
        GROUP BY a.idAcolitos, a.nome, a.sexo, a.dataNascimento, a.telefone, a.tamTunica, a.comentario
        ORDER BY a.idAcolitos;
    `;

    db.query(query, [dataMaxima], (err, data) => {
        if (err) return res.status(500).json({ error: "ERRO NO BANCO DE DADOS" });

        const result = data.map(item => {
            const idade = anoAtual - new Date(item.dataNascimento).getFullYear();

            let comunidades = [];
            let missas = [];

            try {
                comunidades = item.comunidades ? JSON.parse(item.comunidades) : [];
                missas = item.missas ? JSON.parse(item.missas) : [];
            } catch (parseErr) {
                console.error("Erro ao parsear JSON:", parseErr);
            }

            return {
                idAcolito: item.idAcolitos,
                nome: item.nome,
                sexo: item.sexo,
                idade,
                telefone: item.telefone,
                tamTunica: item.tamTunica,
                comunidades: [...new Set(comunidades)],
                missas: [...new Set(missas)],
                comentario: item.comentario
            };
        });

        return res.status(200).json(result);
    });
};

// ========================================================
// LISTAR SOMENTE ACOLITOS COM O SEXO INFORMADO
// ========================================================
export const getAcolitosBySexo = (req, res) => {
    const { sexo } = req.params;

    const query = `
        SELECT 
            a.idAcolitos,
            a.nome,
            a.sexo,
            a.dataNascimento,
            a.telefone,
            JSON_ARRAYAGG(c.nome) AS comunidades,
            JSON_ARRAYAGG(m.nome) AS missas,
            a.tamTunica,
            a.comentario
        FROM dataAcolitos a
        LEFT JOIN acolitos_comunidades ac ON a.idAcolitos = ac.idAcolito
        LEFT JOIN comunidades c ON ac.idComunidade = c.idComunidade
        LEFT JOIN acolitos_missas am ON a.idAcolitos = am.idAcolito
        LEFT JOIN missas m ON am.idMissa = m.idMissa
        WHERE a.sexo = ?
        GROUP BY a.idAcolitos, a.nome, a.sexo, a.dataNascimento, a.telefone, a.tamTunica, a.comentario
        ORDER BY a.idAcolitos;
    `;

    db.query(query, [sexo], (err, data) => {
        if (err) return res.status(500).json({ error: "ERRO NO BANCO DE DADOS" });

        const result = data.map(item => {
            const idade = new Date().getFullYear() - new Date(item.dataNascimento).getFullYear();

            let comunidades = [];
            let missas = [];

            try {
                comunidades = item.comunidades ? JSON.parse(item.comunidades) : [];
                missas = item.missas ? JSON.parse(item.missas) : [];
            } catch (parseErr) {
                console.error("Erro ao parsear JSON:", parseErr);
            }

            return {
                idAcolito: item.idAcolitos,
                nome: item.nome,
                sexo: item.sexo,
                idade,
                telefone: item.telefone,
                tamTunica: item.tamTunica,
                comunidades: [...new Set(comunidades)],
                missas: [...new Set(missas)],
                comentario: item.comentario
            };
        });

        return res.status(200).json(result);
    });
};

// ========================================================
// LISTAR SOMENTE ACOLITOS DISPONIVEIS NA MISSA INFORMADA NA URL
// ========================================================

export const getAcolitosByMissaDisponivel = (req, res) => {
    const { idMissa } = req.params;

    const query = `
        SELECT 
            a.idAcolitos,
            a.nome,
            a.sexo,
            a.dataNascimento,
            a.telefone,
            JSON_ARRAYAGG(c.nome) AS comunidades,
            JSON_ARRAYAGG(m.nome) AS missas,
            a.tamTunica,
            a.comentario
        FROM dataAcolitos a
        LEFT JOIN acolitos_comunidades ac ON a.idAcolitos = ac.idAcolito
        LEFT JOIN comunidades c ON ac.idComunidade = c.idComunidade
        LEFT JOIN acolitos_missas am ON a.idAcolitos = am.idAcolito
        LEFT JOIN missas m ON am.idMissa = m.idMissa
        WHERE m.idMissa = ?
        GROUP BY a.idAcolitos, a.nome, a.sexo, a.dataNascimento, a.telefone, a.tamTunica, a.comentario
        ORDER BY a.idAcolitos;
    `;

    db.query(query, [idMissa], (err, data) => {
        if (err) return res.status(500).json({ error: "ERRO NO BANCO DE DADOS" });

        const result = data.map(item => {
            const idade = new Date().getFullYear() - new Date(item.dataNascimento).getFullYear();

            let comunidades = [];
            let missas = [];

            try {
                comunidades = item.comunidades ? JSON.parse(item.comunidades) : [];
                missas = item.missas ? JSON.parse(item.missas) : [];
            } catch (parseErr) {
                console.error("Erro ao parsear JSON:", parseErr);
            }

            return {
                idAcolito: item.idAcolitos,
                nome: item.nome,
                sexo: item.sexo,
                idade,
                telefone: item.telefone,
                tamTunica: item.tamTunica,
                comunidades: [...new Set(comunidades)],
                missas: [...new Set(missas)],
                comentario: item.comentario
            };
        });

        return res.status(200).json(result);
    });
};

// ========================================================
// LISTAR SOMENTE NOMES
// ========================================================
export const getNameAcolitos = (req, res) => {
    const query = "SELECT nome FROM dataAcolitos;";

    db.query(query, (err, data) => {
        if (err) return res.status(500).json({ error: "ERRO NO BANCO DE DADOS" });

        return res.status(200).json(data.map(item => item.nome));
    });
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
//   "comentario": "COORDENADOR"
// }
export const setAcolito = (req, res) => {
    const { nome, sexo, dataNascimento, telefone, tamTunica, comentario, comunidades, missas } = req.body;

    const query = "INSERT INTO dataAcolitos (nome, sexo, dataNascimento, telefone, tamTunica, comentario) VALUES (?)";
    const values = [nome, sexo, dataNascimento, telefone, tamTunica, comentario];

    db.query(query, [values], (err, result) => {
        if (err) return res.status(500).json({ error: "ERRO AO INSERIR ACÓLITO" });

        const idAcolito = result.insertId;

        // Inserir comunidades
        if (Array.isArray(comunidades) && comunidades.length > 0) {
            const valuesComunidades = comunidades.map(c => [idAcolito, c]);
            db.query("INSERT INTO acolitos_comunidades (idAcolito, idComunidade) VALUES ?", [valuesComunidades]);
        }

        // Inserir missas
        if (Array.isArray(missas) && missas.length > 0) {
            const valuesMissas = missas.map(m => [idAcolito, m]);
            db.query("INSERT INTO acolitos_missas (idAcolito, idMissa) VALUES ?", [valuesMissas]);
        }

        return res.status(201).json({ message: "Acólito criado com sucesso", id: idAcolito });
    });
};

// ========================================================
// UPDATE (ATUALIZA CAMPOS E RELACIONAMENTOS SE VIEREM NO BODY; NOME, SEXO E DATA DE NASCIMENTO NÃO PODEM SER ALTERADOS)
// ========================================================
// {
//   "telefone": "47988729248",
//   "tamTunica": "G",                      P, M, G, 42
//   "comunidades": [1],                    ID DE ACORDO COM A TABELA DO BANCO DE DADOS
//   "missas": [1, 2, 3, 4],                IDS DE ACORDO COM A TABELA DO BANCO DE DADOS
//   "comentario": "COORDENADOR"
// }

export const updateAcolito = (req, res) => {
    const { id } = req.params;
    const { telefone, tamTunica, comentario, comunidades, missas } = req.body;

    // atualiza só os campos simples
    const fields = [];
    const values = [];

    if (telefone) { fields.push("telefone = ?"); values.push(telefone); }
    if (tamTunica) { fields.push("tamTunica = ?"); values.push(tamTunica); }
    if (comentario) { fields.push("comentario = ?"); values.push(comentario); }

    if (fields.length > 0) {
        const query = `UPDATE dataAcolitos SET ${fields.join(", ")} WHERE idAcolitos = ?`;
        db.query(query, [...values, id]);
    }

    // atualiza comunidades (se vier array)
    if (Array.isArray(comunidades)) {
        db.query("DELETE FROM acolitos_comunidades WHERE idAcolito = ?", [id], () => {
            if (comunidades.length > 0) {
                const valuesComunidades = comunidades.map(c => [id, c]);
                db.query("INSERT INTO acolitos_comunidades (idAcolito, idComunidade) VALUES ?", [valuesComunidades]);
            }
        });
    }

    // atualiza missas (se vier array)
    if (Array.isArray(missas)) {
        db.query("DELETE FROM acolitos_missas WHERE idAcolito = ?", [id], () => {
            if (missas.length > 0) {
                const valuesMissas = missas.map(m => [id, m]);
                db.query("INSERT INTO acolitos_missas (idAcolito, idMissa) VALUES ?", [valuesMissas]);
            }
        });
    }

    return res.status(200).json({ message: "Acólito atualizado com sucesso!" });
};

// ========================================================
// DELETE
// ========================================================
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
