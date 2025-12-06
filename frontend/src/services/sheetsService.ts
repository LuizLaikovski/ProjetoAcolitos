export async function fetchAcolitos() {
  const url = "https://script.google.com/macros/s/AKfycbzsgH6R42_bS6K2RgEPzxYnzydB3kOdYS9-p8MbkXwaWA59ugD70AtCUeWxUPsNB9lo/exec
I"; // cole sua URL da implantação do Apps Script

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("Erro ao buscar dados do Google Sheets.");
  }

  return await response.json();
}
