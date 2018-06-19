let Utilities = (function(){

    function createCsvFromArray(headings, array){
        let content = "data:text/csv;charset=utf-8,";
        content += headings.join(",") + "\r\n";
        array.forEach(row=>{
            Object.keys(row).forEach(key=>{
                let r = '';
                let c, i = 0;
                cell = row[key] || '';
                while((c = cell[i++]) != undefined)
                    r+= c == ',' ? '' : c;
                content += r + ',';
            })
            content += "\r\n";
        });
        return content;
    }
    
    function createDiv(className) {
        let div = document.createElement('div');
        div.className = className;
        return div;
    }

    function strcon(string, chars){
        for(let i = 0; i < chars.length; i++){
            for(let j = 0; j < string.length; j++){
                if(chars[i] == string[j]) 
                    return true;
            }
        }
        return false;
    }
    function findNextParentElementWithClassName(element, className) {
        while (element != null && element.tagName != undefined) {
            if (element.classList.contains(className))
                return element;
            element = element.parentElement;
        }
        return null;
    }
    return {
        createCsvFromArray,
        createDiv,
        strcon,
        findNextParentElementWithClassName
    }
})();