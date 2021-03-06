export {};

const anchorsElList = document.querySelectorAll('a[href*="#"]');
const blockElList = [...document.querySelectorAll('.js-menu')];

anchorsElList.forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const blockName = (anchor.getAttribute('href') as string).substr(1);

    const blockToScroll = blockElList.find(block => block.getAttribute('id') === blockName);

    blockToScroll?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
