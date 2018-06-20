class Component{
    constructor(options = {}){
        this.DebugLog("Creating new " + this.constructor.name);
        this.debug = options.debug == true ? true : false;
        this.state = {};
        this.props = {};
        this.attached = false;
        this.parent = options.parent;
        this.rootId = options.rootId || 'testnode';
        this.tag = options.tag || this.constructor.name;
        this.childComponents = [];
        this.children = options.children || [];
        this.children.forEach(c=>{
            c.parent = this.root;
            this.childComponents.push(new c.type(c));
        });
        this.setProps(options.props);
        this.setState(options.state);
        this.initialize();
    }
    DebugLog(message){
        if(this.debug){
            console.debug(message);
        }
    }
    initialize(){
        this.DebugLog(this.tag + ': initialize');
        return;
    }
    setProps(props){
        this.DebugLog(this.tag + ': set props to ', props);
        this.childComponents.forEach(c=>c.setProps(props));
        Object.assign(this.props,  props);
    }
    setState(state){
        this.DebugLog(this.tag + ': set state to ', state);
        this.childComponents.forEach(c=>c.setState(state));
        Object.assign(this.state, state);
    }
    generateHTML(){
        this.DebugLog(this.tag + ': attach component');
        let div = document.createElement('div');
        div.style = 'display: flex; border: 1px solid black; border-radius: 5px; background-color: gray;';
        div.textContent = "Who is awesome: " + this.props.answer;
        this.root = div;
    }
    attach(){
        this.DebugLog(this.tag + ': attach component');
        if(this.parent && this.root){
            this.parent.appendChild(this.root); 
            this.attached = true;
        }
        return;
    }
    close(){
        this.DebugLog(this.tag + ': close component');
        return;
    }
    detach(){
        //console.log(this.tag + ': detach component');
        if(this.parent && this.root && this.attached){
            this.parent.removeChild(this.root);
            this.attached = false;
        }
        return;
    }  
    clearChildComponents(){
        this.childComponents.forEach(c=>{
            c.detach();
            c.destroy();
        });
        this.childComponents = [];
    }
    destroy(){
        this.childComponents.forEach(c=>{
            if(c.attached){
                c.detach();
            }
            c.destroy();
        });
        this.DebugLog(this.tag + ": destroy");
        Object.keys(this).forEach(k=>delete this[k]);
    }
    update(options = {}){
        //console.log(this.tag + ": updating. Options: ", options);
        if(options.state){
            this.setState(options.state);
        }
        if(options.props){
            this.setProps(options.props);
        }
        if(this.attached){
            //console.log('detaching', this.root, this.parent)
            this.detach();
            //console.log('detached', this)
        }
        this.generateHTML();
        this.childComponents.forEach(c=>{
            c.parent = this.root;
            c.update()
        });
        this.attach();
    }
    createEl(options) {
        let div = document.createElement(options.tag || 'div');
        div.className = options.className || '';
        if(options.attributes){
            options.attributes.forEach(a=>{
                let key = Object.keys(a)[0];
                div.setAttribute(key, a[key]);
            })
        }
        return div;
    } 
}