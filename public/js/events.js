let events = (function () {
    let events = {};
    function on(eventName, fn) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    };
    function remove(eventName, fn) {
        if (!events[eventName]) return null;
        for (let i = events[eventName].length - 1; i >= 0; i--) {
            if (events[eventName][i] == fn)
                events[eventName].splice(i, 1);
        }
    };
    function emit(eventName, data) {
        if (!events[eventName]){
            console.error("Error: no listeners for event. \n" + eventName + "\n"+JSON.stringify(data));
            return false;
        }
        events[eventName].forEach((fn) => {
            fn(data);
        })
    };
    on('MODULE_LOADED', (data) => {
        console.log('MODULE_LOADED: ' + data);
    });
    emit('MODULE_LOADED', 'Events system loaded')
    return {
        on,
        remove,
        emit
    };
})();
