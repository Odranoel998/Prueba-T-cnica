from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from pymongo import MongoClient
from bson import ObjectId
import os
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

origins = [
    "*", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app = FastAPI()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://db:27017")
client = MongoClient(MONGO_URI)
db = client["weber_database"]
scripts_collection = db["scripts"]

class ScriptModel(BaseModel):
    id: Optional[str] 
    title: str
    description: Optional[str] = None 

    @classmethod
    def from_mongo(cls, doc):
        doc['id'] = str(doc['_id'])
        del doc['_id']
        return cls(**doc)

@app.get("/scripts", response_model=List[ScriptModel])
async def get_scripts():
    documents = scripts_collection.find()
    result = [ScriptModel.from_mongo(doc) for doc in documents]
    return result

@app.post("/scripts", response_model=ScriptModel)
async def create_script(script: ScriptModel):
    script_dict = script.dict(exclude={"id"}) 
    result = scripts_collection.insert_one(script_dict) 
    new_script = scripts_collection.find_one({"_id": result.inserted_id}) 
    return ScriptModel.from_mongo(new_script) 


@app.get("/scripts/{script_id}", response_model=ScriptModel)
async def get_script(script_id: str):
    try:
        script = scripts_collection.find_one({"_id": ObjectId(script_id)})
        if not script:
            raise HTTPException(status_code=404, detail="Script not found")
        return ScriptModel.from_mongo(script)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid script ID")

@app.put("/scripts/{script_id}", response_model=ScriptModel)
async def update_script(script_id: str, script: ScriptModel):
    try:
        updated_script = scripts_collection.find_one_and_update(
            {"_id": ObjectId(script_id)},
            {"$set": script.dict(exclude_unset=True)},  
            return_document=True
        )
        if not updated_script:
            raise HTTPException(status_code=404, detail="Script not found")
        return ScriptModel.from_mongo(updated_script)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid script ID")

@app.delete("/scripts/{script_id}", response_model=ScriptModel)
async def delete_script(script_id: str):
    try:
        deleted_script = scripts_collection.find_one_and_delete({"_id": ObjectId(script_id)})
        if not deleted_script:
            raise HTTPException(status_code=404, detail="Script not found")
        return ScriptModel.from_mongo(deleted_script)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid script ID")
