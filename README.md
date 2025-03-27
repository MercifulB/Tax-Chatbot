# CoTax AI Chatbot
![CoTax Chatbot Preview](/CoTax Pic.png)
A web-based AI tax assistant that helps users understand basic aspects of individual tax returns (Form 1040). Built using **Next.js**, **Vercel AI SDK**, **React Query (TanStack Query)**, and **Tailwind CSS**.

## 📦 Tech Stack
- **Frontend Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for responsive and clean UI
- **Data Fetching & State**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/) via `useChat` hook

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/cotax-chatbot.git
cd cotax-chatbot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app running.

---

## 🧠 Features

### ✅ Core Functionality
- **AI Chatbot UI** using `useChat` from Vercel AI SDK.
- **Streaming responses** directly into chat bubbles.
- **Quick reply suggestions** based on tax-related keywords.
- **File Upload Support** for image and PDF files (e.g., W-2s, receipts).
- **Live Preview** of pasted/uploaded files.
- **Multimedia Rendering**
  - Auto-render charts from AI responses when prompted (e.g., bar/pie/line charts).
  - Auto-render markdown tables with Tailwind-styled `<table>` elements.

### 🎯 UX Details
- Responsive, styled interface using Tailwind.
- Scroll-to-bottom auto behavior.
- WebCam Capture for document/photo input (simulated via camera API).
- Persistent file preview without flickering.

---

## 🧪 Assumptions Made
- File uploads are **simulated** and not stored/sent to backend.
- Knowledge is limited to 2023 due to gpt4o API
- All tax knowledge is assumed to come from the AI model with no authoritative data sources.

---

## 🚧 Areas for Future Improvement

### 🔁 Backend & Real Data Processing
- Connect file uploads to a backend (e.g., OCR, PDF parsing) for real tax analysis.
- Persist chat history and file data in a database (e.g., Supabase, Firebase).

### 🧠 AI Enhancements
- Add tool functions for AI to analyze uploaded content.
- Use Vercel AI SDK tool calls for structured data extraction.

### 📊 Analytics + Logging
- Implement basic user feedback (thumbs up/down).
- Add analytics for tracking common tax questions.

### 🌐 Accessibility
- Improve accessibility with proper ARIA roles.
- Voice input/output for visually impaired users.

---

## 📄 Placeholder/Stubs
- `fakeUpload()` simulates file upload latency.
- PDF/image preview is handled with `URL.createObjectURL()` but not persisted.
- AI-generated follow-up questions are keyword-matched rather than model-inferred.

---

## 📌 Notes
- This project was built in **under 3 hours**.
- All features are designed to showcase **AI SDK streaming**, **clean React architecture**, and **Tailwind UI design**.

---

## 👨‍💻 Author
**Merciful Bolaji** — [@mercifulbolaji](https://github.com/mercifulbolaji)

---

## 📝 License
[MIT](https://choosealicense.com/licenses/mit/)

