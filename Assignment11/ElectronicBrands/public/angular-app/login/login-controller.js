angular.module("brands").controller("LoginController",LoginController);

function LoginController($window,$location,AuthFactory,UserDataFactory,jwtHelper){
    const vm=this;
    vm.loggedInUser="Name";

    vm.isActiveTab=function(url){
        const currentPath=$location.path().split("/")[1];
        if(url===currentPath?"active":"");
    };
    vm.isLoggedIn=function(){
        return AuthFactory.auth.isLoggedIn;
        // if(AuthFactory.auth.isLoggedIn){
        //     return true;
        // }else{
        //     return false;
        // }
    };

    vm.login=function(){
        if(vm.username && vm.password){
            const user={
                username:vm.username,
                password:vm.password
            };

            UserDataFactory.login(user).then(function(response){
                if(response && response.success){
                    $window.sessionStorage.token=response.token;
                    AuthFactory.auth.isLoggedIn=true;
                    //Read the payload of a token
                    const token=$window.sessionStorage.token;
                    const decodedToken=jwtHelper.decodeToken(token);
                    vm.loggedInUser=decodedToken.name;
                    vm.username="";
                    vm.password="";
                    $location.path("/");

                }

            }).catch(function(error){
                console.log(error);

            });


        }

    };

    vm.logout=function(){
        AuthFactory.auth.isLoggedIn=false;
        delete $window.sessionStorage.token;
        $location.path("/");

    };
}