import { useEffect, useState } from "react";
import type { AcolitoProp } from "../App";
import Card from "./Card";
import Form from "./Form";

const Acolitos = () => {
    const [acolito, setAcolito] = useState<AcolitoProp[]>([]);

    const api_url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        console.log(api_url);
        const fetchAcolito = async () => {
            try {
                const response = await fetch(`${api_url}/acolitos`);
                const data = await response.json();
                setAcolito(data);
            } catch (error) {
                console.error("Erro ao buscar acólitos:", error);
            }
        };
        fetchAcolito();
    }, [api_url]);

    return (
        <>
            <Form setAcolitos={setAcolito} />
            <div className="w-[80dvw] grid grid-cols-3 gap-8 mt-8">
                {acolito.length > 0 ? (
                    acolito.map((item) => <Card 
                    key={item.id}
                    nome={item.nome}
                    id={item.id}
                    sexo={item.sexo}
                    idade={item.idade}
                    telefone={item.telefone}
                    tamTunica={item.tamTunica}
                    comunidades={item.comunidades}
                    missas={item.missas}
                    cerimonialista={item.cerimonialista}
                    comentario={item.comentario} />)
                ) : (
                    <p className="text-gray-500 text-lg mt-4">
                        Nenhum acólito encontrado com os filtros selecionados.
                    </p>
                )}
            </div>
        </>
    );
};

export default Acolitos;
