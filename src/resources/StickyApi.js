const StickyApi = {
  getPosts: () => fetch('/api/getPosts').then((res) => res.json()),
};

export default StickyApi;
