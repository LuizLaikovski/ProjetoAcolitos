import { useState } from "react";
import { useNavigate } from "react-router";

const LoginScreen = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();
    const api_url = import.meta.env.VITE_API_URL;

    const handleLogin = async () => {
        try {
            if (!user || !password) {
                setErro('Por favor, preencha todos os campos');
                return;
            }

            const response = await fetch(`${api_url}usersAcess`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, password }),
            });

            const data = await response.json();

            if (response.ok && data.access) {
                setErro('');
                navigate('/home');
            } else {
                setErro(data.error || 'Usuário ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor:', error);
            setErro('Erro ao conectar ao servidor');
        }
    }

    return (
        <>
            <main className="bg-gray-200 flex min-h-screen items-center justify-center p-4">
                <div className="h-[55dvh] w-[30dvw] text-center flex flex-col justify-center items-center border-2 border-gray-300 p-8 rounded-lg bg-white shadow-lg space-y-4">
                    <h1 className="text-3xl mb-10">ACOLITOS SÃO JOSÉ OPERÁRIO</h1>
                    <input
                    type="text"
                    placeholder="Usuário"
                    className="border-blue-200 bg-blue-50 border-2 p-2 rounded-md w-[20dvw] text-xl text-center"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}/>
                    
                    <input 
                    type="text" 
                    placeholder="Senha"
                    className="border-blue-200 bg-blue-50 border-2 p-2 rounded-md w-[20dvw] text-xl text-center" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>


                    {erro && <p className="text-red-500">{erro}</p>}
                    <button onClick={handleLogin} className="border-black-900; border-2 p-2 rounded-md w-[20dvw] text-2xl transition hover:bg-gray-200">Entar</button>
                </div>
            </main>
        </>
    );
};

export default LoginScreen;