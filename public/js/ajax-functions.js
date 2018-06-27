var appURL = window.location.origin;

var ajaxFunctions = {
    ready: function ready(fn){
        if(typeof fn !== 'function'){
            return;
        }

        if(document.readyState === 'complete'){
            return fn();
        }

        document.addEventListener('DOMContentLoaded', fn, false);
    },

    ajaxRequest: function ajaxRequest(method, url, callback, data){
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
                callback(xmlhttp.response);
            } else {
                // console.log(data);
            }
        };

        xmlhttp.open(method, url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(data);
    }
}
function makeAjaxRequest(method, url, postData, callback){
    console.error("Deprecated; use the promiseAjaxRequest instead.");
    console.log(url, postData)
    return new Promise((resolve, reject)=>{
        let parsedPostData = null;
            try{
                parsedPostData = JSON.stringify(postData);
            } catch (e){
                reject({success: false, error:'error parsing post data: '+e});
            }
            
            console.log('postData', method, url)
          ajaxFunctions.ready(
              ajaxFunctions.ajaxRequest(
                method, 
                url, 
                function(data){
                  var parsed = null;
                  try {
                      parsed = JSON.parse(data);
                  } catch (e){
                      reject({success: false, error:'error parsing response data: '+e});
                  }
                  resolve(parsed);
                }, 
                parsedPostData
            )
          );    
    })
    .then(function(result){
        callback(result);
        return result;
    })
    .catch(function(result){
        console.log('rejected', result)
        callback(result);
        return result;
    });
  
}

function promiseAjaxRequest(method, url, postData){
    return new Promise((resolve, reject)=>{
        let parsedPostData = null;
            try{
                parsedPostData = JSON.stringify(postData);
            } catch (e){
                reject({success: false, error:'error parsing post data: '+e});
            }
            
            console.log('postData', method, url)
          ajaxFunctions.ready(
              ajaxFunctions.ajaxRequest(
                method, 
                url, 
                function(data){
                  var parsed = null;
                  try {
                      parsed = JSON.parse(data);
                  } catch (e){
                      reject({success: false, error:'error parsing response data: '+e, data});
                  }
                  resolve(parsed);
                }, 
                parsedPostData
            )
          );    
    })
    .catch(function(result){
        console.log('rejected', result)
        return result;
    });
  
}