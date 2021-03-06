export {};

const checkboxesData = [
  {
    id: 1,
    data: 'Презентация',
    isChecked: false,
  },
  {
    id: 2,
    data: 'Финансовая модель',
    isChecked: true,
  },
  {
    id: 3,
    data: 'Бизнес-план',
    isChecked: false,
  },
];

const resultTextEl = document.querySelector('.js-checkbox-text') as HTMLSpanElement;
const textBoxEl = document.querySelector('.docs__text') as HTMLParagraphElement;
const picturesElList = document.querySelectorAll('.docs__picture');
const checkboxElList = document.querySelectorAll('.js-checkbox-input');

const getResultString = ():string => {
  const stringList: string[] = [];
  checkboxesData.forEach(el => {
    if (el.isChecked) {
      stringList.push(el.data);
    }
  });

  return stringList.join(', ');
};

resultTextEl.textContent = getResultString();

checkboxElList.forEach(el => {
  el.addEventListener('input', e => {
    const inputEl = e.currentTarget as HTMLInputElement;

    const inputToEdit = checkboxesData.find(input => input.id === Number(inputEl.dataset.id));

    if (inputToEdit) {
      inputToEdit.isChecked = !inputToEdit.isChecked;
      picturesElList[inputToEdit?.id - 1].classList.toggle('docs__picture_shadow');
    }

    const resultString = getResultString();
    resultTextEl.textContent = getResultString();
    if (resultString === '') {
      textBoxEl.classList.add('visually-hidden');
    } else {
      textBoxEl.classList.remove('visually-hidden');
    }
  });
});
