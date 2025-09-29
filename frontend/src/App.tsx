import { useEffect, useState } from "react";
import Card from "./components/Card";
import Form from "./components/Form";

export interface AcolitoProp {
    id: number;
    nome: string;
    sexo: string;
    dataNascimento: string;
    idade: number;
    telefone: string;
    tamTunica: string;
    comunidades: string[];
    missas: string[];
    cerimonialista: boolean;
    comentario: string;
}

function App() {

  const [acolito, setAcolito] = useState<AcolitoProp[]>([]);

  useEffect(() => {
    const fetchAcolito = async () => {
      const response = await fetch('http://localhost:8800');
      const data = await response.json();
      setAcolito(data);
    }

    fetchAcolito();
  }, [])

  return (
    <>
    <div className="bg-gray-200 flex justify-center items-center flex-col">
      <Form />
      <div className="w-[80dvw] h-auto grid grid-cols-3 gap-8 mt-8">
        {acolito.map((acolito) => (
          <Card 
            nome={acolito.nome}
            sexo={acolito.sexo}
            idade={acolito.idade}
            telefone={acolito.telefone}
            tamTunica={acolito.tamTunica}
            comunidades={acolito.comunidades}
            missas={acolito.missas}
            cerimonialista={acolito.cerimonialista}
            comentario={acolito.comentario} id={0}        />
        ))}
      </div>
      <div className="w-[80dvw] h-auto grid grid-cols-3 gap-8 mt-10"></div>
    </div>
    </>
  )
}

export default App;
