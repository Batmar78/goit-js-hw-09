import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', onFormInput);

const formData = {
  delay: '',
  step: '',
  amount: '',
};

const step = Number(formData.step);
      
function onFormSubmit(evt) {
  evt.preventDefault();

  let delay = Number(formData.delay);
  let step = Number(formData.step);
  
  for (let i = 1; i <= Number(formData.amount); i += 1) {
    
      const position = i;
      
    setTimeout(() => {
      
      delay += step; 
     
    createPromise({ position, delay })
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); 
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      });

    }, delay);
    
  };  
  
 };

function onFormInput(evt) { 
 
  formData[evt.target.name] = evt.target.value;

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





