'use strict';

module.exports = {
  url: 'https://jpaterson.dev',
  pathPrefix: '/',
  title: 'Blog by J. Paterson',
  subtitle: 'This is less of a "this is how you do..." blog and more of a "how do you do...?" blog. So... how do you do?' ,
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
    bio: 'I am a web developer living in beautiful Vancouver, BC. I work mainly with React, Node, Typescript, GraphQL, and Docker web/OS/networking related',
    contacts: {
      email: 'contact@jpatersondev.com',
      twitter: 'jaydp123',
      github: 'jdpaterson',
      linkedin: 'jaydp123',
    }
  }
};
