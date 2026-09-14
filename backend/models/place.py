"""
backend/models/place.py
Pydantic models for place data.

PlaceSummary  — lightweight version returned in list endpoints
Place         — full detail returned for a single place

When MongoDB is added, these same models will be used as
response_model in the router. Only the data layer (data/places.py)
will change — the models and router stay identical.
"""

from typing import Optional
from pydantic import BaseModel


class Coordinates(BaseModel):
    """Geographic coordinates for a place (future: real lat/lng from MongoDB)."""
    latitude: float
    longitude: float
    # SVG map coordinates (prototype only — removed when real map tiles are used)
    svg_x: Optional[float] = None
    svg_y: Optional[float] = None


class PlaceSummary(BaseModel):
    """
    Lightweight place representation for list endpoints.
    Contains only the fields needed for map markers and timeline cards.
    """
    id: str
    name: str
    name_en: str
    category: str          # "religious" | "historical" | "cultural"
    category_label: str    # Arabic label, e.g. "ديني"
    category_icon: str     # Emoji icon
    short_description: str
    image: Optional[str] = None
    estimated_visit_duration: int  # minutes
    quarter: str
    rating: Optional[float] = None
    coordinates: Coordinates


class Place(PlaceSummary):
    """
    Full place detail — extends PlaceSummary with rich content.
    Returned only by GET /api/places/{id}.
    """
    full_description: str
    significance: Optional[str] = None
    open_hours: Optional[str] = None
    entrance_fee: Optional[str] = None
    tags: list[str] = []
    nearby_place_ids: list[str] = []
