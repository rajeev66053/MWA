
const child_process=require("child_process");
console.log("1.start");
child_process.spawn("node",["./computation/_fibonacci"],{stdio:"inherit"});
console.log("2.End");