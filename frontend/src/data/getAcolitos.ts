import type { AcolitoProp, AcolitoSearch } from "../interfaces/acolitoInterface";
import { calcularIdade } from "./AgeAcolitos";
const apiurl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export const getAcolitos = async () => {
    try {
        const response = await fetch(apiurl, {
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await response.json();
        const acolitosFinally = data.map((item: AcolitoProp) => ({
            ...item,
            idade: item.dataNascimento ? calcularIdade(item.dataNascimento) : 0
        }));

        return acolitosFinally;
    } catch (error) {
        return `Houve um erro: ${error}`
    }
}

const getSearchAcolitos = async (data: AcolitoSearch) => {
    try {
        const params = new URLSearchParams();

        if (data.idade) params.append('idade', data.idade);
        if (data.sexo) params.append('sexo', data.sexo);
        if (data.missas) params.append('missas', data.missas);
        if (data.comunidades) params.append('comunidades', data.comunidades);
        if (data.cerimonialista) params.append('cerimonialista', data.cerimonialista);

        const response = await fetch(`${apiurl}search?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }

        });

        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);

        const dataRes = await response.json();
        const acolitosFinally = dataRes.map((item: AcolitoProp) => ({
            ...item,
            idade: item.dataNascimento ? calcularIdade(item.dataNascimento) : 0
        }));

        return acolitosFinally;
    } catch (error) {
        return `Houve um erro: ${error}`
    }
}

export default getSearchAcolitos;