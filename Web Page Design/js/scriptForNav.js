// This script is for 
const currentPage = window.location.pathname;
const NavLinkList = document.querySelectorAll('a.nav-link').forEach(currentlink =>{
    if(currentlink.href.includes(currentPage.toString())){
        currentlink.classList.add('active');
    }
} )
// The following function is to add the opacity to the navigation bar by addintg the 'addOpacity' class when the scroll bar is scrolled. 
function NavEffect(){
    var NavClass = document.querySelector('.navbar');
    document.addEventListener('scroll', addEffect=> {
        if(window.scrollY>30){
            NavClass.classList.add('addOpacity');
        }
        else{
            NavClass.classList.remove('addOpacity');
        }
    })
}
document.addEventListener('DOMContentLoaded',NavEffect);