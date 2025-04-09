from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings

retriever = FAISS.load_local("vector_db", OpenAIEmbeddings()).as_retriever()
llm = ChatOpenAI(model_name="gpt-4o")

rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    return_source_documents=True
)

query = "What are the standard deductions for 2024?"
result = rag_chain.run(query)

print(result)
