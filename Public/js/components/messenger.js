class Messenger extends Component{
    generateHTML(){
        document.onkeydown = undefined;

        let wrapper = this.createEl({className: 'messenger-wrapper'});
        let output = this.createEl({className: 'messenger-output'});
        let editText = this.createEl({tag: 'input', className: 'messenger-edit-text', attributes: [{type: 'text'}, {placeholder: 'Enter message'}]});
        let submit = this.createEl({tag: 'button', className: 'messenger-submit'});
        submit.textContent = "Submit";
        let msg;
        for(let i = 0; i < this.state.messages.length; i++){
            msg = this.createEl({className: 'messages-message'});
            msg.textContent = this.state.messages[i];
            output.appendChild(msg);
        }
        let send = ()=>{
            let msg = editText.value;

            if(msg.length){
                this.props.submitMessage(msg);
            }
        }
        submit.onclick = send;
        
        document.onkeydown = (k)=>{
            if(k.key == 'Enter'){
                send();
            }
        }

        wrapper.appendChild(output);
        wrapper.appendChild(editText);
        wrapper.appendChild(submit);
        this.root = wrapper;
    }
    attach(){
        super.attach();
        let lastMessage = this.root.querySelectorAll('.messages-message');
        if(lastMessage.length)
            lastMessage[lastMessage.length-1].scrollIntoView();
    }
}