
# 📚 Chapter API

A simple API for uploading and retrieving chapter data using MongoDB and Redis (via Upstash). Built with Express.

---

## 📁 Folder Structure

```bash
.
├── controller/
│   └── chapter.controller.js   # Upload, fetch, and cache logic
├── model/
│   └── chapter.model.js        # Mongoose schema
├── utils/
│   └── redisClient.js          # Redis commands via Upstash REST
├── middleware/
│   └── limiter.js              # Rate limiter middleware
├── routes/
│   └── chapter.routes.js       # Express routing
├── uploads/                    # Temp folder for uploaded JSON files
├── .env                        # Environment variables
├── app.js                      # Server entry point
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chapter-api.git
cd chapter-api
npm install
```

### 2. Configure environment variables

Create a `.env` file in the root directory with the following:

```env
PORT=3000
MONGO_URI=mongodb+srv://<your-mongo-uri>
UPSTASH_REDIS_REST_URL=https://<your-upstash-url>
UPSTASH_REDIS_REST_TOKEN=<your-upstash-token>
```

### 3. Start the server

```bash
npm run dev
```

---

## 🧠 API Endpoints

### ✅ Upload Chapters

```http
POST /api/chapters/upload
```

**FormData Field**:
- `file` (required): JSON file

**Description**:
Upload a `.json` file with an array of chapter objects.

#### 📦 Example JSON

```json
[
  {
    "chapter": "Introduction to Algebra",
    "subject": "Math",
    "class": "9",
    "unit": "Unit 1",
    "status": "active",
    "isWeakChapter": false
  }
]
```

---

### 📄 Get Chapters

```http
GET /api/chapters
```

**Query Parameters (optional)**:
- `class`, `unit`, `subject`, `status`, `isWeakChapter`, `page`, `limit`

Returns filtered, paginated list of chapters.

---

### 🔍 Get Chapter by ID

```http
GET /api/chapters/:id
```

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- Redis (Upstash REST)
- Axios
- dotenv

---

## 🧪 Rate Limiting

Custom middleware implemented using Upstash REST API to prevent abuse:
- **Window**: 1 minute
- **Limit**: 30 requests per IP

---

## 📌 Notes

- Uploaded files are deleted after processing
- Chapter data is cached in Redis for 1 hour
- Use Postman or cURL to test file uploads

---

## 📜 License

MIT License © Sugata Laha
