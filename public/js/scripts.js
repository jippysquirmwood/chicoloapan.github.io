(function(){

    //get profile pic
    promiseAjaxRequest('GET', '/auth/profile', {}).then((data)=>{
        console.log('test')
        if(data.success){
            document.querySelector('.user-profile-pic').src = data.imgSource;
            document.querySelector('.welcome-message').textContent = "Welcome back, " +  data.user.google.name;
        }
    }).catch(data=>{
        console.log(data)
    })


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


    //Temp add data
    
    events.emit("CREATE_WPP",
    {
        parent: this.document.querySelector('main'), 
        props: {}, 
        state: {type: 'new', status: "gone"}
    });
    
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

})();