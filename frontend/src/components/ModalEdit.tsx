import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import updateAcolito from "../data/updateAcolito";
import type { updateAcolitoInterface } from "../interfaces/acolitoInterface";

interface ModalEditAcolitoProps {
    id: number;
    nome: string;
    sexo: string;
    telefone: string;
    comunidades: string[];
    tamTunica: string;
    comentario: string;
    cerimonialista: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const ModalEdit: React.FC<ModalEditAcolitoProps> = ({ id, nome, telefone, tamTunica, comentario, setOpen, }) => {
    const [formData, setFormData] = useState<updateAcolitoInterface>({
        telefone: "",
        tamTunica: "",
        cerimonialista: 0,
        comentario: "",
        comunidades: [] as number[],
    });
    const queryClient = useQueryClient();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => {
            if (name === "comunidades") {
                return { ...prevState, comunidade: [Number(value)] };
            }
            return {
                ...prevState,
                [name]: name === "cerimonialista" ? Number(value) : value,
            };
        });
    };

    const { mutateAsync: updateAcolitofn } = useMutation({
        mutationFn: (vars: { data: updateAcolitoInterface, id: number }) =>
            updateAcolito(vars.data, vars.id),
        onSuccess: () => {
            queryClient.setQueryData(['loadAcolitos'], (data) => {
                const isData = Array.isArray(data) ? data : [];
                isData.forEach((acolito) => {
                    if (acolito.id === id) {
                        acolito.telefone = telefone;
                        acolito.tamTunica = tamTunica;
                        acolito.cerimonialista = formData.cerimonialista;
                        acolito.comentario = comentario;
                        acolito.comunidades = formData.comunidades;
                    }
                });

                return isData;
            })
        }
    });

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(JSON.stringify(formData));
        

        try {
            await updateAcolitofn({ data: formData, id });
            setOpen(false);
        } catch (error) {
            alert(`Houve um erro: ${error}`)
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
                    <select
                        name="cerimonialista"
                        value={formData.cerimonialista}
                        onChange={handleChange}
                        className="border-blue-200 border-2 p-2 rounded-md"
                    >
                        <option value={1}>Sim</option>
                        <option value={0}>Não</option>
                    </select>
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
                        id="comunidades"
                        name="comunidades"
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