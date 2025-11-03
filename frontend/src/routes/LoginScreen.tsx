import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function LoginScreen() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://projeto-acolitos-back.vercel.app/login", { user, password });
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
        <main className="bg-gray-200 flex min-h-screen items-center justify-center p-4">
            <form
                onSubmit={handleLogin}
                className="containerLogin h-[55dvh] w-[30dvw] text-center flex flex-col justify-center items-center border-2 border-gray-300 p-8 rounded-lg bg-white shadow-lg space-y-4"
            >
                <h1 className="text-3xl mb-10">ACÓLITOS SÃO JOSÉ OPERÁRIO</h1>

                <input
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Usuário"
                    className="border-blue-200 bg-blue-50 border-2 p-2 rounded-md w-[20dvw] text-xl text-center"
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        className="border-blue-200 bg-blue-50 border-2 p-2 rounded-md w-full text-xl text-center pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-[-30vw] top-1/4 transform-translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>

                <button
                    type="submit"
                    className="border-black-900 border-2 p-2 rounded-md w-[20dvw] text-2xl transition hover:bg-gray-200"
                >
                    Entrar
                </button>

                <Link to="/visitors" className="text-blue-500 hover:underline">
                    Entrar como visitante
                </Link>
            </form>
        </main>
    );
}