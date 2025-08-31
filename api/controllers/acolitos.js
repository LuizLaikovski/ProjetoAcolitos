import { db } from '../db.js';

export const getAcolitos = (req, res) => {
    const query = 'SELECT * FROM dataAcolitos';

    db.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'ERRO NO BANCO DE DADOS' });
        };
        
        return res.status(200).json(data);
    });
};

export const getAcolitosByIdade = (req, res) =>{
    const query = 'SELECT dataNascimento FROM dataAcolitos;'

    db.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'ERRO NO BANCO DE DADOS' });
        };

        return res.status(200).json(data);
    });
};

export const getNameAcolitos = (req, res) => {
    const query = 'SELECT nome FROM dataAcolitos';

    db.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'ERRO NO BANCO DE DADOS' });
        };

        return res.status(200).json(data);
    });
};