"""
backend/routers/places.py
REST endpoints for tourist places.

Route order matters in FastAPI:
  /places/category/{category}  must come BEFORE  /places/{place_id}
  so FastAPI does not interpret "category" as a place_id.
"""

from fastapi import APIRouter, HTTPException, Query
from models.place import Place, PlaceSummary
from data.places import get_all_places, get_place_by_id, get_places_by_category

router = APIRouter(prefix="/places", tags=["Places"])

VALID_CATEGORIES = {"religious", "historical", "cultural"}


# ── GET /api/places ──────────────────────────────────────────
@router.get(
    "",
    response_model=list[PlaceSummary],
    summary="Get all places",
    description=(
        "Returns a summary list of all tourist places in the Old City of Jerusalem. "
        "Supports optional filtering by category via query parameter."
    ),
)
def list_places(
    category: str | None = Query(
        default=None,
        description="Filter by category: 'religious', 'historical', or 'cultural'",
        example="religious",
    )
):
    """
    GET /api/places
    GET /api/places?category=religious

    Returns all places, optionally filtered by category.
    Supports comma-separated categories for future multi-interest filtering:
        GET /api/places?category=religious&category=historical
    """
    if category:
        category = category.strip().lower()
        if category not in VALID_CATEGORIES:
            raise HTTPException(
                status_code=400,
                detail={
                    "error": "invalid_category",
                    "message": f"Category '{category}' is not valid.",
                    "valid_categories": sorted(VALID_CATEGORIES),
                },
            )
        return get_places_by_category(category)

    return get_all_places()


# ── GET /api/places/category/{category} ─────────────────────
# Declared BEFORE /{place_id} to avoid routing ambiguity.
@router.get(
    "/category/{category}",
    response_model=list[PlaceSummary],
    summary="Get places by category (path param)",
    description="Returns all places belonging to the specified category.",
)
def list_places_by_category(category: str):
    """
    GET /api/places/category/religious
    GET /api/places/category/historical
    GET /api/places/category/cultural

    Path-parameter version of category filtering.
    Useful when building URLs like /api/places/category/religious
    rather than query strings.
    """
    category = category.strip().lower()
    if category not in VALID_CATEGORIES:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "invalid_category",
                "message": f"Category '{category}' is not valid.",
                "valid_categories": sorted(VALID_CATEGORIES),
            },
        )
    results = get_places_by_category(category)
    return results


# ── GET /api/places/{place_id} ───────────────────────────────
@router.get(
    "/{place_id}",
    response_model=Place,
    summary="Get one place by ID",
    description="Returns the full details of a single place. Returns 404 if not found.",
    responses={
        404: {
            "description": "Place not found",
            "content": {
                "application/json": {
                    "example": {
                        "error": "not_found",
                        "message": "No place found with id 'unknown-id'",
                    }
                }
            },
        }
    },
)
def get_place(place_id: str):
    """
    GET /api/places/dome-of-rock
    GET /api/places/aqsa
    GET /api/places/tower-david

    Returns full place detail including description, significance, hours, and tags.
    Returns HTTP 404 with a descriptive error body if the place does not exist.
    """
    place = get_place_by_id(place_id)
    if not place:
        raise HTTPException(
            status_code=404,
            detail={
                "error": "not_found",
                "message": f"No place found with id '{place_id}'",
            },
        )
    return place
