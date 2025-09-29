import { db } from "../db.js";


export const calIdade = (anoNascimento) => {
    return new Date().getFullYear() - new Date(anoNascimento).getFullYear();
}

export const parseJsonArray = (value) => {
    try {
        if (!value) return [];

        // Se já for array (caso vindo de algum outro parser)
        if (Array.isArray(value)) return [...new Set(value)];

        // Tenta parsear como JSON
        if (typeof value === "string" && value.trim().startsWith("[")) {
            return [...new Set(JSON.parse(value))];
        }

        // Se for string comum com vírgula → divide
        if (typeof value === "string") {
            return [...new Set(value.split(",").map(v => v.trim()))];
        }

        // Caso não caia em nenhum
        return [];
    } catch (e) {
        console.error("Erro ao parsear valor:", value, e);
        return [];
    }
};


export const mapAcolito = (item) => {
    return {
        id: item.idAcolitos,
        nome: item.nome,
        sexo: item.sexo,
        dataNascimento: item.dataNascimento,
        idade: calIdade(item.dataNascimento),
        telefone: item.telefone,
        comunidades: parseJsonArray(item.comunidades),
        missas: parseJsonArray(item.missas),
        tamTunica: item.tamTunica,
        cerimonialista: item.cerimonialista,
        comentario: item.comentario,
        idade: calIdade(item.dataNascimento)
    };
}
export function calcularDataMaximaPorIdade(idadeMinima) {
    if (isNaN(idadeMinima)) {
        throw new Error("Idade mínima inválida");
    }

    const anoAtual = new Date().getFullYear();
    return `${anoAtual - idadeMinima}-12-31`;
}

export function insertComunidades(idAcolito, comunidades) {
    if (Array.isArray(comunidades) && comunidades.length > 0) {
        const values = comunidades.map(c => [idAcolito, c]);
        db.query("INSERT INTO acolitos_comunidades (idAcolito, idComunidade) VALUES ?", [values]);
    }
}

export function insertMissas(idAcolito, missas) {
    if (Array.isArray(missas) && missas.length > 0) {
        const values = missas.map(m => [idAcolito, m]);
        db.query("INSERT INTO acolitos_missas (idAcolito, idMissa) VALUES ?", [values]);
    }
}

export function updateRelacionamentos(idAcolito, comunidades, missas) {
    if (Array.isArray(comunidades)) {
        db.query("DELETE FROM acolitos_comunidades WHERE idAcolito = ?", [idAcolito], () => {
            insertComunidades(idAcolito, comunidades);
        });
    }

    if (Array.isArray(missas)) {
        db.query("DELETE FROM acolitos_missas WHERE idAcolito = ?", [idAcolito], () => {
            insertMissas(idAcolito, missas);
        });
    }
}