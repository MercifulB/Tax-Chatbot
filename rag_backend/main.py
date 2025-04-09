from fastapi import FastAPI, Request
from pydantic import BaseModel
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
import os

os.environ["OPENAI_API_KEY"] = "..."

app = FastAPI()
vectordb = Chroma(persist_directory="vectorstore", embedding_function=OpenAIEmbeddings())
qa_chain = RetrievalQA.from_chain_type(llm=ChatOpenAI(model_name="gpt-4"), retriever=vectordb.as_retriever())

class Question(BaseModel):
    query: str

@app.post("/rag")
async def answer_rag(question: Question):
    result = qa_chain.run(question.query)
    return {"answer": result}
