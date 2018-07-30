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
            if(!this.state.taskBriefingStatements)
                this.setState({taskBriefingStatements: []});
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
                    let body = JSON.stringify({
                        title: e.target.value,
                        taskBriefingStatements: this.state.taskBriefingStatements,
                        status: 'draft',
                        docNumber: 'D/N: undefined'
                    });
                    console.log(body)
                    fetch('/auth/wpp', 
                        {
                            method: 'POST',
                            credentials: 'include',
                            headers:{
                                'Content-Type':'application/json; charset=utf-8'
                            },
                            body
                        }
                    ).then(response=>{
                        if(response.status != 200)
                            return console.error(response);                     
                        let wpp = new WorkPackagePlan({
                            parent: this.parent,
                            props: {},
                            state: {
                                title: e.target.value,
                                taskBriefingStatements: this.state.taskBriefingStatements.slice(),
                                status: 'draft'
                            },
                            attachLocation: {
                                element: this.root,
                                relativeLocation: 'afterEnd'
                            }
                        });
                        wpp.update();
                    }).catch(error=>{
                        console.error(error)
                    });
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

            if(this.state.taskBriefingStatements.length > 0){
                this.state.taskBriefingStatements.forEach((tbs)=>{
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
                // docNumber = this.createEl({tag: 'input', className: 'tbs docnumber new', attributes: [{type: 'text'}, {placeholder: 'Enter a document number'}]});
                docNumber.textContent = '';
                status = this.createEl({className: `status draft gone`});
                status.textContent = 'add';
                title.onchange = (e)=>{
                    console.log(this.state)
                    let tbsRequestBody = 
                    {    
                        wpp_id: this.state._id,
                        tbs: {
                            title: e.target.value, 
                            content: 'test',
                            status: 'draft', 
                            docNumber: 'D/N: undefined'
                        }
                    };
                    fetch('/auth/tbs', 
                        {
                            method: 'POST',
                            credentials: 'include',
                            headers:{
                                'Content-Type':'application/json; charset=utf-8'
                            },
                            body: JSON.stringify(tbsRequestBody)
                        }
                    ).then(response=>{
                        if(response.status != 200)
                            return console.error(response);  
                        response.json().then(console.log)
                        let statements = this.state.taskBriefingStatements;
                        statements.push(tbsRequestBody.tbs);
                        this.setState({taskBriefingStatements:statements});
                        this.taskBriefingStatements.removeChild(li);
                        this.createTBS(tbsRequestBody.tbs, 'beforeEnd')
                        this.taskBriefingStatements.appendChild(li);
                        e.target.value = '';                   
                        
                    }).catch(error=>{
                        console.error(error)
                    });
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