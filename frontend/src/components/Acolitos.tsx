import { useEffect, useState } from "react";
import Card from "./Card";
import Form from "./Form";
import {useQuery} from '@tanstack/react-query';
import { getAcolitos } from "../data/getAcolitos";
import type { AcolitoProp } from "../interfaces/acolitoInterface";

interface AcolitosProps {
    canEdit: boolean;
}

const Acolitos = ({ canEdit }: AcolitosProps) => {
    const [acolito, setAcolito] = useState<AcolitoProp[]>([]);
    const {data, isError} = useQuery({
        queryKey: ["loadAcolitos"],
        queryFn: getAcolitos
    });

    useEffect(() => {
        if (data) {
            setAcolito(data);
        }
    }, [data]);

    if (isError) return <p className="text-red-500">houve um erro {isError}</p>

    return (
        <>
            <Form setAcolitos={setAcolito} canEdit={canEdit} />
            <div className="w-[80dvw] grid gap-8 mt-8 acolitos grid-cols-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                {acolito?.length > 0 ? (
                    acolito?.map((a) =>
                        <Card
                            key={a.idAcolitos}
                            idAcolitos={a.idAcolitos}
                            nome={a.nome}
                            sexo={a.sexo}
                            idade={a.idade}
                            telefone={a.telefone}
                            tamTunica={a.tamTunica}
                            comunidades={a.comunidades}
                            missas={a.missas}
                            cerimonialista={a.cerimonialista}
                            comentario={a.comentario}
                            canEdit={canEdit}
                        />
                    )
                ) : (
                    <p className="text-gray-500 text-lg mt-4">
                        Nenhum acólito encontrado.
                    </p>
                )}
            </div>
        </>
    );
};

export default Acolitos;