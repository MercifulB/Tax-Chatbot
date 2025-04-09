from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
import pickle

embeddings = OpenAIEmbeddings()
vector_store = FAISS.from_texts(all_chunks, embeddings)

# Save the vector index
vector_store.save_local("vector_db/")
