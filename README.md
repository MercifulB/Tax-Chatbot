

# 🧾 CoTax AI Chatbot

**CoTax** is a web-based chatbot built with **Next.js**, **Tailwind CSS**, **TanStack Query**, and the **Vercel AI SDK**. It acts as a virtual tax assistant for U.S. individual filers, answering common questions about Form 1040, tax brackets, deductions, credits, and more — with support for file uploads and chart generation.

[![CoTax Screenshot](https://github.com/MercifulB/Tax-Chatbot/blob/9b3a602e24fa510fa4f36bc64bb02964dfd82b06/CoTax%20Pic.png)](https://drive.google.com/file/d/1Y7kFukvP42s9ndvXdiyamaL69ZQWmRww/view?usp=sharing)

<p align="center">
  <img width="48%" alt="image" src="https://github.com/user-attachments/assets/27934a17-fc28-44ee-81ea-7fa5c014e762" />
  <img width="48%" alt="image" src="https://github.com/user-attachments/assets/cab8a48f-1944-4e93-b819-b923d7156d72" />
</p>



## 📽️ Demo Video

[Watch the demo!](https://drive.google.com/file/d/1Y7kFukvP42s9ndvXdiyamaL69ZQWmRww/view?usp=sharing)


> 🧠 Powered by Vercel AI SDK + GPT-4o

---

## 🚀 Features

- 💬 Chat UI powered by `useChat` from Vercel AI SDK
- 🧠 Intelligent tax responses (e.g., deductions, credits, income types)
- 📁 File upload support (PDFs, images) with simulated analysis
- 📊 Chart rendering via Markdown-like `[chart]{...}[/chart]` blocks
- 💡 Follow-up suggestions tailored to user's question context
- 📷 Webcam capture for quick document intake
- 📄 Table rendering with GitHub Flavored Markdown (GFM)
- 🌙 Dark mode support with smooth transitions

---

## 🛠 Tech Stack

| Area              | Stack                                 |
|-------------------|----------------------------------------|
| Frontend Framework| [Next.js](https://nextjs.org/)         |
| Styling           | [Tailwind CSS](https://tailwindcss.com/) |
| Data Fetching     | [TanStack Query](https://tanstack.com/query) |
| AI Integration    | [Vercel AI SDK](https://sdk.vercel.ai) |
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

### 4. Run the app locally
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🧪 Assumptions

- Users have basic knowledge of U.S. taxes (Form 1040 context).
- The chatbot does **not** store or persist sensitive data.
- Information is based on GPT-4o up to 2023
- PDF/image analysis is not implemented — placeholder logic is shown instead.

---

## 🧱 Stubbed / Placeholder Logic

- 📄 File uploads: Simulated file processing with a fake delay
- 📊 AI responses are based on streamed GPT-4o text but chart responses are conditionally rendered based on `[chart]` blocks
- 🧠 No backend data persistence or session tracking is used

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
