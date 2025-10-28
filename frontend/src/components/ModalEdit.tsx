import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface ModalEditAcolitoProps {
    id: number;
    nome: string;
    sexo: string;
    telefone: string;
    comunidades: string[];
    tamTunica: string;
    comentario: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalEdit: React.FC<ModalEditAcolitoProps> = ({id,nome,telefone,tamTunica,comentario,setOpen,}) => {
    const api_url = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        name: "",
        dataNascimento: "",
        sexo: "",
        missas: [] as number[],
        comunidades: [] as number[],
        telefone: "",
        tamTunica: "",
        comentario: "",
        cerimonialista: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prevState) => {
        if (type === "checkbox" && name === "missas") {
            const input = e.target as HTMLInputElement;
            const numericValue = Number(value);
            return {
            ...prevState,
            missas: input.checked
                ? [...prevState.missas, numericValue]
                : prevState.missas.filter((m) => m !== numericValue),
            };
        }
        if (name === "comunidade") {
            return { ...prevState, comunidade: [Number(value)] };
        }
        return {
            ...prevState,
            [name]: name === "cerimonialista" ? Number(value) : value,
        };
        });
    };

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const dataInsert = {
            nome: formData.name,
            sexo: formData.sexo,
            dataNascimento: formData.dataNascimento,
            telefone: formData.telefone,
            tamTunica: formData.tamTunica,
            cerimonialista: formData.cerimonialista,
            comentario: formData.comentario,
            comunidades: formData.comunidades,
            missas: formData.missas,
        };

        const response = await fetch(`${api_url}update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataInsert),
        });

        if (!response.ok) throw  Error(`Erro: ${response.status}`);
        console.log("Acolito editado com sucesso!");
        } catch (err) {
        console.error("Erro ao editar acolito:", err);
        } finally {
        setOpen(false);
        location.reload();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}></div>
        <div className="containerEdit relative bg-white w-[50%] max-w-[600px] p-6 rounded-xl shadow-xl z-50">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3">
            <FontAwesomeIcon icon={faClose} />
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-500">Editar: {nome}</h2>
            <form onSubmit={handleSubmitEdit} className="flex flex-col gap-3">
            <input
                type="text"
                name="telefone"
                placeholder={telefone}
                value={formData.telefone}
                onChange={handleChange}
                className="border-blue-200 border-2 p-2 rounded-md"
            />
            <select
                name="tamTunica"
                value={formData.tamTunica}
                onChange={handleChange}
                className="border-blue-200 border-2 p-2 rounded-md"
            >
                <option value="" disabled>
                {tamTunica}
                </option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
            </select>
            <select
                id="comunidade"
                name="comunidade"
                value={formData.comunidades.map(String)}
                onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, (opt) => Number(opt.value));
                    setFormData((prev) => ({ ...prev, comunidades: selected }));
                }}
                className="border-blue-200 border-2 p-2 rounded-md">
                        <option value={0} disabled selected>Selecione</option>
                        <option value={1}>Matriz</option>
                        <option value={2}>São Miguel Arcanjo</option>
                        <option value={3}>São João Batista</option>
                        <option value={4}>Nossa Senhora de Fátima</option>
                        <option value={5}>Santa Paulina</option>
                        <option value={6}>São Domingos Sávio</option>
                        <option value={7}>Nossa Senhora Aparecida</option>
            </select>
            <input
                name="comentario"
                placeholder={comentario || "Sem observações"}
                value={formData.comentario}
                onChange={handleChange}
                className="border-blue-200 border-2 p-2 rounded-md h-24"
            />
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
                Salvar
            </button>
            </form>
        </div>
        </div>
    );
};

export default ModalEdit;
