import React, { useState } from "react";
import type { AcolitoProp } from "../App";
import { ModalNewAcolito } from "./ModalNewAcolito";

interface FormProp {
    setAcolitos: React.Dispatch<React.SetStateAction<AcolitoProp[]>>;
    canEdit: boolean;
}

const Form = ({ setAcolitos, canEdit = true }: FormProp) => {
    const token = localStorage.getItem("token");
    const api_url = import.meta.env.VITE_API_URL;
    const [formDataSearch, setFormDataSearch] = useState({
        idade: '',
        sexo: '',
        missas: '',
        comunidade: '',
        cerimonialista: ''
    });
    const [modalOpenNew, setModalOpenNew] = useState(false);


    const openModalNew = () => {
        setModalOpenNew(!modalOpenNew);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormDataSearch(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClearFilters = async () => {
        try {
            setFormDataSearch({
                idade: '',
                sexo: '',
                missas: '',
                comunidade: '',
                cerimonialista: ''
            });

            const response = await fetch(`${api_url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }

            const data = await response.json();
            setAcolitos(data);
        } catch (error) {
            console.error('Erro ao limpar filtros:', error);
        }
    };

    const handleSubmitSearch = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            const dataSearch = {
                idade: formDataSearch.idade,
                sexo: formDataSearch.sexo,
                missas: formDataSearch.missas,
                comunidades: formDataSearch.comunidade,
                cerimonialista: formDataSearch.cerimonialista
            }

            const params = new URLSearchParams();
            if (dataSearch.idade) params.append('idade', dataSearch.idade);
            if (dataSearch.sexo) params.append('sexo', dataSearch.sexo);
            if (dataSearch.missas) params.append('missas', dataSearch.missas);
            if (dataSearch.comunidades) params.append('comunidades', dataSearch.comunidades);
            if (dataSearch.cerimonialista) params.append('cerimonialista', dataSearch.cerimonialista);

            const response = await fetch(`${api_url}search?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            });


            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }

            const data = await response.json();
            setAcolitos(data);
        } catch (error) {
            console.error('Erro ao procurar acolito:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmitSearch} className="form w-[75dvw] h-auto bg-white rounded-2xl p-6 shadow-lg 
                mt-10 mb-10 flex flex-col items-center">
                <div className="w-full h-[9dvh] flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Busca de Acolitos:</h1>
                    {canEdit && (
                        <button onClick={openModalNew} className="buttonAdd p-3 rounded-xl w-full xl:w-auto bg-gradient-to-r
                            from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white
                            shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                                Adicionar Novo Acólito/Ancilia
                        </button>
                    )}
                </div>
                <div className="w-full h-[0.5px] border-2 border-gray-200 mt-5"></div>
                <div className="allignInputs grid grid-cols-6 gap-4 w-full mt-6">
                    <div>
                        <label htmlFor="age" className="text-blue-400">Idade:</label>
                        <input
                            type="number"
                            id="idade"
                            name="idade"
                            value={formDataSearch.idade}
                            onChange={handleChange}
                            className="border-blue-300 bg-blue-100 border-2 rounded-md p-2 w-full" />
                    </div>
                    <div>
                        <label htmlFor="sexo" className="text-purple-400">Sexo:</label>
                        <select
                            id="sexo"
                            name="sexo"
                            value={formDataSearch.sexo}
                            onChange={handleChange}
                            className="border-purple-300 text-purple-400 bg-purple-100 border-2 rounded-md p-2 w-full">
                            <option value="" disabled selected>Selecione</option>
                            <option value="MAS">Masculino</option>
                            <option value="FEM">Feminino</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="missas" className="text-yellow-500">Disponibilidade:</label>
                        <select
                            id="missas"
                            name="missas"
                            value={formDataSearch.missas}
                            onChange={handleChange}
                            className="border-2 border-yellow-400 bg-yellow-100 text-yellow-500 rounded-md p-2 w-full">
                            <option value="" disabled selected>Selecione</option>
                            <option value="Sabado">Sabádos 19:30</option>
                            <option value="Domingo 8h">Domingos 8h</option>
                            <option value="Domingo 18h">Domingos 18h</option>
                            <option value="Quartas">Quartas-Feiras 19:30</option>
                            <option value="Comunidades">Comunidade(s)</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="comunidade" className="text-red-500">Comunidade:</label>
                        <select
                            id="comunidade"
                            name="comunidade"
                            value={formDataSearch.comunidade}
                            onChange={handleChange}
                            className="border-red-400 text-red-400 bg-red-100 border-2 rounded-md p-2 w-full">
                            <option value="" disabled selected>Selecione</option>
                            <option value="Matriz">Matriz</option>
                            <option value="São Miguel Arcanjo">São Miguel Arcanjo</option>
                            <option value="Nossa Senhora de Fátima">Nossa Senhora de Fátima</option>
                            <option value="Santa Paulina">Santa Paulina</option>
                            <option value="São Domingos Savio">São Domingos Sávio</option>
                            <option value="São Joao Batista">São João Batista</option>
                            <option value="Nossa Senhora Aparecida">Nossa Senhora Aparecida</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cerimonialista" className="text-green-500">cerimonialista</label>
                        <select
                            id="cerimonialista"
                            name="cerimonialista"
                            value={formDataSearch.cerimonialista}
                            onChange={handleChange}
                            className="border-green-400 text-green-400 bg-green-100 border-2 rounded-md p-2 w-full">
                            <option value="" disabled selected>Selecione</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="submit" className="invisible">Submit</label>
                        <button
                            id="submit"
                            type="submit"
                            className="cursor-pointer bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition-colors">
                            Buscar
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="cursor-pointer bg-red-500 text-white rounded-md p-2 w-full hover:bg-red-600 transition-colors">
                            Limpar Filtros
                        </button>
                    </div>
                </div>
            </form>


            {canEdit && modalOpenNew && 
                <ModalNewAcolito setModal={setModalOpenNew} />
            }
        </>
    )
}

export default Form;