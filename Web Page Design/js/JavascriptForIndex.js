function AutoTyping(){
    const TextString = "\"Our Earth, our responsibility.\
    Treat her well, and future generations will thank us. Neglect her, and we become architects of our own destruction.\""
    const element = document.getElementById('textQuote');
    const delay = 90;

    displayText(TextString,element,delay);
}
function displayText(text,Element,time){
    for(let i = 0;i<text.length;i++){
        setTimeout(() => {
            Element.textContent += text.charAt(i);
        },time*i);
    }
}
document.addEventListener('DOMContentLoaded',AutoTyping);