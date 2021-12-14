angular.module("brands").factory("UserDataFactory",UserDataFactory);

function UserDataFactory($http){
    return {
        login:login
    }

    function login(user){
        return $http.post("/api/auth",user).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }    

    function failed(error){
        return error.status.statusText;
    }
}