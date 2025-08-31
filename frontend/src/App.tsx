import { useEffect, useState } from "react";
import Header from "./components/Header"

interface AcolitoProp {
  id: number,
  nome: string;
  sexo: string;
  idade: number;
  telefone: string;
  tamTunica: string;
  comunidades: string[];
  missas: string[];
  comentario: string;
}

function App() {

  const [acolitos, setAcolitos] = useState<AcolitoProp[]>([]);

  useEffect(() => {
    const fetchAcolitos = async () => {
      const response = await fetch("http://localhost:8800/");
      const data = await response.json();
      setAcolitos(data);
    };

    fetchAcolitos();
  }, []);

  return (
    <>
      <Header />
      <table className="text-center border-2 border-b">
        <thead>
          <tr className="border-2 border-b">
            <th className="">Nome</th>
            <th>Sexo</th>
            <th>Idade</th>
            <th>Telefone</th>
            <th>Tamanho da Túnica</th>
            <th>Comunidades</th>
            <th>Missas</th>
            <th>Comentário</th>
          </tr>
        </thead>
        <tbody>
          {acolitos.map(acolito => (
            <tr key={acolito.id} className="border-2 border-b">
              <td className="border-2 border-b p-1.5">{acolito.nome}</td>
              <td className="border-2 border-b p-1.5">{acolito.sexo}</td>
              <td className="border-2 border-b p-1.5">{acolito.idade}</td>
              <td className="border-2 border-b p-1.5">{acolito.telefone}</td>
              <td className="border-2 border-b p-1.5">{acolito.tamTunica}</td>
              <td className="border-2 border-b p-1.5">{acolito.comunidades.join(", ")}</td>
              <td className="border-2 border-b p-1.5">{acolito.missas.join(", ")}</td>
              <td className="border-2 border-b p-1.5">{acolito.comentario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App;
