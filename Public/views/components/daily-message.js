(function(){
    let message = document.querySelector('.message');
    if(!message) return;
    let translateInTime = 500;
    let translateOutTime = 6000;
    let removeTime = 6500;
    setTimeout(()=>{
        message.classList.remove('translate-up-200');
    }, translateInTime);
    setTimeout(()=>{
        message.classList.add('translate-up-200');
    },  translateOutTime);
    setTimeout(remove, removeTime);

    message.onclick = remove;

    function remove(){
        message.parentElement.removeChild(message);
    }
})();