

const ref = {
    buttonRef: document.querySelectorAll('button'),
    bodyRef: document.querySelector('body')
};
ref.buttonRef[0].addEventListener('click', () => { changeColorBody.startButoon() });
ref.buttonRef[1].addEventListener('click', () => { changeColorBody.stopButton() });




const changeColorBody = {
    color: null,
    isActive: false,

    getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
},

startButoon() {
    if (this.isActive) {
        console.log('Уже нажато')
        return;
    }
       this.color = setInterval(() => {
            ref.bodyRef.style.backgroundColor = this.getRandomHexColor();
            this.isActive = true;
    },1000)
},

stopButton() {  
    clearInterval(this.color)
    this.isActive = false;
}
}
