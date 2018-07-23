(function(events){
    /*
    workPacjagePlan: {title, status, docnumber}
    */
    events.on('CREATE_WPP', (workPackagePlan)=>{
        let wpp = new WorkPackagePlan({
            parent: workPackagePlan.parent,
            props: {},
            state: workPackagePlan.state,
            attachLocation: workPackagePlan.attachLocation || undefined
        });
        wpp.update();
    });
    class WorkPackagePlan extends Component{
        generateHTML(){
            if(!this.state.tbStatements)
                this.setState({tbStatements: []});
            //contains the entire WPP
            this.root = this.createEl({className: 'wpp-wrapper'}); 
            
            //Label above box
            let label = this.createEl({className: 'wpp-label'});
            label.innerText = 'WPP';

            //contains the title and doc number
            let titleContainer = this.createEl({className: 'wpp-title-container'});
            let title;
            let docNumber = this.createEl({className: 'wpp docnumber'});; 
            docNumber.textContent = this.state.docNumber;
            if(this.state.type == "new"){
                title = this.createEl({tag: 'input', className: 'wpp-title', attributes:[{type: "text"}, {placeholder:"Enter WPP name"}]});
                title.onchange = (e)=>{
                    let wpp = new WorkPackagePlan({
                        parent: this.parent,
                        props: {},
                        state: {
                            title: e.target.value,
                            tbStatements: this.state.tbStatements,
                            status: 'draft'
                        },
                        attachLocation: {
                            element: this.root,
                            relativeLocation: 'afterEnd'
                        }
                    })
                   // = this.createEl({tag: "input", className: 'wpp docnumber', attributes:[{type: "text"}, {placeholder:"Enter document number"}]});
                    wpp.update();
                }
            } else {
                title = this.createEl({className: 'wpp-title'});
                title.innerText = this.state.title;
            }            
            titleContainer.appendChild(title);
            titleContainer.appendChild(docNumber);

            //status box and text
            let status = this.createEl({className: `status ${this.state.status}`});
            status.classList.add(this.state.status);
            status.innerText = this.state.status.toUpperCase();
            titleContainer.appendChild(status);

            //taskBriefingStatements contains all TBS
            this.taskBriefingStatements = this.createEl({tag: 'ul',className: 'tbs-wrapper'});
            this.childComponents = [];

            if(this.state.tbStatements.length > 0){
                this.state.tbStatements.forEach((tbs)=>{
                    this.createTBS(tbs, 'beforeEnd');
                });
            }
            if(this.state.title){
                this.createTBS(undefined,'beforeEnd');
            }
        
            [label, titleContainer, this.taskBriefingStatements].forEach(el=>this.root.appendChild(el));
        }

        /*
        tbs: {title, status, docnumber}
        */
        createTBS(tbs, insertLocation){
            let li = this.createEl({tag: 'li', className: 'tbs-list-item tbs-expand'});
            let wrapper = this.createEl({className: 'tbs-wrapper'});
            let label = this.createEl({className: 'tbs-label'});
            let title;
            let docNumber = this.createEl({className: 'tbs docnumber'});
            let lines = this.createEl({className: 'tbs-line'});
            let status;
            if(tbs){
                title = this.createEl({className: 'tbs-title'});
                title.textContent = tbs.title;
                status = this.createEl({className: `status ${tbs.status}`});
                status.textContent = tbs.status;
                docNumber.textContent = tbs.docNumber;
            } else {
                title = this.createEl({tag: 'input', className: 'tbs-title', attributes: [{type: 'text'}, {placeholder: 'Enter a TBS title'}]});
                docNumber = this.createEl({tag: 'input', className: 'tbs docnumber new', attributes: [{type: 'text'}, {placeholder: 'Enter a document number'}]});
                status = this.createEl({className: `status draft gone`});
                status.textContent = 'add';
                title.onchange = (e)=>{
                    let newTbs = {title: e.target.value, status: 'draft', docNumber: 'undefined'};
                    let statements = this.state.tbStatements;
                    statements.push(newTbs);
                    this.setState({tbStatements:statements});
                    this.taskBriefingStatements.removeChild(li);
                    this.createTBS(newTbs, 'beforeEnd')
                    this.taskBriefingStatements.appendChild(li);
                    e.target.value = '';
                }
                docNumber.textContent = '';
            }
            li.appendChild(wrapper);
            wrapper.appendChild(label);
            wrapper.appendChild(status);
            wrapper.appendChild(title);
            wrapper.appendChild(docNumber);
            wrapper.appendChild(lines);
            this.taskBriefingStatements.insertAdjacentElement(insertLocation,li);
        }
    }
    
})(events);