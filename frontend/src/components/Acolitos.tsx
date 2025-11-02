import { useEffect, useState } from "react";
import type { AcolitoProp } from "../App";
import Card from "./Card";
import Form from "./Form";

const calcularIdade = (dataNascimento: string): number => {
    if (!dataNascimento) return 0;
    
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    if (isNaN(nascimento.getTime())) {
        console.error("Data de nascimento inválida:", dataNascimento);
        return 0;
    }
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || 
        (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    return idade;
};

const Acolitos = () => {
    const [acolito, setAcolito] = useState<AcolitoProp[]>([]);
    const api_url = import.meta.env.VITE_API_URL;
    
    useEffect(() => {
        const fetchAcolito = async () => {
            try {
                
                const token = localStorage.getItem("token");
                const response = await fetch(`${api_url}`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                const acolitosComIdade = data.map((item: AcolitoProp) => ({
                    ...item,
                    idade: item.dataNascimento ? calcularIdade(item.dataNascimento) : 0
                }));
                setAcolito(acolitosComIdade);
            } catch (error) {
                console.error("Erro ao buscar acólitos:", error);
            }
        };
        fetchAcolito();
    }, [api_url]);

    return (
        <>
            <Form setAcolitos={setAcolito} />
            <div className="w-[80dvw] grid grid-cols-3 gap-8 mt-8 acolitos">
                {acolito.length > 0 ? (
                    acolito.map((a) =>
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