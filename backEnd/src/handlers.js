const data = {
  profile: {
    name: 'rivu',
    profilePicture: '/images/profile.jpg',
  },
  posts: [
    {
      profile: {
        name: 'rivu',
        profilePicture: '/images/profile.jpg',
      },
      heading: 'Durlovpur',
      image: '/images/nature.jpg',
      likes: 15,
      id: 1,
      comments: [
        {
          profile: { name: 'rivu', profilePicture: '/images/profile.jpg' },
          comment: 'nice picture',
          id: 1,
        },
        {
          profile: { name: 'rivu', profilePicture: '/images/profile.jpg' },
          comment: 'nice picture2',
          id: 2,
        },
      ],
    },
    {
      profile: {
        name: 'Layek',
        profilePicture: '/images/profile.jpg',
      },
      heading: 'Bankura',
      image: '/images/nature2.jpeg',
      likes: 20,
      id: 2,
      comments: [
        {
          profile: { name: 'rivu', profilePicture: '/images/profile.jpg' },
          comment: 'nice picture',
          id: 3,
        },
        {
          profile: { name: 'rivu', profilePicture: '/images/profile.jpg' },
          comment: 'nice picture2',
          id: 4,
        },
        {
          profile: { name: 'rivu', profilePicture: '/images/profile.jpg' },
          comment: 'nice picture3',
          id: 5,
        },
      ],
    },
  ],
};

const handleAllPosts = (req, res) => {
  res.json(data);
};

module.exports = { handleAllPosts };
