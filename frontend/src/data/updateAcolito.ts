import type { updateAcolitoInterface } from "../interfaces/acolitoInterface";
const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const updateAcolito = async (data: updateAcolitoInterface, id: number) => {
    try {
        const response = await fetch(`${api_url}update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw Error(`Erro: ${response.status}`);
    } catch (err) {
        return `Houve um erro ao editar o acolito: ${err}`
    }
}

export default updateAcolito;