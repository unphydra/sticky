const StickyApi = {
  getPosts: () => fetch('/api/getPosts').then((res) => res.json()),
  isLoggedIn: () =>
    fetch('/api/isLoggedIn', { credentials: 'same-origin' })
      .then((res) => res.json())
      .then((data) => data.isLoggedIn),
};

export default StickyApi;
