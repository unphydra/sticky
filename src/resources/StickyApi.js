const StickyApi = {
  getPosts: () => fetch('/api/getPosts').then((res) => res.json()),
  isLoggedIn: () =>
    fetch('/api/isLoggedIn', { credentials: 'same-origin' })
      .then((res) => res.json())
      .then((data) => data.isLoggedIn),
  postForm: (form) =>
    fetch('/api/imageUpload', {
      method: 'POST',
      body: form,
    }),
  fetchImage: (url) => fetch(url).then((res) => res.blob()),
};

export default StickyApi;
