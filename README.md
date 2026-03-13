# 💡 Idea Validator

An AI-powered startup idea validation system that provides constructive feedback on your business ideas. Built with React, Vite, Tailwind CSS, Express, and Hugging Face's Qwen 2.5 model.

Idea Validator analyzes your startup concepts and returns a structured evaluation focusing on **Strengths**, **Weaknesses**, and **Improvement Suggestions**.

---

## 📸 Screenshots

### Main Input Screen
<div align="center">
  <i><img src="https://github.com/AshikAJ7/idea-validator/blob/main/image.png" alt="Idea Validator" /></i>
</div>

### Analysis Results Screen
<div align="center">
  <i><img src="https://github.com/AshikAJ7/idea-validator/blob/main/image-1.png" alt="Output"</i>
</div>

---

## ✨ Features

- **AI-Powered Analysis**: Leverages `Qwen/Qwen2.5-7B-Instruct` via the Hugging Face Inference API.
- **Webhook Integration**: Secure Express backend that interfaces directly with the AI model.
- **Structured Feedback**: Generates an easily readable breakdown (Strengths, Weaknesses, Improvements).
- **Copy to Clipboard**: Easily copy the generated feedback for your notes.
- **Beautiful UI**: Modern, responsive design built with Tailwind CSS and Lucide React icons.

---

## 🚀 Tech Stack

**Frontend**:
- React 19
- Vite
- Tailwind CSS
- Lucide React (Icons)

**Backend**:
- Express.js
- CORS
- dotenv
- `@huggingface/inference` (Hugging Face SDK)

---

## 🛠️ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- A [Hugging Face](https://huggingface.co/) API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/idea-validator.git
cd idea-validator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add your Hugging Face API key:

```env
HF_API_KEY=your_hugging_face_api_key_here
```

### 4. Run the Application

You will need to run both the frontend and the backend server. Open two separate terminal windows.

**Terminal 1 (Backend Express Server):**
```bash
node server.js
```
*The webhook server will start on `http://localhost:3000`*

**Terminal 2 (Frontend React App):**
```bash
npm run dev
```
*The Vite frontend will start on typically `http://localhost:5173`*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check out the [issues page](https://github.com/AshikAJ7/idea-validator/issues).

## 📝 License

This project is licensed under the MIT License.
