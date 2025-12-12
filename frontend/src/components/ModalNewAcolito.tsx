import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useState } from "react";
import { newAcolito, type newAcolitoData } from "../data/createAcolito";
import { calcularIdade } from "../data/AgeAcolitos";

interface propComponent {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalNewAcolito = ({ setModal }: propComponent) => {
    const [formData, setFormData] = useState<newAcolitoData>({
        nome: "",
        sexo: "",
        dataNascimento: "",
        idade: 0,
        telefone: "",
        tamTunica: "",
        comunidades: [],
        missas: [],
        cerimonialista: 0,
        comentario: ""
    });
    const queryClient = useQueryClient();

    const closeModal = () => setModal(false);

    const handleChangeNew = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;

        const { name, value } = target;
        const checked = target.type === "checkbox" ? target.checked : undefined;


        setFormData(prev => {
            if (name === "missas" && type === "checkbox") {
                const num = Number(value);
                const missas = checked
                    ? [...prev.missas, num]
                    : prev.missas.filter(m => m !== num);

                return { ...prev, missas };
            }

            if (name === "comunidades") {
                return { ...prev, comunidades: [Number(value)] };
            }

            return {
                ...prev,
                [name]: name === "cerimonialista" ? Number(value) : value
            };
        });
    };

    const { mutateAsync: newAcolitofn } = useMutation({
        mutationFn: newAcolito,
        onSuccess(_, variable) {
            queryClient.setQueryData(["loadAcolitos"], (data) => {
                const prev = Array.isArray(data) ? data : [];
                return [...prev, variable];
            })
        }
    });

    const handleSubmitNew = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            formData.idade = calcularIdade(formData.dataNascimento);
            await newAcolitofn(formData);
            closeModal();
        } catch (error) {
            console.error(`Houve um erro: ${error}`);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal}></div>

            <div className="modalAddAcolito relative bg-white w-[80dvw] max-w-[600px] min-w-[300px] max-h-[90vh] p-6 rounded-xl shadow-xl z-50 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Adicionar Novo Acólito/Ancilia</h2>
                    <button onClick={closeModal} className="bg-white px-3 py-1 cursor-pointer hover:bg-gray-100 rounded">
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <form onSubmit={handleSubmitNew} className="">
                    <div className="grid-form-modal grid grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-blue-500">Nome:</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChangeNew}
                                placeholder="Nome:"
                                className="border-blue-200 text-blue-500 border-2 rounded-md p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="age" className="text-blue-500">Data de Nascimento:</label>
                            <input
                                type="date"
                                id="dataNascimento"
                                name="dataNascimento"
                                value={formData.dataNascimento}
                                onChange={handleChangeNew}
                                className="border-blue-200 text-blue-400 border-2 rounded-md p-2" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="sexo" className="text-blue-500">Sexo:</label>
                            <select
                                id="sexo"
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleChangeNew}
                                className="border-blue-200 text-blue-400 border-2 rounded-md p-2">
                                <option value="" disabled selected>Selecione</option>
                                <option value="MAS">Masculino</option>
                                <option value="FEM">Feminino</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="telefone" className="text-blue-500">Telefone:</label>
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChangeNew}
                                className="border-blue-200 text-blue-500 border-2 rounded-md p-2"
                            />
                        </div >
                        <div className="flex flex-col">
                            <div className="flex flex-col gap-2 p-2">
                                <label className="text-blue-400">
                                    <input
                                        name="missas"
                                        type="checkbox"
                                        value="1"
                                        checked={formData.missas.includes(1)}
                                        onChange={handleChangeNew}
                                        className="mr-2"
                                    />
                                    Sábados 19:30
                                </label>

                                <label className="text-blue-400">
                                    <input
                                        name="missas"
                                        type="checkbox"
                                        value="2"
                                        checked={formData.missas.includes(2)}
                                        onChange={handleChangeNew}
                                        className="mr-2"
                                    />
                                    Domingos 8h
                                </label>

                                <label className="text-blue-400">
                                    <input
                                        name="missas"
                                        type="checkbox"
                                        value="3"
                                        checked={formData.missas.includes(3)}
                                        onChange={handleChangeNew}
                                        className="mr-2"
                                    />
                                    Domingos 18h
                                </label>

                                <label className="text-blue-400">
                                    <input
                                        name="missas"
                                        type="checkbox"
                                        value="4"
                                        checked={formData.missas.includes(4)}
                                        onChange={handleChangeNew}
                                        className="mr-2"
                                    />
                                    Quartas-Feiras 19:30
                                </label>

                                <label className="text-blue-400">
                                    <input
                                        name="missas"
                                        type="checkbox"
                                        value="5"
                                        checked={formData.missas.includes(5)}
                                        onChange={handleChangeNew}
                                        className="mr-2"
                                    />
                                    Comunidade(s)
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="comunidade" className="text-blue-500">Comunidade:</label>
                            <select
                                id="comunidades"
                                name="comunidades"
                                value={formData.comunidades[0] || ""}
                                onChange={handleChangeNew}
                                className="border-blue-200 text-blue-400 border-2 rounded-md p-2">
                                <option value="" disabled selected>Selecione</option>
                                <option value="1">Matriz</option>
                                <option value="2">São Miguel Arcanjo</option>
                                <option value="3">Nossa Senhora de Fátima</option>
                                <option value="4">Santa Paulina</option>
                                <option value="5">São Domingos Sávio</option>
                                <option value="6">São João Batista</option>
                                <option value="7">Nossa Senhora Aparecida</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="tamTunica" className="text-blue-500">Tamanho de Tunica:</label>
                            <select
                                name="tamTunica"
                                id="tamTunica"
                                value={formData.tamTunica}
                                onChange={handleChangeNew}
                                className="border-blue-200 text-blue-400 border-2 rounded-md p-2">
                                <option value="" disabled selected>Tamanho de Túnica</option>
                                <option value="42">42</option>
                                <option value="P">P</option>
                                <option value="M">M</option>
                                <option value="G">G</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="outros" className="text-blue-500">cerimonialista:</label>
                            <select
                                name="cerimonialista"
                                id="cerimonialista"
                                value={formData.cerimonialista}
                                onChange={handleChangeNew}
                                className="border-blue-200 text-blue-400 border-2 rounded-md p-2">
                                <option value="" disabled selected>Tamanho de Túnica</option>
                                <option value={1}>Sim</option>
                                <option value={0}>Não</option>
                            </select>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                        <h3 className="p-2 font-bold">Comentários:</h3>
                    </div>
                    <input
                        type="text"
                        name="comentario"
                        id="comentario"
                        value={formData.comentario}
                        onChange={handleChangeNew}
                        placeholder="Comentários:"
                        className="border-2 w-full h-[100px] text-green-500 rounded-b-2xl border-green-300 p-1.5" />
                    <div>
                        <label htmlFor="submitNew" className="invisible">Submit</label>
                        <button id="submitNew" type="submit" className="cursor-pointer bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition-colors">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
