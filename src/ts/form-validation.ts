/* eslint-disable no-param-reassign */
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import IMask from 'imask';

const formsList = document.querySelectorAll('form');

formsList.forEach(form => {
  const nameInputEl = form.querySelector('[data-type="name"]') as HTMLInputElement | null;
  const phoneInputEl = form.querySelector('[data-type="phone"]') as HTMLInputElement;
  const emailInputEl = form.querySelector('[data-type="email"]') as HTMLInputElement;
  const cityInputEl = form.querySelector('[data-type="city"]') as HTMLInputElement | null;

  let phoneMask: IMask.InputMask<{mask: string, lazy: false}>;
  phoneInputEl.addEventListener('focus', () => {
    if (!phoneMask || phoneMask.unmaskedValue === '') {
      phoneMask = IMask(phoneInputEl, {
        mask: '+7(000)000-00-00',
        lazy: false,
      });
    }
  });
  phoneInputEl.addEventListener('blur', e => {
    const inputEl = e.currentTarget as HTMLInputElement;
    if (phoneMask.unmaskedValue === '') {
      phoneMask.destroy();
      inputEl.value = '';
    }
  });

  const onFocus = ((e: Event) => {
    const targerEl = e.currentTarget as HTMLInputElement;
    targerEl.classList.remove('input-error');
  });

  nameInputEl?.addEventListener('focus', onFocus);
  phoneInputEl.addEventListener('focus', onFocus);
  emailInputEl.addEventListener('focus', onFocus);
  cityInputEl?.addEventListener('focus', onFocus);

  form.addEventListener('submit', async e => {
    let isOk = true;

    if (nameInputEl && nameInputEl.value === '') {
      nameInputEl.classList.add('input-error');
      isOk = false;
    }
    if (phoneInputEl.value === '') {
      phoneInputEl.classList.add('input-error');
      isOk = false;
    }
    if (emailInputEl.value === '') {
      emailInputEl.classList.add('input-error');
      isOk = false;
    }
    if (cityInputEl && cityInputEl.value === '') {
      cityInputEl.classList.add('input-error');
      isOk = false;
    }

    if (phoneInputEl.value !== '' && !isMobilePhone(`+7${phoneMask.unmaskedValue}`, 'ru-RU')) {
      phoneInputEl.classList.add('input-error');
      isOk = false;
    }

    if (emailInputEl.value !== '' && !isEmail(emailInputEl.value)) {
      emailInputEl.classList.add('input-error');
      isOk = false;
    }

    if (isOk) {
      form.action = 'sendMail.php';
      form.method = 'POST';
      if (nameInputEl) {
        localStorage.setItem('userName', nameInputEl.value);
      } else {
        localStorage.setItem('userName', '');
      }
    } else {
      e.preventDefault();
    }
  });
});
