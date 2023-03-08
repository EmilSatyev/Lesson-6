import { generatePosts, getPosts } from './post.js';
import {
  $root,
  BASE_URL,
  POSTS_PER_VIEW,
  updatePageNumberURL,
} from './script.js';

export const displaySinglePost = (postId) => {
  const $singlePost = document.createElement('div');
  const $backBtn = document.createElement('button');

  $singlePost.classList.add('single-post');
  $singlePost.innerText = '';
  getPosts(`${BASE_URL}posts/${postId}`).then(({ data }) => {
    let htmlStr = `<h1>${data.title}</h1><p>${data.body}</p>`;
    $singlePost.insertAdjacentHTML('afterbegin', htmlStr);
  });

  $backBtn.innerText = 'назад';
  $backBtn.classList.add('back-btn');
  $backBtn.addEventListener('click', () => {
    const pageNumber = Math.ceil(postId / POSTS_PER_VIEW);
    generatePosts(pageNumber);
    updatePageNumberURL(pageNumber);
  });
  $root.innerHTML = '';
  $root.append($backBtn, $singlePost);
};
