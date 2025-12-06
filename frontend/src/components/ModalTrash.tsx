import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalDeleteAcolitoProps {
    id: number;
    nome: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalTrash: React.FC<ModalDeleteAcolitoProps> = ({ id, nome, setOpen }) => {
    const api_url = import.meta.env.VITE_API_URL || "http://localhost:8800/";
    const token = localStorage.getItem("token");

    const deleteAcolito = async () => {
        console.log("Tentando deletar acólito com ID:", id); // 🔍
    
        if (id === undefined || id === null) {
            console.error("⚠️ ID do acólito não definido!");
            return;
        }
    
        try {
            const res = await fetch(`${api_url}delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error(`Erro ${res.status}`);
            console.log("✅ Acólito excluído com sucesso!");
        } catch (err) {
            console.error("Erro ao excluir acólito:", err);
        } finally {
            setOpen(false);
            location.reload();
        }
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            ></div>

            <div className="containerTrash relative bg-white w-[50%] max-w-[500px] p-6 rounded-xl shadow-xl z-50 text-center">
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3"
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>

                <h2 className="text-xl font-bold mb-4">
                    Deseja excluir o acólito <span className="text-red-600">{nome}</span>?
                </h2>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={deleteAcolito}
                        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-1/3"
                    >
                        Sim
                    </button>
                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-1/3"
                    >
                        Não
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalTrash;
