export const calIdade = (anoNascimento) => {
    return new Date().getFullYear() - new Date(anoNascimento).getFullYear();
}

export const parseJsonArray = (jsonString) => {
    try {
        return jsonString ? [...new Set(JSON.parse(jsonString))] : [];
    } catch {
        console.error("Erro ao parsear JSON:", jsonString);
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
/**
    * Retorna a data máxima (YYYY-MM-DD) para selecionar
    * pessoas com idade >= idadeMinima.
    * Exemplo: idadeMinima = 18 em 2025 → retorna "2007-12-31"
*/
export function calcularDataMaximaPorIdade(idadeMinima) {
    if (isNaN(idadeMinima)) {
        throw new Error("Idade mínima inválida");
    }

    const anoAtual = new Date().getFullYear();
    return `${anoAtual - idadeMinima}-12-31`;
}
