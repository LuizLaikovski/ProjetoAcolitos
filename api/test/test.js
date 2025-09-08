const novoAcolito = {
    nome: "João Bigodinho",
    sexo: "MAS",
    dataNascimento: "2003-03-11",
    telefone: "47988729248",
    tamTunica: "42",
    cerimonialista: 0,
    comentario: "BLA BLA BLA",
    comunidades: [1],
    missas: [1, 3]
};

fetch("http://localhost:8800/newAcolito", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(novoAcolito)
}).then(res => res.json()).then(data => console.log("Criado:", data)).catch(err => console.error("Erro:", err));