import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', onFormInput);

let formData = {
  delay: '',
  step: '',
  amount: '',
};


function onFormSubmit({ delay, step, amount }) {
  setTimeout(() => {
    createPromise({ position, delay })
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
   
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    
      });
  }, delay);

  
 };

function onFormInput(evt) { 
 
  formData[evt.target.name] = evt.target.value;
  console.log(formData);
 console.log(formData.delay);
};

function createPromise({ position, delay }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay })
      } else {
        rej({ position, delay })
      }
    }, delay);
   
  });
};




