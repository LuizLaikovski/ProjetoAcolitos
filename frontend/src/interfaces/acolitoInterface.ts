export interface AcolitoProp {
    idAcolitos: number;
    nome: string;
    sexo: string;
    dataNascimento: string;
    idade: number;
    telefone: string;
    tamTunica: string;
    comunidades: string[];
    missas: string[];
    cerimonialista: boolean;
    comentario: string;
}

export interface AcolitoSearch {
    idade: string;
    sexo: string;
    missas: string;
    comunidades: string;
    cerimonialista: string;
}

export interface updateAcolitoInterface {
    telefone: string;
    tamTunica: string;
    cerimonialista: number;
    comentario: string;
    comunidades: number[];
}