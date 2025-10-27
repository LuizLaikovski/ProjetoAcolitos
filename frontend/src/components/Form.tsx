import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import type { AcolitoProp } from "../App";

interface FormProp {
    setAcolitos: React.Dispatch<React.SetStateAction<AcolitoProp[]>>;
}

const Form = ({setAcolitos}: FormProp) => {
    const [formDataSearch, setFormDataSearch] = useState({
        idade: '',
        sexo: '',
        missas: '',
        comunidade: '',
        cerimonialista: ''
    });
    const [formData, setFormData] = useState({
        nameNew: '',
        dataNascimentoNew: '',
        sexoNew: '',
        missasNew: [] as number[],
        comunidadeNew: [] as number[],
        telefoneNew: '',
        tamTunicaNew: '',
        comentarioNew: '',
        cerimonialistaNew: 0
    });
    const [modalOpenNew, setModalOpenNew] = useState(false);

    const api_url = import.meta.env.VITE_API_URL;

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

    const handleChangeNew = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prevState) => {
        // caso seja checkbox
        if (type === "checkbox" && name === "missasNew") {
            const input = e.target as HTMLInputElement; // 👈 garante que é input
            const numericValue = Number(value);

            if (input.checked) {
                return {
                    ...prevState,
                    missasNew: [...prevState.missasNew, numericValue],
                };
            } else {
                return {
                    ...prevState,
                    missasNew: prevState.missasNew.filter((missa) => missa !== numericValue),
                };
            }
        }

        // caso seja select
        if (name === "comunidadeNew") {
            return {
                ...prevState,
                comunidadeNew: [Number(value)],
            };
        }

        // padrão para os outros campos
        return {
            ...prevState,
            [name]:
                name === "cerimonialistaNew" || name === "age"
                    ? Number(value)
                    : value,
        };
    });
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
            if (dataSearch.cerimonialista) params.append('cerimonialista', dataSearch.cerimonialista)

            const response  = await fetch(`${api_url}search?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            

            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }

            const data = await response.json();
            console.log("Acolito pesquisado: ", data);
            setAcolitos(data);
        } catch (error) {
            console.error('Erro ao procurar acolito:', error);
        }
    };

    const handleSubmitNew = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            const dataInsert = {
                nome: formData.nameNew,
                sexo: formData.sexoNew,
                dataNascimento: formData.dataNascimentoNew,
                telefone: formData.telefoneNew,
                tamTunica: formData.tamTunicaNew,
                cerimonialista: formData.cerimonialistaNew,
                comentario: formData.comentarioNew,
                comunidades: formData.comunidadeNew,
                missas: formData.missasNew
            }
        
            const response  = await fetch(`${api_url}newAcolito`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataInsert),
            });

            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }

            console.log(formData);
            const data = await response.json();
            console.log('Acolito cadastrado com sucesso:', data);

            console.log(dataInsert);
            setModalOpenNew(false);
        } catch (error) {
            console.error('Erro ao cadastrar acolito:', error);
        } finally {
            location.reload();
        }
    }

    return (
        <>
            <form onSubmit={handleSubmitSearch} className="w-[75dvw] h-auto bg-white rounded-2xl p-6 shadow-lg mt-10 mb-10 flex flex-col items-center">
                <div className="w-full h-[9dvh] flex justify-between items-center border-b-2 border-gray-200">
                    <h1 className="text-3xl font-bold">Busca de Acolitos:</h1>
                    <button onClick={openModalNew} className="p-3 border-1 rounded-xl w-full xl:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">Adicionar Novo Acólito/Ancilia</button>
                </div>
                <div className="grid grid-cols-6 gap-4 w-full mt-6">
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
                </div>
            </form>


            {modalOpenNew && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={openModalNew}></div>

                    <div className="relative bg-white w-[80dvw] max-w-[600px] min-w-[300px] p-6 rounded-xl shadow-xl z-50">
                        <button onClick={openModalNew} className="absolute top-3 right-3 bg-white px-3 py-1 cursor-pointer">
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                            <h2 className="text-2xl font-bold mb-4">Adicionar Novo Acólito/Ancilia</h2>
                        <form onSubmit={handleSubmitNew} className="">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="text-blue-500">Nome:</label>
                                    <input
                                    type="text"
                                    id="nameNew"
                                    name="nameNew"
                                    value={formData.nameNew}
                                    onChange={handleChangeNew}
                                    placeholder="Nome:"
                                    className="border-blue-200 text-blue-500 border-2 rounded-md p-2" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="age" className="text-blue-500">Data de Nascimento:</label>
                                    <input
                                    type="date"
                                    id="dataNascimentoNew"
                                    name="dataNascimentoNew"
                                    value={formData.dataNascimentoNew}
                                    onChange={handleChangeNew}
                                    className="border-blue-200 text-blue-400 border-2 rounded-md p-2" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="sexo" className="text-blue-500">Sexo:</label>
                                    <select
                                        id="sexoNew"
                                        name="sexoNew"
                                        value={formData.sexoNew}
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
                                        id="telefoneNew"
                                        name="telefoneNew"
                                        value={formData.telefoneNew}
                                        onChange={handleChangeNew}
                                        className="border-blue-200 text-blue-500 border-2 rounded-md p-2"
                                    />
                                </div >
                                <div className="flex flex-col">
                                    <div className="flex flex-col gap-2 p-2">
                                        <label className="text-blue-400">
                                        <input
                                            name="missasNew"
                                            type="checkbox"
                                            value="1"
                                            checked={formData.missasNew.includes(1)}
                                            onChange={handleChangeNew}
                                            className="mr-2"
                                        />
                                        Sábados 19:30
                                        </label>

                                        <label className="text-blue-400">
                                        <input
                                            name="missasNew"
                                            type="checkbox"
                                            value="2"
                                            checked={formData.missasNew.includes(2)}
                                            onChange={handleChangeNew}
                                            className="mr-2"
                                        />
                                        Domingos 8h
                                        </label>

                                        <label className="text-blue-400">
                                        <input
                                            name="missasNew"
                                            type="checkbox"
                                            value="3"
                                            checked={formData.missasNew.includes(3)}
                                            onChange={handleChangeNew}
                                            className="mr-2"
                                        />
                                        Domingos 18h
                                        </label>

                                        <label className="text-blue-400">
                                        <input
                                            name="missasNew"
                                            type="checkbox"
                                            value="4"
                                            checked={formData.missasNew.includes(4)}
                                            onChange={handleChangeNew}
                                            className="mr-2"
                                        />
                                        Quartas-Feiras 19:30
                                        </label>

                                        <label className="text-blue-400">
                                        <input
                                            name="missasNew"
                                            type="checkbox"
                                            value="5"
                                            checked={formData.missasNew.includes(5)}
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
                                    id="comunidadeNew"
                                    name="comunidadeNew"
                                    value={formData.comunidadeNew[0] || ""}
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
                                    name="tamTunicaNew"
                                    id="tamTunicaNew"
                                    value={formData.tamTunicaNew}
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
                                    name="cerimonialistaNew"
                                    id="cerimonialistaNew"
                                    value={formData.cerimonialistaNew}
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
                            name="comentarioNew"
                            id="comentarioNew"
                            value={formData.comentarioNew}
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
            )}
        </>
    )
}

export default Form;