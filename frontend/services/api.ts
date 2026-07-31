const API_URL = "http://127.0.0.1:8000";

export async function uploadDocument(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/documents/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("No fue posible analizar el documento.");
  }

  return response.json();
}