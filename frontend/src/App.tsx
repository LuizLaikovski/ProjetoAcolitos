import Acolitos from "./components/Acolitos";
import "./App.css";

interface AppProps {
  canEdit: boolean;
}

export interface AcolitoProp {
    idAcolitos: number;
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

function App({canEdit}: AppProps) {
  return (
    <>
      <div className="bg-gray-200 flex justify-center items-center flex-col">
        <Acolitos canEdit={canEdit} />
        <div className="w-[80dvw] h-auto grid grid-cols-3 gap-8 mt-10"></div>
      </div>
    </>
  )
}

export default App;
