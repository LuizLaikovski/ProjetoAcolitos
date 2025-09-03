export const BASE_QUERY = `
    SELECT 
        a.idAcolitos,
        a.nome,
        a.sexo,
        a.dataNascimento,
        a.telefone,
        JSON_ARRAYAGG(c.nome) AS comunidades,
        JSON_ARRAYAGG(m.nome) AS missas,
        a.tamTunica,
        a.cerimonialista,
        a.comentario
    FROM dataAcolitos a
    LEFT JOIN acolitos_comunidades ac ON a.idAcolitos = ac.idAcolito
    LEFT JOIN comunidades c ON ac.idComunidade = c.idComunidade
    LEFT JOIN acolitos_missas am ON a.idAcolitos = am.idAcolito
    LEFT JOIN missas m ON am.idMissa = m.idMissa
`;

export const GROUP_ORDER = `
    GROUP BY a.idAcolitos, a.nome, a.sexo, a.dataNascimento, 
            a.telefone, a.tamTunica, a.cerimonialista, a.comentario
    ORDER BY a.idAcolitos;
`;
