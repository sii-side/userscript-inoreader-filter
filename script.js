// ==UserScript==
// @name         Filter for Inoreader
// @namespace    sii
// @version      0.0.1
// @description  Userscript for hiding articles by deny words
// @author       sii
// @match        http://www.inoreader.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  //deny words for article's title
  const deny_title = ['aaa', 'bbb'];

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      [].filter.call(mutation.addedNodes, node => {
        return node.classList && node.classList.contains('ar');
      }).forEach(article => {
        const title = article.querySelector('.article_header_title').innerHTML;
        if (new RegExp(deny_title.join('|')).test(title)) {
          article.style.display = 'none';
        }
      });
    });
  });

  observer.observe(document.querySelector('#reader_pane'), {
    childList: true,
    subtree: true,
  });
})();