import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot, faPencil, faTrashAlt, faTShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import ModalTrash from "./ModalTrash";
import "./css/card.css";

interface CardProp {
    idAcolitos: number;
    nome: string;
    sexo: string;
    idade: number;
    telefone: string;
    tamTunica: string;
    comunidades: string[];
    missas: string[];
    cerimonialista: boolean;
    comentario: string;
}

const Card: React.FC<CardProp> = ({
    idAcolitos,
    nome,
    sexo,
    idade,
    telefone,
    tamTunica,
    comunidades,
    missas,
    cerimonialista,
    comentario
}) => {
    const [modalEdit, setModalEdit] = useState(false);
    const [modalTrash, setModalTrash] = useState(false);

    return (
        <>
            <div className="box h-auto w-full sm:w-[25dvw] md:w-[30dvw] lg:w-[25dvw] rounded-lg p-5 shadow-2xl bg-white">
                <div className="flex items-center mb-2">
                    <h2 className="text-2xl font-bold">{nome}</h2>
                </div>

                <div className="flex items-center mb-4">
                    <p className={`px-3 py-1 rounded-xl text-white mr-3 ${sexo === "MAS" ? "bg-blue-500" : "bg-pink-500"}`}>
                        {sexo}
                    </p>

                    <p className="px-3 py-1 rounded-xl bg-amber-200 m-2.5 text-amber-900">
                        {idade} anos
                    </p>

                    {cerimonialista ? (
                        <li className="px-3 w-[13ch] py-1 font-bold text-green-900 rounded-xl bg-green-400">
                            Cerimonialista
                        </li>
                    ) : (
                        <></>
                    )}

                    <button className="cursor-pointer" onClick={() => setModalEdit(true)}>
                        <FontAwesomeIcon icon={faPencil} color="blue" size="xl" />
                    </button>

                    <button className="cursor-pointer" onClick={() => setModalTrash(true)}>
                        <FontAwesomeIcon icon={faTrashAlt} color="red" className="ml-3" size="xl" />
                    </button>
                </div>

                <ul className="mt-4">
                    <li className="m-3 text-[14px]">
                        <a
                            className="text-green-500"
                            href={`https://wa.me/${telefone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faWhatsapp} color="green" size="2xl" className="mr-3" />
                            {telefone || "Sem telefone"}
                        </a>
                    </li>

                    <li className="m-3 text-[14px]">
                        <FontAwesomeIcon icon={faLocationDot} size="2xl" className="mr-3" />
                        Comunidades: {(Array.isArray(comunidades) ? comunidades : [comunidades]).join(", ")}
                    </li>

                    <li className="m-3 text-[14px]">
                        <FontAwesomeIcon icon={faTShirt} size="2xl" className="mr-3" />
                        Túnica: {tamTunica}
                    </li>

                    <h2 className="m-3">Disponibilidade: </h2>
                    <div className="flex m-3">{missas}</div>

                    <div className="w-[20dvw] bg-blue-100 opacity-70 ml-[1.5dvw] mt-3 h-[16.5dvh] rounded-2xl p-3 comentario">
                        <h4 className="text-blue-600">Observações:</h4>
                        <p className="text-[13px] text-blue-600">
                            {comentario || "Nenhuma observação disponível."}
                        </p>
                    </div>
                </ul>
            </div>

            {modalEdit && (
                <ModalEdit
                    id={idAcolitos}
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
                    id={idAcolitos}
                    nome={nome}
                    setOpen={setModalTrash}
                />
            )}
        </>
    );
};

export default Card;