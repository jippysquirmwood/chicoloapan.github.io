// @ts-check
(function(events){
    /*
    workPacjagePlan: {title, status, docnumber}
    */
    events.on('CREATE_WPP', (workPackagePlan)=>{
        let wpp = new WorkPackagePlan({
            parent: workPackagePlan.parent,
            props: {},
            state: workPackagePlan.state
        });
        wpp.update();
    });
    class WorkPackagePlan extends Component{
        generateHTML(){
            //contains the entire WPP
            this.root = this.createEl({className: 'wpp-wrapper'}); 
            
            //Label above box
            let label = this.createEl({className: 'wpp-label'});
            label.innerText = 'WPP';

            //contains the title and doc number
            let titleContainer = this.createEl({className: 'wpp-title-container'});
            let title = this.createEl({className: 'wpp-title'});
            title.innerText = this.state.title;
            let docNumber = this.createEl({className: 'wpp docnumber'});
            docNumber.textContent = this.state.docNumber;
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
            console.log(this.state.tbStatements)
            this.state.tbStatements.forEach((tbs)=>{
                this.createTBS(tbs);
            });

            //append all elements to wpp-wrapper
            [label, titleContainer, this.taskBriefingStatements].forEach(el=>this.root.appendChild(el));
        }

        /*
        tbs: {title, status, docnumber}
        */
        createTBS(tbs){
            console.log(tbs)
            let li = this.createEl({tag: 'li', className: 'tbs-list-item'});
            let wrapper = this.createEl({className: 'tbs-wrapper'});
            let label = this.createEl({className: 'tbs-label'});
            let title = this.createEl({className: 'tbs-title'});
            title.textContent = tbs.title;
            let status = this.createEl({className: `status ${tbs.status}`});
            status.textContent = tbs.status;
            let docNumber = this.createEl({className: 'tbs docnumber'});
            docNumber.textContent = tbs.docNumber;
            let lines = this.createEl({className: 'tbs-line'});
            li.appendChild(wrapper);
            wrapper.appendChild(label);
            wrapper.appendChild(title);
            wrapper.appendChild(status);
            wrapper.appendChild(docNumber);
            wrapper.appendChild(lines);
            this.taskBriefingStatements.appendChild(li);
        }
    }
    class TaskBriefingStatement extends Component{

    }
    //Temp add data
    events.emit("CREATE_WPP",
    {
        parent: this.document.querySelector('main'), 
        props: {}, 
        state: {
            title: "Tank installation", 
            docNumber: "100-1234-WPP-CC-0005", 
            status: "approved",
            tbStatements: [
                {
                    title: "Site setup",
                    status: "approved",
                    docNumber: "100-1234-TBS-CC-0001",
                },
                {
                    title: "Concrete breakout",
                    status: "comment",
                    docNumber: "100-1234-TBS-CC-0002",
                },
                {
                    title: "Excavate to foundation",
                    status: "draft",
                    docNumber: "100-1234-TBS-CC-0003",
                }

            ]
        }
    })

})(events);