angular.module("brands").controller("RegisterController",RegisterController);

function RegisterController($http){
    const vm=this;
    vm.register=function(){
        const newUser={
            name:vm.name,
            username:vm.username,
            password:vm.password
        }

        if(!vm.username || !vm.password){
            vm.err="Please add username and password;"

        }else{
            if(vm.password!==vm.passwordRepeat){
                vm.err="Please make sure the password match";
            }else{
                $http.post("/api/users",newUser).then(function(result){
                    console.log(result);
                    vm.message="Successfully Registered, please login";
                    vm.err="";

                }).catch(function(error){
                    console.log(error);
                })
            }
        }

    }

}