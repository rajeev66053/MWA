module.exports.addTwoNumbers=function(req,res){

    var firstNum=0;
    var num=0;
    var sum=0;

    if(req.query && req.query.num){
        num=parseFloat(req.query.num);
    }

    if(req.params.firstNum){
        firstNum=parseFloat(req.params.firstNum);
    }

    sum=firstNum+num;

    console.log("sum: "+sum);

    res.status(200).json({"sum :": sum});

};