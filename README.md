
# 🧾 Tax AI Chatbot

**CoTax** is a web-based chatbot built with **Next.js**, **Tailwind CSS**, **TanStack Query**, and the **Vercel AI SDK**, now powered by **RAG (Retrieval-Augmented Generation)** using **LangChain**, **ChromaDB**, and **OpenAI GPT-4o**.

It acts as a virtual tax assistant for U.S. individual filers, answering common questions about Form 1040, tax brackets, deductions, credits, and more — with support for file uploads, 2024 tax info retrieval from IRS PDFs, and chart generation.

[![CoTax Screenshot](https://github.com/MercifulB/Tax-Chatbot/blob/9b3a602e24fa510fa4f36bc64bb02964dfd82b06/CoTax%20Pic.png)](https://drive.google.com/file/d/1Y7kFukvP42s9ndvXdiyamaL69ZQWmRww/view?usp=sharing)

<p align="center">
  <img width="48%" alt="image" src="https://github.com/user-attachments/assets/27934a17-fc28-44ee-81ea-7fa5c014e762" />
  <img width="48%" alt="image" src="https://github.com/user-attachments/assets/cab8a48f-1944-4e93-b819-b923d7156d72" />
</p>

---

## 📽️ Demo Video

🎥 [Watch the demo](https://drive.google.com/file/d/1Y7kFukvP42s9ndvXdiyamaL69ZQWmRww/view?usp=sharing)

> 🧠 Powered by GPT-4o + RAG using IRS 2024 documents (Form 1040 + Tax Guide)

---

## 🚀 Features

- 💬 Conversational UI via `useChat` (Vercel AI SDK)
- 🔎 **RAG Integration**: Injects accurate 2024 U.S. tax info via document-based context
- 📁 File upload support (PDFs, images) with preview
- 📊 Chart rendering via Markdown-like `[chart]{...}[/chart]` syntax
- 📄 Table rendering via GitHub Flavored Markdown (GFM)
- 📷 Webcam capture and paste-to-chat image support
- 💡 Smart follow-up suggestions based on question intent
- 🌙 Dark mode with smooth UI transitions

---

## 🛠 Tech Stack

| Area              | Stack                                 |
|-------------------|----------------------------------------|
| Frontend Framework| [Next.js](https://nextjs.org/)         |
| Styling           | [Tailwind CSS](https://tailwindcss.com/) |
| Data Fetching     | [TanStack Query](https://tanstack.com/query) |
| AI SDK            | [Vercel AI SDK](https://sdk.vercel.ai) |
| Embeddings        | [LangChain + OpenAIEmbeddings](https://python.langchain.com/) |
| Vector DB         | [ChromaDB](https://docs.trychroma.com) |
| Charting          | [Recharts](https://recharts.org)       |

---

## 📦 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/cotax-ai.git
cd cotax-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your environment
Create a `.env.local` file:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```
Make sure to add your own API key to os.environ["OPENAI_API_KEY"] in main.py and split_embed.py

### 4. Set up the backend for RAG
### (a) Create a Python virtual environment
```bash
cd rag_backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### (b) Embed IRS documents
Make sure 1040KnowledgeBase.pdf and usTaxGuide.pdf are in rag_backend/, then run:

```bash
python split_and_embed.py
```
### (c) Start ChromaDB (in a separate terminal)
```bash
chroma run --path ./rag_backend/chroma_db
```

### 5. Run the Next.js app locally
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🧪 Assumptions

- Users have basic knowledge of U.S. taxes (Form 1040 context).
- Chatbot includes 2023 GPT-4o knowledge and 2024 tax guidance via document retrieval.

---

## 🧱 Stubbed / Placeholder Logic

- 📄 File uploads: Simulated file processing with a fake delay
- 📊 AI responses are based on streamed GPT-4o text but chart responses are conditionally rendered based on `[chart]` blocks
- 🧠 Chat history not persisted between sessions.

---

## 🌱 Future Improvements

- 🔐 File storage (e.g., Cloudinary or S3)
- 🧠 Session-based chat history using a backend or database
- 📑 Upload multiple documents and reference them in the chat
- 💡 Personalized tax suggestions based on user profile
- 📅 Deadline reminders, deduction calculators, refund estimators

---

## 🧑‍💻 Author

**Merciful Bolaji** — [Merciful](https://mercifulbolaji.netlify.app/)  
