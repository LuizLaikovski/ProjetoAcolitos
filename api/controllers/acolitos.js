import e from 'express';
import { db } from '../db.js';

export const getAcolitos = (res) => {
    const query = 'SELECT * FROM dataAcolitos';

    db.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'ERRO NO BANCO DE DADOS' });
        };
        
        const result = data.map(item => {
            const idade = new Date().getFullYear() - new Date(item.dataNascimento).getFullYear();
            return { idAcolito: item.idAcolitos, nome: item.nome, dataNascimento: item.dataNascimento, telefone: item.telefone,
                tamTunica: item.tamTunica,
                comunidade: item.comunidade,
                missasDisponiveis: item.missasDisponiveis,
                comentario: item.comentario
            };
        });

        return res.status(200).json(result);
    });
};

export const getAcolitosByIdade = (res) =>{
    const query = 'SELECT nome, dataNascimento FROM dataAcolitos;'

    db.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'ERRO NO BANCO DE DADOS' });
        };

        const result = data.map(item => {
            const idade = new Date().getFullYear() - new Date(item.dataNascimento).getFullYear();
            return { nome: item.nome, idade };
        });

        return res.status(200).json(result);
    });
};

export const getNameAcolitos = (res) => {
    const query = 'SELECT nome FROM dataAcolitos';

    db.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'ERRO NO BANCO DE DADOS' });
        };

        return res.status(200).json(data);
    });
};

export const setAcolito = (req, res) => {
    const query = 'INSERT INTO dataAcolitos (nome, dataNascimento, telefone, tamTunica, comunidade, missasDisponiveis, comentario) VALUES (?)';
    const values = [
        req.body.nome,
        req.body.dataNascimento,
        req.body.telefone,
        req.body.tamTunica,
        req.body.comunidade,
        req.body.missasDisponiveis,
        req.body.comentario
    ];

    db.query(query, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'ERRO NO BANCO DE DADOS' });
        }

        return res.status(200).json("USUARIO ADICIONADO");
    });
};

export const updateAcolito = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    // lista de campos permitidos
    const allowedFields = ["telefone", "tamTunica", "comunidade", "missasDisponiveis", "comentario"];

    // pega só os campos que vieram no body e são válidos
    const fields = Object.keys(body).filter((key) => allowedFields.includes(key));

    if (fields.length === 0) {
    return res.status(400).json({ error: "Nenhum campo válido enviado para atualizar." });
    }

    // monta a query dinamicamente
    const setClause = fields.map((field) => `${field} = ?`).join(", ");
    const values = fields.map((field) => body[field]);

    const query = `UPDATE dataAcolitos SET ${setClause} WHERE idAcolitos = ?`;

        db.query(query, [...values, id], (err, result) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: "ERRO NO BANCO DE DADOS" });
    }

        return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    });
};

export const deleteAcolito = (req, res) => {
    const query = 'DELETE FROM dataAcolitos WHERE idAcolitos = ?';

    db.query(query, req.params.id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'ERRO NO BANCO DE DADOS' });
        }

        return res.status(200).json("USUARIO REMOVIDO");
    });
}