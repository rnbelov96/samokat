/* eslint-disable no-param-reassign */
export {};

const modalFormInfoList = [
  {
    title: 'Оставить заявку на бесплатную консультацию',
    button: 'Получить консультацию',
  },
  {
    title: 'Оставьте заявку и получите подробный бизнес-план',
    button: 'Получить подробный бизнес-план',
  },
  {
    title: 'Оставьте заявку для обсуждения условий сотрудничества',
    button: 'Cтать частью Samokat Day',
  },
];

const closeModal = (modalEl: HTMLDivElement) => {
  modalEl.style.opacity = '0';
  modalEl.style.overflowY = 'inherit';
  modalEl.style.pointerEvents = 'none';
  document.body.style.overflowY = 'auto';
};

const openModal = (modalEl: HTMLDivElement) => {
  modalEl.style.opacity = '1';
  modalEl.style.overflowY = 'auto';
  modalEl.style.pointerEvents = 'auto';
  document.body.style.overflowY = 'hidden';
};

const modalElList = document.querySelectorAll('.modal');
const [policyModalEl, formModalEl, youtubeModalEl] = modalElList;

const formTitleEl = formModalEl.querySelector('h2') as HTMLHeadingElement;
const formBtnEl = formModalEl.querySelector('button') as HTMLButtonElement;

const modalWrapperElList = document.querySelectorAll('.modal__center-wrapper');
modalElList.forEach(modalEl => {
  modalEl.addEventListener('click', (e: Event) => {
    if (e.target === e.currentTarget || [...modalWrapperElList].includes(e.target as Element)) {
      const clickedModal = e.currentTarget as HTMLDivElement;
      if (clickedModal === youtubeModalEl) {
        const iframe = youtubeModalEl.querySelector('iframe');
        if (iframe) {
          const iframeSrc = iframe.src;
          iframe.src = iframeSrc;
        }
      }
      closeModal(clickedModal);
    }
  });
});

const closeModalElList = document.querySelectorAll('.modal__close');
closeModalElList.forEach(closeEl => {
  closeEl.addEventListener('click', () => {
    modalElList.forEach(modalEL => {
      closeModal(modalEL as HTMLDivElement);
    });
  });
});

const policyCallBtnList = document.querySelectorAll('.js-policy');
policyCallBtnList.forEach(btn => {
  btn.addEventListener('click', () => {
    openModal(policyModalEl as HTMLDivElement);
  });
});

const callbackBtnElList = document.querySelectorAll('.js-callback');
const planBtnElList = document.querySelectorAll('.js-plan');
const partBtnElList = document.querySelectorAll('.js-part');

callbackBtnElList.forEach(btn => {
  btn.addEventListener('click', () => {
    formTitleEl.textContent = modalFormInfoList[0].title;
    formBtnEl.textContent = modalFormInfoList[0].button;
    openModal(formModalEl as HTMLDivElement);
  });
});

planBtnElList.forEach(btn => {
  btn.addEventListener('click', () => {
    formTitleEl.textContent = modalFormInfoList[1].title;
    formBtnEl.textContent = modalFormInfoList[1].button;
    openModal(formModalEl as HTMLDivElement);
  });
});

partBtnElList.forEach(btn => {
  btn.addEventListener('click', () => {
    formTitleEl.textContent = modalFormInfoList[2].title;
    formBtnEl.textContent = modalFormInfoList[2].button;
    openModal(formModalEl as HTMLDivElement);
  });
});

const youtubeBtnCallEl = document.querySelector('.js-youtube-call') as HTMLButtonElement;

youtubeBtnCallEl.addEventListener('click', () => {
  openModal(youtubeModalEl as HTMLDivElement);
});
