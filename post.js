import { $root, BASE_URL, POSTS_PER_VIEW } from './script.js';
import { displayPagination } from './pagination.js';
import { displaySinglePost } from './singlePost.js';

const getPosts = async (url) => {
  const response = await fetch(url);
  const total = response.headers.get('x-total-count') || null;
  const data = await response.json();
  return { data, total };
};

const generatePosts = (pageNumber) => {
  getPosts(
    `${BASE_URL}posts?_limit=${POSTS_PER_VIEW}&_page=${pageNumber}`
  ).then(({ data, total }) => {
    displayPosts(data, pageNumber);
    displayPagination(total, pageNumber);
  });
};

const displayPosts = (data) => {
  const $postsWrap = document.createElement('div');
  const $posts = document.createElement('div');

  $postsWrap.classList.add('posts-wrap');
  $posts.innerText = '';
  $posts.classList.add('posts');
  $posts.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.tagName === 'A') {
      const postId = e.target.dataset.id;
      displaySinglePost(postId);
      history.pushState({ postId: +postId }, 'postId', `?postId=${postId}`);
    }
  });
  const htmlStr = data.reduce(
    (acc, { id, title }) =>
      acc +
      `<div class="post-card"><a data-id="${id}" href="#">${title} ${id}</a></div>`,
    ''
  );
  $posts.insertAdjacentHTML('afterbegin', htmlStr);
  $root.innerHTML = '';

  $postsWrap.append($posts);
  $root.append($postsWrap);
};

export { getPosts, generatePosts, displayPosts };
