// The following two functions is for typing effect


//The following function is for the counting the numbers in
// the SP's contributions page
function countingNumber(){
    const countElements =  document.querySelectorAll('.counting');
    countElements.forEach((oneElement) => {
        oneElement.innerText = 0;
        const updateElement = () =>{
            const ActualNumber = oneElement.getAttribute('data-target');
            const num = +oneElement.innerText;
            const incrementNum = ActualNumber/200;
            if(num<ActualNumber){
                oneElement.innerText = Math.ceil(num+incrementNum);
                setTimeout(updateElement,1);
            }
            else{
                oneElement.innerText = ActualNumber;

            }


        };
        updateElement();
    });
}

document.addEventListener('DOMContentLoaded',countingNumber);

// The flip card javascript

const flipcards = document.querySelectorAll(".flipcard_inner");

flipcards.forEach((flipcard)=>{
    flipcard.addEventListener("click", function (e) {
        flipcard.classList.toggle('is_flipped');
      });
})

