// ==UserScript==
// @name         Inoreader Filter
// @namespace    sii
// @version      0.2
// @description  Inoreaderで特定のワードがタイトルに含まれている記事を非表示にする
// @author       sii
// @match        https://*.inoreader.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // define keywords to hide
  const denyTitles = [
      'keywords',
      'for',
      'filtering'
  ];

  const denyRegExp = new RegExp(denyTitles.join('|'));
  const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            [].filter.call(mutation.addedNodes, node => {
                return node.classList && node.classList.contains('ar');
            }).forEach(article => {
                const articleTitle = article.querySelector('.article_header_title').innerHTML;
                if (denyRegExp.test(articleTitle)) {
                    article.style.display = 'none';
                }
            });
        });
  });

  const readerPane = document.querySelector('#reader_pane');
  const observeOption = {
      childList: true,
      subtree: true
  };
  observer.observe(readerPane, observeOption);
})();
