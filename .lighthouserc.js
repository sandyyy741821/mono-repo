module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        '/',          // maps to index.html
        '/blog.html', // maps to blog.html
        '/about.html' // maps to about.html
      ]
    },
    upload: {
      target: 'filesystem',
    },
  }
};
