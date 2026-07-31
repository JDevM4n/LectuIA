import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("No se encontró OPENAI_API_KEY en el archivo .env")

client = OpenAI(api_key=api_key)