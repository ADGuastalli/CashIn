from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from querys import ( recommender
                    )

# instancia de FastApi.
app = FastAPI()

# Version y nombre de API.    
app.title = "Book Reccomendation - Machine Learning"
app.version = "1.0 Alfa"

# Configurar middleware CORS.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las solicitudes desde cualquier origen
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Url de Bienvenida
@app.get("/", tags=['Home'])
def home():
    return {'message': 'Bienvenido'}


# Recomendar peliculas
@app.get("/recommender/", tags=['Search'])
def recomendacion(id:int):
    
    recomendacion = recommender(id)
    return recomendacion
