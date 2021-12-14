angular.module("brands").factory("AuthFactory",AuthFactory);

function AuthFactory($window){    
    const auth={
        isLoggedIn:checkToken()  
    };

    function checkToken(){
        if($window.sessionStorage.token){
            return true;
        }else{
           return false;
        }
    }

    return {
        auth:auth
    };

}