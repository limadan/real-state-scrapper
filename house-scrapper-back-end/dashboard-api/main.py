import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi import FastAPI
from auth import router as auth_router
from properties import router as properties_router
from search_criteria import router as search_criteria_router
from emails import router as emails_router

app = FastAPI(title="House Scrapper Dashboard API", version="1.0.0")

app.include_router(auth_router)
app.include_router(properties_router)
app.include_router(search_criteria_router)
app.include_router(emails_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
