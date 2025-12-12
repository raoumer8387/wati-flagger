# WhatsApp Template Classifier

A full-stack application for classifying and optimizing WhatsApp Business message templates using AI. The application uses Groq's Llama 3.1 8B Instant model to classify messages into Utility, Marketing, or Authentication categories, and can rewrite messages to be Utility-compliant.

## Features

- **Message Classification**: Classify WhatsApp templates into Utility, Marketing, or Authentication categories
- **Score Visualization**: View detailed scores for each category with visual progress bars
- **Message Rewriting**: Rewrite messages to be compliant with WhatsApp Utility template rules
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Real-time Feedback**: Loading indicators and error handling for better UX

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Axios (HTTP client)

### Backend
- Python 3.10+
- FastAPI (web framework)
- OpenRouter API (meta-llama/llama-4-maverick)
- Pydantic (data validation)

## Project Structure

```
root/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── models.py               # Pydantic models
│   ├── requirements.txt        # Python dependencies
│   └── utils/
│       └── llama_client.py     # Groq API client
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # Main app component
│   │   ├── components/
│   │   │   ├── ClassifierForm.tsx
│   │   │   ├── ResultCard.tsx
│   │   │   └── RewriteCard.tsx
│   │   └── api/
│   │       └── client.ts       # API client
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- npm or yarn
- OpenRouter API key ([Get one here](https://openrouter.ai/))

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows**:
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the `backend` directory (you can copy from `env.example`):
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

6. Run the FastAPI server:
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```
   
   **Note:** If `uvicorn` command is not recognized, use `python -m uvicorn` instead.

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file in the `frontend` directory if you want to customize the API URL:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## API Endpoints

### POST /classify

Classify a WhatsApp message template.

**Request:**
```json
{
  "message": "Your WhatsApp message template here"
}
```

**Response:**
```json
{
  "category": "Utility",
  "utility_score": 0.85,
  "marketing_score": 0.10,
  "auth_score": 0.05,
  "explanation": "This message is transactional and provides order confirmation..."
}
```

### POST /rewrite-utility

Rewrite a message to be Utility-compliant.

**Request:**
```json
{
  "message": "Your WhatsApp message template here"
}
```

**Response:**
```json
{
  "rewritten": "Rewritten Utility-compliant message..."
}
```

## Usage

1. Start both the backend and frontend servers (see Setup Instructions above)
2. Open your browser and navigate to `http://localhost:5173`
3. Paste a WhatsApp message template in the text area
4. Click "Classify Message" to get classification results
5. Click "Rewrite as Utility" to convert the message to a Utility-compliant template

## Development

### Backend Development

- The backend uses FastAPI with automatic API documentation
- Visit `http://localhost:8000/docs` for interactive API documentation
- Visit `http://localhost:8000/redoc` for alternative API documentation

### Frontend Development

- The frontend uses Vite for fast hot module replacement
- TypeScript is configured with strict mode
- Tailwind CSS is used for styling

## Environment Variables

### Backend (.env)
- `OPENROUTER_API_KEY`: Your OpenRouter API key (required)

### Frontend (.env)
- `VITE_API_URL`: Backend API URL (default: `http://localhost:8000`)

## Deployment

### Deploy to Vercel

This project is configured for easy deployment on Vercel. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

**Quick Steps:**
1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variable: `OPENROUTER_API_KEY`
4. Deploy!

The frontend will be served as a static site, and the backend will run as serverless functions.

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

