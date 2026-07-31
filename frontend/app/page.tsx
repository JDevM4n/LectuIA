"use client";

import { useState } from "react";
import { uploadDocument } from "../services/api";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState<any>(null);

  async function handleUpload() {
    if (!file) {
      alert("Selecciona un PDF.");
      return;
    }

    try {
      setLoading(true);

      const result = await uploadDocument(file);

      setAnalysis(result);
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error analizando el documento.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-[600px]">

          <h1 className="text-3xl font-bold text-center text-blue-700">
            🤖 Lety
          </h1>

          <p className="mt-8 text-center text-gray-700">
            Preparando tu clase...
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3 mt-8">
            <div className="bg-blue-600 h-3 rounded-full animate-pulse w-full"></div>
          </div>

          <div className="mt-8 space-y-2 text-gray-600 text-center">
            <p>📄 Leyendo documento...</p>
            <p>🧠 Analizando conceptos...</p>
            <p>⭐ Preparando highlights...</p>
            <p>📝 Creando evaluación...</p>
          </div>

        </div>
      </main>
    );
  }

  if (analysis) {
    return (
      <main className="min-h-screen bg-slate-100 p-10">

        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10">

          <h1 className="text-4xl font-bold text-blue-700 mb-6">
            🚀 Prepárate para la clase
          </h1>

          <p className="mb-8 text-lg">
            ⏱ <strong>Tiempo estimado:</strong>{" "}
            {analysis.estimated_time}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3">
              📖 Antes de entrar al salón
            </h2>

            <p>{analysis.preparation}</p>
          </section>

          <section className="mb-10">

            <h2 className="text-2xl font-bold mb-3">
              ⭐ Ideas principales
            </h2>

            <ul className="list-disc ml-8 space-y-2">
              {analysis.highlights.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </section>

          <section className="mb-10">

            <h2 className="text-2xl font-bold mb-3">
              🧠 Conceptos clave
            </h2>

            <ul className="list-disc ml-8 space-y-2">
              {analysis.key_concepts.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </section>

          <section className="mb-10">

            <h2 className="text-2xl font-bold mb-3">
              💡 Tips para estudiar
            </h2>

            <ul className="list-disc ml-8 space-y-2">
              {analysis.study_tips.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </section>

          <section className="mb-10">

            <h2 className="text-2xl font-bold mb-3">
              🙋 Preguntas para hacer al profesor
            </h2>

            <ul className="list-disc ml-8 space-y-2">
              {analysis.questions_to_ask.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>

          </section>

          <button
            className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-xl py-4 text-lg font-semibold"
            onClick={() => alert("El Quiz será la siguiente pantalla 😎")}
          >
            Comenzar Quiz
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl p-10 w-[650px]">

        <h1 className="text-5xl font-bold text-center text-blue-700">
          🚀 LectuIA
        </h1>

        <p className="text-center mt-4 text-gray-600">
          Prepárate para tu próxima clase con ayuda de Lety.
        </p>

        <div className="mt-10">

          <label className="block font-semibold text-lg mb-3">
            Selecciona un PDF
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files?.length) {
                setFile(e.target.files[0]);
              }
            }}
            className="w-full border rounded-lg p-3"
          />

          {file && (
            <p className="mt-3 text-green-700">
              📄 {file.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            className="mt-8 w-full bg-blue-700 hover:bg-blue-800 text-white rounded-xl py-4 text-lg font-semibold"
          >
            Prepararme con Lety
          </button>

        </div>

      </div>

    </main>
  );
}