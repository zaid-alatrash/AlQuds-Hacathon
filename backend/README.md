# GUIDE Q — Backend

## Requirements
- Python 3.10+
- FastAPI, Uvicorn, Pydantic (see `requirements.txt`)

## Installation
```bash
cd backend
pip install -r requirements.txt
```

## Running the API Server
```bash
cd backend
uvicorn main:app --reload --port 8000
```

API docs will be available at:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/places` | Get all places |
| GET | `/api/places?category=religious` | Filter by category (query param) |
| GET | `/api/places/category/{category}` | Filter by category (path param) |
| GET | `/api/places/{id}` | Get one place by ID |

Valid categories: `religious`, `historical`, `cultural`

## Project Structure
```
backend/
├── main.py           ← FastAPI app, CORS, router wiring
├── requirements.txt
├── data/
│   └── places.py     ← In-memory place data (replace with MongoDB later)
├── models/
│   └── place.py      ← Pydantic models (PlaceSummary, Place)
└── routers/
    └── places.py     ← /api/places endpoints
```

## Connecting to MongoDB (next stage)
Only `data/places.py` needs to change. The router and models stay the same:
```python
# Replace get_all_places() with:
async def get_all_places():
    docs = await db["places"].find({}).to_list(None)
    return [Place(**doc) for doc in docs]
```

## Running the Frontend (separate terminal)
```bash
cd ..   # go to project root
python -m http.server 8765
```
Then open http://localhost:8765
