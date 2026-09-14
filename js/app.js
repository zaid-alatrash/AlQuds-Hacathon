/**
 * app.js — Application Bootstrap & Global State
 *
 * Stage 2: FastAPI backend connected.
 *   - PlacesAPI (js/data/api.js) fetches place data from http://localhost:8000
 *   - Mock data in mock.js is still used for itineraries, AI responses, and map paths
 *
 * Future stages:
 *   - Stage 3: MongoDB replaces in-memory data in backend/data/places.py
 *   - Stage 4: Route generation logic added to backend
 *   - Stage 5: AI assistant integration
 */

/* ── API Configuration ──────────────────────────────────── */
// Change this to the deployed backend URL in production.
window.API_BASE = 'http://localhost:8000';

/* ── Global Application State ──────────────────────────── */
window.AppState = {
  /**
   * Trip configuration saved from the setup wizard.
   * Will be sent to API on integration:
   *   POST /api/itinerary/generate  ← tripConfig body
   */
  tripConfig: {
    days: 3,
    hoursPerDay: 6,
    budget: 20,
    startingPoint: 'jaffa-gate',
    dayInterests: {
      0: ['religious'],
      1: ['historical', 'cultural'],
      2: ['religious', 'historical'],
    },
  },

  /** Currently selected place ID (set before navigating to #/place/:id) */
  selectedPlaceId: null,

  /** Pending AI message queued from an outside button */
  pendingAiMsg: null,
};

/* ── Initialize Router ──────────────────────────────────── */
window.router = new Router({
  home:  (el, params) => renderHome(el, params),
  setup: (el, params) => renderSetup(el, params),
  route: (el, params) => renderRoute(el, params),
  place: (el, params) => renderPlace(el, params),
});

/* ── Default route ─────────────────────────────────────── */
if (!window.location.hash || window.location.hash === '#/') {
  window.location.hash = '#/home';
}
