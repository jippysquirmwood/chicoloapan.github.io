class Component{
    constructor(state, props){
        this.state = state;
        this.props = props;
        this.tag = "ComponentBaseClass";
        console.log(this.tag + ': Created instance.');
    }
    render(){
        console.log('rendering')    
    }

}