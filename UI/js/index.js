const slidor = document.querySelectorAll(".slidor");
const slidorli = document.querySelectorAll(".slidorLi");
console.log(slidor.length)
// if (slidorli.length == 0) {
    let current = 0;
    
    function showNextSlide(){
        const currentSlide = slidorli[current];
        currentSlide.classList.remove('active');
        currentSlide.classList.add('slide-out-left');
    
        current = (current + 1)%slidorli.length;
    
        const nextSlide = slidorli[current];
        setTimeout(() => {
            currentSlide.classList.add('dspnOp');
            currentSlide.classList.remove('slide-out-left');
    
            nextSlide.classList.remove('dspnOp');
            nextSlide.classList.add('active');
    
    
            
        }, 800);
    }
    
    slidorli[0].classList.add('active');
    slidorli[0].classList.remove('dspnOp');
    
    setInterval(showNextSlide,3000);
    
// }
