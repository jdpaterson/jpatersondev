'use strict';

module.exports = {
  url: 'https://jpaterson.dev',
  pathPrefix: '/',
  title: 'Blog by J. Paterson',
  subtitle: 'My learnings in web development.',
  copyright: '© All rights reserved.',
  disqusShortname: '',
  postsPerPage: 4,
  googleAnalyticsId: 'UA-73379983-2',
  useKatex: false,
  menu: [
    {
      label: 'Articles',
      path: '/'
    },
    // {
    //   label: 'About me',
    //   path: '/pages/about'
    // },
    // {
    //   label: 'Contact me',
    //   path: '/pages/contacts'
    // }
  ],
  author: {
    name: 'J. Paterson',
    photo: '/profile.jpg',
    bio: 'I am a web developer living in beautiful Vancouver, BC. I work mainly with React, Rails, Node, GraphQL, and Docker, but I am interested in all things web related',
    contacts: {
      email: 'contact@jpatersondev.com',
      twitter: 'jaydp123',
      github: 'jdpaterson',
      linkedin: 'jaydp123',
    }
  }
};
