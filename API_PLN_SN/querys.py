
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from ml import get_recommendations, data





# Sistema de Recomendacion de libros y cursos
def recommender(user_id):
    # Busca el índice del usuario en el DataFrame usando su user_id
    user_index = data.index[data['id'] == user_id]

    if user_index.empty:
        raise ValueError("El user_id no se encuentra en el DataFrame.")
    
    # Usar el primer índice encontrado
    user_index = user_index[0]
    
    # Llama a get_recommendations usando el índice del usuario
    recommendations = get_recommendations(user_index)
    return recommendations

   
