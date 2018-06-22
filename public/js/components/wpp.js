
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

            //shring and exand tbs list
            // this.expanded = false;
            // let expand = this.createEl({className: 'tbs-button-expand'});
            // expand.textContent = '+';
            // expand.onclick = ()=>{
            //     console.log('click')
            //     let tbsNodes = this.taskBriefingStatements.children;
            //     for(let i = 0; i < tbsNodes.length; i++){
            //         if(this.expanded == true){
            //             tbsNodes[i].classList.remove('tbs-expand');
            //             expand.textContent = '+';
            //         } else {
            //             tbsNodes[i].classList.add('tbs-expand');
            //             expand.textContent = '-';
            //         }
            //     }
                
            //     this.expanded = !this.expanded;
            // };
            // this.taskBriefingStatements.appendChild(expand);

            //append all elements to wpp-wrapper
            [label, titleContainer, this.taskBriefingStatements].forEach(el=>this.root.appendChild(el));
        }

        /*
        tbs: {title, status, docnumber}
        */
        createTBS(tbs){
            console.log(tbs)
            let li = this.createEl({tag: 'li', className: 'tbs-list-item tbs-expand'});
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
            wrapper.appendChild(status);
            wrapper.appendChild(title);
            wrapper.appendChild(docNumber);
            wrapper.appendChild(lines);
            this.taskBriefingStatements.appendChild(li);
        }
    }
    //Temp add data
    
    events.emit("CREATE_WPP",
    {
        parent: this.document.querySelector('main'), 
        props: {}, 
        state: {
            title: "Demoliton and Excavation", 
            docNumber: "100-1234-WPP-CC-0002", 
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
    
    events.emit("CREATE_WPP",
    {
        parent: this.document.querySelector('main'), 
        props: {}, 
        state: {
            title: "Concrete Slab Installation", 
            docNumber: "100-1234-WPP-CC-0003", 
            status: "approved",
            tbStatements: [
                {
                    title: "Site setup",
                    status: "approved",
                    docNumber: "100-1234-TBS-CC-0001",
                },
                {
                    title: "Foundation Preparation",
                    status: "approved",
                    docNumber: "100-1234-TBS-CC-0004",
                },
                {
                    title: "Soil Testing",
                    status: "draft",
                    docNumber: "100-1234-TBS-CC-0005",
                },
                {
                    title: "Concrete Reinforcement",
                    status: "draft",
                    docNumber: "100-1234-TBS-CC-0006",
                },
                {
                    title: "Formwork and Strip",
                    status: "draft",
                    docNumber: "100-1234-TBS-CC-0007",
                },
                {
                    title: "Concrete Pour and Cure",
                    status: "draft",
                    docNumber: "100-1234-TBS-CC-0008",
                }

            ]
        }
    })
    events.emit("CREATE_WPP",
    {
        parent: this.document.querySelector('main'), 
        props: {}, 
        state: {
            title: "Tank Installation", 
            docNumber: "100-1234-WPP-CC-0004", 
            status: "approved",
            tbStatements: [
                {
                    title: "Site setup",
                    status: "approved",
                    docNumber: "100-1234-TBS-CC-0001",
                },
                {
                    title: "Load and unload tank sections",
                    status: "comment",
                    docNumber: "100-1234-TBS-CC-0009",
                },
                {
                    title: "Tank Install at Ground Level",
                    status: "draft",
                    docNumber: "100-1234-TBS-CC-0010",
                },
                {
                    title: "Tank Install at Height",
                    status: "draft",
                    docNumber: "100-1234-TBS-CC-0010",
                }

            ]
        }
    })
})(events);