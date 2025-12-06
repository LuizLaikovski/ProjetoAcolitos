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

interface AcolitosProps {
    canEdit: boolean;
}

const Acolitos = ({ canEdit }: AcolitosProps) => {

    const [acolito, setAcolito] = useState<AcolitoProp[]>([]);
    const api_url = import.meta.env.VITE_API_URL; // URL do Apps Script
    
    useEffect(() => {
        const fetchAcolito = async () => {
            try {
                const response = await fetch(api_url);
                const data = await response.json();

                // 🔥 Ajuste: converter o retorno do Google Sheets para o seu formato
                const formatado = data.map((item: any, index: number) => ({
                    idAcolitos: index + 1, // não existe ID na planilha, então geramos 1,2,3...
                    nome: item["Nome Completo"] || "",
                    dataNascimento: item["Data de Nascimento"] || "",
                    idade: calcularIdade(item["Data de Nascimento"]),
                    telefone: item["Telefone Contato"] || "",
                    tamTunica: item["Tamanho de túnica"] || "",
                    comunidades: item["Comunidade"] || "",
                    cerimonialista: item["Cerimonialista"] || "",
                    comentario: item["Comentário"] || "",
                    missas: {
                        sabado19h30: item["Sábado 19h30"] || "",
                        domingo8h: item["Domingo 8h"] || "",
                        domingo18h: item["Domingo 18h"] || ""
                    }
                }));

                setAcolito(formatado);
            } catch (error) {
                console.error("Erro ao buscar acólitos:", error);
            }
        };

        fetchAcolito();
    }, [api_url]);

    return (
        <>
            <Form setAcolitos={setAcolito} canEdit={canEdit} />
            
            <div className="w-[80dvw] grid grid-cols-3 gap-8 mt-8 acolitos">
                {acolito.length > 0 ? (
                    acolito.map((a) =>
                        <Card
                            key={a.idAcolitos}
                            idAcolitos={a.idAcolitos}
                            nome={a.nome}
                            sexo={a.sexo ?? ""} // caso não exista sexo na planilha
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
