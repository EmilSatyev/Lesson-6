import { generatePosts } from './post.js';
import { displaySinglePost } from './singlePost.js';

const $root = document.getElementById('root');
const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const POSTS_PER_VIEW = 8;

const params = new URLSearchParams(window.location.search);
const pageNumber = +params.get('page') || 1;
const postId = +params.get('postId');

const updatePageNumberURL = (pageNumber) => {
  history.pushState({ pageNumber }, 'pageNumber', `?page=${pageNumber}`);
};

if (postId) {
  displaySinglePost(postId);
} else if (pageNumber) {
  generatePosts(pageNumber);
}

window.addEventListener('popstate', (e) => {
  if (e.state?.postId) {
    displaySinglePost(+e.state.postId);
  } else {
    generatePosts(e.state?.pageNumber || 1);
  }
});

export { $root, BASE_URL, POSTS_PER_VIEW, updatePageNumberURL };
