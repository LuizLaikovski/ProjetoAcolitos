export interface newAcolitoData {
    nome: string;
    sexo: string;
    dataNascimento: string;
    idade: number;
    telefone: string;
    tamTunica: string;
    comunidades: number[];
    missas: number[];
    cerimonialista: number;
    comentario: string;
}

export async function newAcolito(body: newAcolitoData) {
    const token = localStorage.getItem("token");
    const api_url = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${api_url}newAcolito`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) throw new Error("Erro ao adicionar acolito: " + response.status);

        await response.json();
    } catch (error) {
        console.error(`Erro ao cadastrar: ${error}`);
        return `Erro ao cadastrar: ${error}`;
    }
}