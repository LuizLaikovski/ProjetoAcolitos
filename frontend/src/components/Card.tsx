import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot, faPencil, faTrashAlt, faTShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import ModalTrash from "./ModalTrash";

interface CardProp {
    id: number,
    nome: string;
    sexo: string;
    idade: number;
    telefone: string;   
    tamTunica: string;
    comunidades: string[];
    missas: string[];
    cerimonialista: boolean;
    comentario: string;
    setModalOpenEdit?: React.Dispatch<React.SetStateAction<boolean>>;
    setModalOpenTrash?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card = ({ id, nome, sexo, idade, telefone, tamTunica, comunidades, missas, cerimonialista, comentario }: CardProp) => {
    const [modalEdit, setModalEdit] = useState(false);
    const [modalTrash, setModalTrash] = useState(false);
    return (
        <>
            <div key={id} className="box h-auto w-[25dvw] rounded-lg p-4 shadow-2xl bg-white">
                <div className="flex items-center mb-2">
                    <h2 className="text-2xl font-bold">{nome}</h2>
                </div>
                <div className="">
                </div>
                <div className="flex items-center mb-4">
                    {/* Sexo com cor dinâmica */}
                    <p className={`px-3 py-1 rounded-xl text-white mr-3 ${sexo === "MAS" ? "bg-blue-500" : "bg-pink-500"}`}>{sexo}</p>
                    
                    <p className="px-3 py-1 rounded-xl bg-amber-200 m-2.5 text-amber-900">
                        {idade} anos
                    </p>
                    <button className="cursor-pointer" onClick={() => setModalEdit(true)}><FontAwesomeIcon icon={faPencil} color="blue" size="xl" /></button>
                    <button className="cursor-pointer" onClick={() => setModalTrash(true)}><FontAwesomeIcon icon={faTrashAlt} color="red" className="ml-3" size="xl" /></button>
                </div>

                
                <ul className="mt-4">
                    {/* Só aparece se for cerimonialista */}
                    {cerimonialista ? (
                        <li className="px-3 w-[13ch] py-1 font-bold text-green-900 rounded-xl bg-green-400">
                            Cerimonialista
                        </li>
                    ) : null}
                    <li className="m-3 text-[14px]"><a className="text-green-500" href={`https://wa.me/${telefone}`} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} color="green" size="2xl" className="mr-3" />{telefone}</a></li>
                    <li className="m-3 text-[14px]"><FontAwesomeIcon icon={faLocationDot} size="2xl" className="mr-3" /> Comunidades: {comunidades.join(", ")}</li>
                    <li className="m-3 text-[14px]"><FontAwesomeIcon icon={faTShirt} size="2xl" className="mr-3" /> Túnica: {tamTunica}</li>

                    <h2 className="m-3">Disponibilidade: </h2>
                    <div className="grid grid-cols-3">
                        {missas.length > 0 ? (
                            <>
                                {missas.map(missa => (
                                    <p key={missa} className={`text-[12px] px-2.5 text-center py-0.5 font-bold border-1 rounded-xl m-0.5 
                                        ${missa === "Sábado" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}
                                        ${missa === "Domingo 8h" ? "bg-purple-400 text-white" : ""}
                                        ${missa === "Domingo 18h" ? "bg-yellow-300 text-white" : ""}
                                        ${missa === "Quartas" ? "bg-red-300 text-white" : ""}
                                        `}>{missa}</p>
                                ))}
                            </>
                        ) : (
                            <p className="m-3 text-[14px] w-[170%]">Nenhuma missa disponível</p>
                        )}
                    </div>

                    <div className="w-[20dvw] bg-blue-100 opacity-70 ml-[1.5dvw] mt-3 h-[16.5dvh] rounded-2xl p-3">
                        <h4 className="text-blue-600">Observações:</h4>
                        <p className="text-[13px] text-blue-600">{comentario || "Nenhuma observação disponível."}</p>
                    </div>
                </ul>
            </div>


            {modalEdit && (
                <ModalEdit
                id={id}
                nome={nome}
                sexo={sexo}
                telefone={telefone}
                comunidades={comunidades}
                tamTunica={tamTunica}
                comentario={comentario}
                setOpen={setModalEdit}
                />
            )}

            {modalTrash && (
                <ModalTrash 
                id={id}
                nome={nome}
                setOpen={setModalTrash}
                />
            )}
        </>
    );
};

export default Card;