import { useEffect, useState } from "react";
import type { AcolitoProp } from "../App";
import Card from "./Card";
import Form from "./Form";

const Acolitos = () => {
    const [acolito, setAcolito] = useState<AcolitoProp[]>([]);

    useEffect(() => {
        const fetchAcolito = async () => {
            const response = await fetch("http://localhost:8800");
            const data = await response.json();
            setAcolito(data);
        };
        fetchAcolito();
    }, []);

    return (
        <>
            <Form setAcolitos={setAcolito} />
            <div className="w-[80dvw] grid grid-cols-3 gap-8 mt-8">
                {acolito.length > 0 ? (
                    acolito.map((item) => <Card key={item.id} {...item} />)
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
