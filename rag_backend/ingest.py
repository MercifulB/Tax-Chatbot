import fitz  # PyMuPDF
from langchain.text_splitter import RecursiveCharacterTextSplitter

def extract_text(pdf_path):
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text()
    return full_text

def chunk_text(text):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    return splitter.split_text(text)

if __name__ == "__main__":
    pdfs = ["1040KnowledgeBase.pdf", "usTaxGuide.pdf"]
    all_chunks = []

    for pdf in pdfs:
        text = extract_text(pdf)
        chunks = chunk_text(text)
        all_chunks.extend(chunks)

