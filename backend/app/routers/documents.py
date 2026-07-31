from fastapi import APIRouter, UploadFile, File
import os

from app.services.pdf_service import PDFService
from app.core.lety import Lety

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    # Crear carpeta uploads si no existe
    os.makedirs("uploads", exist_ok=True)

    # Guardar el archivo
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Extraer texto del PDF
    text = PDFService.extract_text(file_path)

    # Analizar con Lety
    lety = Lety()
    analysis = lety.analyze_document(text)

    # Respuesta
    return {
        "document": {
            "filename": file.filename,
            "characters": len(text)
        },
        **analysis
    }