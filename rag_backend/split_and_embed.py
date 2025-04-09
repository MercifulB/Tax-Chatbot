from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from loader import extract_text_from_pdf
import os


os.environ["OPENAI_API_KEY"] = "..."

pdf_dir = os.path.dirname(__file__) 

def prepare_vectorstore():
    documents = []
    files = ["rag_backend/1040KnowledgeBase.pdf", "rag_backend/usTaxGuide.pdf"]

    for file in files:
        if not os.path.exists(file):
            print(f"File not found: {file}")
            continue

        raw = extract_text_from_pdf(file)
        if not raw.strip():
            print(f"No text extracted from {file}. Skipping.")
            continue

        print(f"Extracted text from {file}, length: {len(raw)}")

        splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        docs = splitter.create_documents([raw])
        documents.extend(docs)

    if not documents:
        print("No documents to embed. Aborting.")
        return

    vectordb = Chroma.from_documents(
        documents,
        embedding=OpenAIEmbeddings(),
        persist_directory="rag_backend/chroma_db",
        collection_name="tax-docs"
    )

    vectordb.persist()
    print("Vectorstore persisted successfully.")

if __name__ == "__main__":
    prepare_vectorstore()
