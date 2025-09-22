import { useEffect, useState } from "react";
import Form from "../components/Form";
import type { AcolitoProp } from "../App";
import Card from "../components/Card";

const Name  = () => {

    const idade = 10;

    const [acolito, setAcolito] = useState<AcolitoProp[]>([]);

    useEffect(() => {
        const fetchAcolito = async () => {
            const response = await fetch(`http://localhost:8800/idade/${idade}`);
            const data = await response.json();
            setAcolito(data);
        }

    fetchAcolito();
    }, [])

    return (<div className="flex justify-center items-center flex-col">
        <Form />
        <div className="w-[80dvw] h-auto grid grid-cols-3 gap-8 mt-8">
            {acolito.map((acolito) => (
                <Card 
                    nome={acolito.nome}
                    sexo={acolito.sexo}
                    dataNascimento={acolito.dataNascimento}
                    idade={acolito.idade}
                    telefone={acolito.telefone}
                    tamTunica={acolito.tamTunica}
                    comunidades={acolito.comunidades}
                    missas={acolito.missas}
                    cerimonialista={acolito.cerimonialista}
                    comentario={acolito.comentario}
                    id={acolito.id}/>
            ))}
        </div>
    </div>);
};

export default Name;