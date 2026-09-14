/**
 * router.js — Hash-based SPA router
 *
 * Routes:
 *   #/home       → Home page
 *   #/setup      → Trip setup wizard
 *   #/route      → Generated route view
 *   #/place/:id  → Place detail + AI chat
 *
 * Future: Replace with fetch-based data loading per route
 */

class Router {
  constructor(routes) {
    this.routes = routes; // { 'home': renderFn, 'setup': renderFn, ... }
    this._handleHashChange = this._handleHashChange.bind(this);
    window.addEventListener('hashchange', this._handleHashChange);
    window.addEventListener('load', this._handleHashChange);
  }

  /**
   * Parse the current hash into { route, params }
   * e.g. #/place/aqsa → { route: 'place', params: { id: 'aqsa' } }
   */
  _parse() {
    const raw = window.location.hash.replace('#/', '') || 'home';
    const parts = raw.split('/');
    const route = parts[0] || 'home';
    const params = {};
    if (parts[1]) params.id = parts[1];
    return { route, params };
  }

  _handleHashChange() {
    const { route, params } = this._parse();
    const renderFn = this.routes[route] || this.routes['home'];

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    const root = document.getElementById('app-root');
    root.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'page-enter';
    root.appendChild(wrapper);

    renderFn(wrapper, params);
  }

  /**
   * Navigate programmatically
   * @param {string} route - e.g. 'home', 'setup', 'route', 'place/aqsa'
   */
  navigate(route) {
    window.location.hash = `#/${route}`;
  }
}

// Singleton
window.Router = Router;
