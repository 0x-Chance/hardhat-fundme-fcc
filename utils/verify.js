const {run} = require("hardhat");

const verify = async (contractAddress, yarn ) =>{
    console.log("Verifying Contract.......");
    try{
        await run("verify:verify", {
            adress: contractAddress,
            constructorArguments: args,

        })
    }catch (e) {
        if(e.message.toLowerCase().includes("already verified")) {
            console.log("already verified");

        }
        else{
            console.log(e);
        }
    }
}

module.exports = {verify};