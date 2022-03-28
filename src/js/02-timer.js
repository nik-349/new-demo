import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require("flatpickr/dist/themes/dark.css");
import Notiflix from 'notiflix';
//============================================================================================//


console.log('saasfsaf')

const ref = {
    input: document.querySelector('#datetime-picker'),
    buttonStart: document.querySelector('[data-start]'),
    buttonStop: document.querySelector('[data-stop]'),
    timerDays: document.querySelector('[data-days]'),
    timerHours: document.querySelector('[data-hours]'),
        timerMinutes: document.querySelector('[data-minutes]'),
    timerSeconds: document.querySelector('[data-seconds]'),
            span: document.querySelectorAll("span")
}

ref.buttonStart.setAttribute("disabled", "true");
ref.buttonStop.addEventListener('click', stopTimer)
ref.buttonStart.addEventListener('click', startTimer)
ref.input.addEventListener('click', inputStopColor)

//=============================================================================================//
let currentDate = null
let intervalId = null
//=======================================Options===============================================//

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
//===============================//
    onClose(selectedDates) {
        if (selectedDates[0] < new Date) {
            Notiflix.Notify.failure('Please choose a date in the future');    
            return;
        }
        ref.buttonStart.removeAttribute('disabled')
        ref.buttonStart.classList.add('webKitShadowGreen')
        Notiflix.Notify.success('Good choice of date');
        colorChange()
        currentDate = selectedDates[0]
    }
}

flatpickr('#datetime-picker', options)

//=========================================Buttom=Input==============================================//

function startTimer() {
    ref.buttonStart.classList.add('at-boms')
    ref.buttonStart.classList.remove('webKitShadowGreen')
    ref.buttonStop.classList.add('webKitShadowRed')
    intervalId = setInterval(() => {
        let timeConv = currentDate - new Date;
        let timePow = convertMs(timeConv)
        if (timeConv < 0) {
            clearInterval(intervalId)
            ref.buttonStop.classList.remove('webKitShadowRed');
            Notiflix.Notify.success('The timer has finished counting down');
            return
      }
      refChange(timePow)
    },1000)
}

function stopTimer() {
    ref.buttonStop.classList.add('at-boms');
    ref.buttonStop.classList.remove('webKitShadowRed');
    ref.buttonStart.setAttribute('disabled', false);
    clearInterval(intervalId);

    
}
function inputStopColor() {
    ref.buttonStop.classList.remove('webKitShadowRed')
    ref.buttonStart.classList.remove('webKitShadowGreen')
    const timeClear = convertMs(0)
    refChange(timeClear)
}
function colorChange() {
    ref.span.forEach((value) => {
        value.classList.add('colorOnAnable')
    })
}
//==============================================================================================//
function refChange({days,hours,minutes,seconds}) {
    ref.timerDays.textContent = `${days}`;
    ref.timerHours.textContent = `${hours}`;
    ref.timerMinutes.textContent = `${minutes}`;
    ref.timerSeconds.textContent = `${seconds}`;
}


//==============================================================================================//




//========================================Pad=Convert===========================================//

function pad(value){
    return String(value).padStart(2, '0')
    }


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
//==============================================================================================//