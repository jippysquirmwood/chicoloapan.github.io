(function(){
    let socket = io();
    function submitMessage(msg){
        socket.emit('chat message', msg);
    }
    let m = new Messenger({
        parent: document.querySelector('body'),
        state: {open: true, messages: []},
        props: {submitMessage}
    });
    m.update();
    let messages = [];
    socket.on('chat message', (msg)=>{
        messages.push(msg);
        m.update({state: {messages}});
    })
    console.log(m)
})();