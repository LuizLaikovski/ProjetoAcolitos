import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const res = await axios.post("http://localhost:8800/login", { user, password });
        if (res.data.access) {
            localStorage.setItem("token", res.data.token);
            navigate("/home");
        } else {
            alert("Usuário ou senha incorretos!");
        }
        } catch (err) {
            console.error(err);
            alert("Erro ao conectar ao servidor!");
        }
    };

    return (
        <>
            <main className="bg-gray-200 flex min-h-screen items-center justify-center p-4">
                <form onSubmit={handleLogin} className="containerLogin h-[55dvh] w-[30dvw] text-center flex flex-col justify-center items-center border-2 border-gray-300 p-8 rounded-lg bg-white shadow-lg space-y-4">
                    <h1 className="text-3xl mb-10">ACOLITOS SÃO JOSÉ OPERÁRIO</h1>
                    <input value={user} onChange={e => setUser(e.target.value)} placeholder="Usuário" className="border-blue-200 bg-blue-50 border-2 p-2 rounded-md w-[20dvw] text-xl text-center" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" className="border-blue-200 bg-blue-50 border-2 p-2 rounded-md w-[20dvw] text-xl text-center"  />
                    <button type="submit" className="border-black-900; border-2 p-2 rounded-md w-[20dvw] text-2xl transition hover:bg-gray-200">Entrar</button>
                </form>
            </main>
        </>
    );
}
