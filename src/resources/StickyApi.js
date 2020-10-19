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
  postComment: (id, text) =>
    fetch(`/api/postComment`, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ id, text }),
    }),
  postLike: (id) =>
    fetch('/api/like', {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ id }),
    }),
  fetchLikes: (id) => fetch(`/api/likes/${id}`).then((res) => res.json()),
};

export default StickyApi;
