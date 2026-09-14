/**
 * js/data/api.js — GUIDE Q API Client
 *
 * A thin wrapper around fetch() that calls the FastAPI backend.
 * All components use this module instead of calling fetch() directly,
 * so the base URL only needs to change here when deploying to production.
 *
 * Graceful fallback:
 *   If the backend is unreachable, each method falls back to mock.js data
 *   so the frontend never breaks during development.
 *
 * Future integration points:
 *   - Add auth headers when authentication is implemented
 *   - Add request caching when performance optimisation is needed
 *   - Replace in-memory fallbacks with offline-first IndexedDB storage
 */

const PlacesAPI = (() => {
  // ── Configuration ────────────────────────────────────────
  // API_BASE is set in app.js. Falls back to localhost:8000.
  function base() {
    return window.API_BASE || 'http://localhost:8000';
  }

  /**
   * Internal fetch helper with consistent error handling.
   * @param {string} path  — path relative to API_BASE, e.g. '/api/places'
   * @returns {Promise<any>}  — parsed JSON or throws Error
   */
  async function apiFetch(path) {
    const url = `${base()}${path}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw Object.assign(new Error(errorBody?.detail?.message || `HTTP ${response.status}`), {
        status: response.status,
        detail: errorBody?.detail || null,
      });
    }

    return response.json();
  }

  // ── Map API response fields → frontend field names ────────
  // The API uses snake_case (Python convention).
  // The frontend uses camelCase (JS convention) and some fields
  // have slightly different names (e.g. estimated_visit_duration → visitDuration).
  // This mapper keeps both sides clean without coupling them.
  function mapPlace(apiPlace) {
    if (!apiPlace) return null;
    return {
      id:            apiPlace.id,
      name:          apiPlace.name,
      nameEn:        apiPlace.name_en,
      category:      apiPlace.category,
      categoryLabel: apiPlace.category_label,
      categoryIcon:  apiPlace.category_icon,
      description:   apiPlace.short_description,
      fullDescription: apiPlace.full_description || apiPlace.short_description,
      significance:  apiPlace.significance || null,
      image:         apiPlace.image || null,
      visitDuration: apiPlace.estimated_visit_duration,
      quarter:       apiPlace.quarter,
      openHours:     apiPlace.open_hours || null,
      entranceFee:   apiPlace.entrance_fee || null,
      rating:        apiPlace.rating || null,
      tags:          apiPlace.tags || [],
      nearbyPlaces:  apiPlace.nearby_place_ids || [],
      coords: apiPlace.coordinates ? {
        x: apiPlace.coordinates.svg_x,
        y: apiPlace.coordinates.svg_y,
        lat: apiPlace.coordinates.latitude,
        lng: apiPlace.coordinates.longitude,
      } : null,
    };
  }

  // ── Public API ────────────────────────────────────────────

  /**
   * GET /api/places
   * Returns all places as an array mapped to frontend shape.
   * Falls back to mock.js MOCK_DATA.places on network error.
   */
  async function getAll() {
    try {
      const data = await apiFetch('/api/places');
      return data.map(mapPlace);
    } catch (err) {
      console.warn('[PlacesAPI] getAll() fell back to mock data:', err.message);
      return (window.MOCK_DATA?.places || []);
    }
  }

  /**
   * GET /api/places/{id}
   * Returns a single place mapped to frontend shape.
   * Falls back to mock.js getPlace(id) on network error.
   * @param {string} id
   */
  async function getById(id) {
    try {
      const data = await apiFetch(`/api/places/${encodeURIComponent(id)}`);
      return mapPlace(data);
    } catch (err) {
      if (err.status === 404) {
        // Place truly doesn't exist — don't fall back, surface the 404
        return null;
      }
      console.warn(`[PlacesAPI] getById('${id}') fell back to mock data:`, err.message);
      // Fallback: synchronous mock lookup
      return window.getPlace ? window.getPlace(id) : null;
    }
  }

  /**
   * GET /api/places/category/{category}
   * Returns places filtered by a single category.
   * Falls back to filtered mock.js data on network error.
   * @param {string} category — 'religious' | 'historical' | 'cultural'
   */
  async function getByCategory(category) {
    try {
      const data = await apiFetch(`/api/places/category/${encodeURIComponent(category)}`);
      return data.map(mapPlace);
    } catch (err) {
      console.warn(`[PlacesAPI] getByCategory('${category}') fell back to mock data:`, err.message);
      return (window.MOCK_DATA?.places || []).filter(p => p.category === category);
    }
  }

  /**
   * GET /api/health
   * Quick connectivity check. Resolves true if API is reachable.
   */
  async function isReachable() {
    try {
      await apiFetch('/api/health');
      return true;
    } catch {
      return false;
    }
  }

  return { getAll, getById, getByCategory, isReachable };
})();

// Expose globally so page modules can call PlacesAPI.getById(...)
window.PlacesAPI = PlacesAPI;
