const StickyApi = {
  getPosts: () => fetch('/api/getPosts').then((res) => res.json()),
  getPost: (id) => fetch(`/api/getPost/${id}`).then((res) => res.json()),
  getComment: (id) =>
    fetch(`/api/getComment/${id}`).then((res) => res.json()),
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
  postComment: (id, text) => {
    console.log(id, text);
    return fetch(`/api/postComment`, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ id, text }),
    });
  },
};

export default StickyApi;
