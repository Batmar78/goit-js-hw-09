import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    input: document.querySelector('input#datetime-picker'),
    start: document.querySelector('button[data-start]'),
    timer: document.querySelector('.timer'),
    field: document.querySelectorAll('.field'),
    value: document.querySelectorAll('.value'),
    label: document.querySelectorAll('.label'),
}

refs.timer.style.maxWidth = '165px';
refs.timer.style.padding = '10px';
refs.timer.style.display = 'flex';
refs.timer.style.gap = '10px';
refs.timer.style.justifyContent = 'space-between';
refs.field.forEach((el) => {
    el.style.padding = 'auto';
    el.style.display = 'flex';
    el.style.flexWrap = 'wrap';
    el.style.justifyContent = 'center';
});
refs.value.forEach((el) => {
    el.style.fontSize = '20px';
    el.style.fontWeight = '500';  
});
refs.label.forEach((el) => {
    el.style.fontSize = '7px';
    el.style.fontWeight = '400';
});


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
      
      const validDate = selectedDates[0] - new Date();
    
      function createPromise(validDate) {
        return new Promise((res, rej) => {
        
            setTimeout(() => {
                if (validDate > 0) {
                    res();
                } else {
                    rej();
                }
            }, 250);
        });
      };
     
      createPromise(validDate).then(onValidDate).catch(onInvalidDate);
      
      refs.start.addEventListener('click', onClick);

      function onClick() {
        
          const intervalID = setInterval(() => {
              
              refs.start.setAttribute('disabled', true);
              
              const deltaTime = selectedDates[0] - new Date();
              const countdown = convertMs(deltaTime);
              const values = Object.values(countdown);

              refs.value.forEach((el, i) => {
                  el.textContent = values[i];
              });

              if (deltaTime < 1000) {
                  clearInterval(intervalID);
                  refs.start.setAttribute('disabled', true);
              }; 
              
          }, 1000);
      
      };
    
    },

};


const flatpickr = flatpickr(refs.input, options);

refs.start.setAttribute('disabled', true);

function onValidDate() {
     refs.start.removeAttribute('disabled');
};

function onInvalidDate() {
    setTimeout(() => {
          
        refs.start.setAttribute('disabled', true);
        setTimeout(() => {
            // return window.alert("Please choose a date in the future");
            const allert = Notify.failure("Please choose a date in the future");
            return allert;
        }, 100);
              
    }, 100);      
};

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};





