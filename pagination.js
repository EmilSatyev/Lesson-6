import { $root, POSTS_PER_VIEW, updatePageNumberURL } from './script.js';
import { generatePosts } from './post.js';

const displayPagination = (total, pageNumber) => {
  const $pagination = document.createElement('div');

  $pagination.innerText = '';
  $pagination.classList.add('pagination');

  const pagesCount = Math.ceil(total / POSTS_PER_VIEW);

  let paginationArr = [];
  for (let i = 0; i < pagesCount; i++) {
    paginationArr.push(i + 1);
  }

  if (pagesCount - 3 <= pageNumber) {
    paginationArr = [
      ...paginationArr.slice(0, 1),
      '...',
      ...paginationArr.slice(-5),
    ];
  } else if (pagesCount > 6 && pageNumber >= 5) {
    paginationArr = [
      ...paginationArr.slice(0, 1),
      '...',
      ...paginationArr.slice(pageNumber - 2),
    ];
  }
  if (pagesCount - 4 >= pageNumber) {
    paginationArr = [
      ...paginationArr.slice(0, 5),
      '...',
      ...paginationArr.slice(-1),
    ];
  }

  paginationArr.forEach((el) => {
    if (el === '...') {
      const $dots = document.createElement('span');
      $dots.innerText = el;
      $pagination.append($dots);
    } else {
      const $btn = document.createElement('button');
      $btn.innerText = el;
      $btn.classList.add('pageNum');
      if (el === pageNumber) {
        $btn.classList.add('active');
      }
      $pagination.append($btn);
    }
  });

  if (pagesCount > 4) {
    if (pageNumber !== 1) {
      const $prev = document.createElement('button');
      $prev.innerText = 'предыдущая';
      $prev.classList.add('pageNum', 'prev');
      $pagination.insertAdjacentElement('afterbegin', $prev);
    }
    if (pageNumber !== pagesCount) {
      const $next = document.createElement('button');
      $next.innerText = 'следующая';
      $next.classList.add('pageNum', 'next');
      $pagination.insertAdjacentElement('beforeend', $next);
    }
  }

  $pagination.addEventListener('click', (e) => {
    if (e.target.className.includes('pageNum')) {
      if (e.target.className.includes('prev')) {
        pageNumber--;
      } else if (e.target.className.includes('next')) {
        pageNumber++;
      } else {
        pageNumber = +e.target.innerText;
      }
      generatePosts(pageNumber);
      updatePageNumberURL(pageNumber);
    }
  });

  $root.append($pagination);
};

export {displayPagination};