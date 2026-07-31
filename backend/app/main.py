from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.documents import router as documents_router

app = FastAPI(
    title="LectuIA API",
    version="0.1.0"
)

# Permitir que el frontend (Next.js) consuma la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents_router)


@app.get("/")
def root():
    return {
        "message": "Hola, soy Lety 👋"
    }