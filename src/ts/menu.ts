export {};

const anchorsElList = document.querySelectorAll('a[href*="#"]');
const hamburgerEl = document.querySelector('.header__hamburger') as HTMLDivElement;
const menuEl = document.querySelector('.header__menu') as HTMLDivElement;
const blockElList = [...document.querySelectorAll('.js-menu')];

hamburgerEl?.addEventListener('click', () => {
  const displayValue = window.getComputedStyle(menuEl).getPropertyValue('display');
  if (displayValue === 'none') {
    menuEl.style.display = 'flex';
  } else {
    menuEl.style.display = 'none';
  }
});

anchorsElList.forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();

    let interval: NodeJS.Timeout;

    const blockName = (anchor.getAttribute('href') as string).substr(1);

    const blockToScroll = blockElList.find(
      block => block.getAttribute('id') === blockName,
    ) as HTMLDivElement;

    let elementCoords = blockToScroll.getBoundingClientRect();
    if (elementCoords.top > 0) {
      interval = setInterval(() => {
        elementCoords = blockToScroll.getBoundingClientRect();
        if (elementCoords.top < 170) {
          clearInterval(interval);
          return;
        }
        window.scrollTo(0, window.pageYOffset + 20);
      }, 0.1);
      return;
    }
    interval = setInterval(() => {
      elementCoords = blockToScroll.getBoundingClientRect();
      if (elementCoords.top > 170) {
        clearInterval(interval);
        return;
      }
      window.scrollTo(0, window.pageYOffset - 20);
    }, 0.1);
  });
});
