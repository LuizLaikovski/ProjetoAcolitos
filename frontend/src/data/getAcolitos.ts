import type { AcolitoProp } from "../App";
import { calcularIdade } from "./AgeAcolitos";

export const getAcolitos = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
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