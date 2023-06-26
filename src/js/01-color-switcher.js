const refs = {
    body: document.querySelector('body'),
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
};


refs.start.addEventListener('click', onStart);
refs.stop.setAttribute('disabled', true);

function onStart(evt) {
    
    refs.start.setAttribute('disabled', true);
    refs.stop.removeAttribute('disabled')

    const id = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    refs.stop.addEventListener('click', onStop);

    function onStop() { 
        clearInterval(id);
        refs.start.removeAttribute('disabled');
        refs.stop.setAttribute('disabled', true);
    };
    
};



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

