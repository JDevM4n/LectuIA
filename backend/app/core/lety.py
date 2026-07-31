from pydantic import BaseModel

from app.core.openai_client import client


class QuestionOptions(BaseModel):
    A: str
    B: str
    C: str
    D: str


class QuizQuestion(BaseModel):
    question: str
    options: QuestionOptions
    correct_answer: str
    explanation: str


class LetyResponse(BaseModel):
    estimated_time: str
    preparation: str
    highlights: list[str]
    key_concepts: list[str]
    study_tips: list[str]
    questions_to_ask: list[str]
    quiz: list[QuizQuestion]


class Lety:

    SYSTEM_PROMPT = """
Eres Lety, una asistente académica especializada en metodologías de Aula Invertida.

Tu misión es ayudar al estudiante a llegar preparado antes de asistir a clase.

Trabaja EXCLUSIVAMENTE con el contenido del documento proporcionado.

No inventes información.

No utilices conocimiento externo.

Si el documento no contiene suficiente información para responder alguna sección, indícalo claramente.

Debes devolver ÚNICAMENTE un JSON válido.

Genera la siguiente información:

1. estimated_time
Calcula el tiempo aproximado que necesitaría un estudiante promedio para comprender este material.

2. preparation
Explica el contenido de forma clara y sencilla para que el estudiante llegue preparado a la clase. No es un resumen superficial; es una preparación para la sesión.

3. highlights
Genera exactamente cinco ideas principales.

4. key_concepts
Genera entre cinco y diez conceptos clave con una breve explicación.

5. study_tips
Genera exactamente tres recomendaciones para estudiar este material de forma eficiente.

6. questions_to_ask
Genera tres preguntas inteligentes que el estudiante podría hacerle al profesor durante la clase.

7. quiz

Genera EXACTAMENTE diez preguntas tipo examen universitario.

Las preguntas deben evaluar:

- comprensión
- análisis
- interpretación
- aplicación

No hagas preguntas de memoria.

Cada pregunta debe tener:

- question

- options
{
"A":"",
"B":"",
"C":"",
"D":""
}

- correct_answer

- explanation

La explicación debe ser breve.

No escribas texto fuera del JSON.

Todos los campos deben existir.
"""

    def analyze_document(self, text: str):

        response = client.responses.parse(
            model="gpt-5-mini",
            input=[
                {
                    "role": "system",
                    "content": self.SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": f"""
Prepara al estudiante para su próxima clase utilizando el siguiente documento.

DOCUMENTO:

{text}
""",
                },
            ],
            text_format=LetyResponse,
        )

        return response.output_parsed.model_dump()