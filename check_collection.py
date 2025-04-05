from chromadb import PersistentClient

client = PersistentClient(path="rag_backend/chroma_db")

# List all collections just in case
collections = client.list_collections()
print("📚 Collections found:", [c.name for c in collections])

try:
    collection = client.get_collection("tax-docs")
    print("🧠 Number of documents embedded:", collection.count())
except Exception as e:
    print("❌ Could not access 'tax-docs' collection:", e)
