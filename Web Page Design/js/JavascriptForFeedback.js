const feedbackForm = document.querySelector('.needs-validation');

feedbackForm.addEventListener('submit',(e)=>{
    if(!feedbackForm.checkValidity()){
        e.preventDefault();
    }
    else{
        alert('Success');
    }
   
    feedbackForm.classList.add('was-validated');
});


