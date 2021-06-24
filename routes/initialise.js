var Branch_db=require("../models/branch");
var Alert_db=require("../models/alert");

function splitarray(pins){
    let separated=[];
    let p="";
    for(i=0;i<pins.length;i++){
    
        if(pins[i]>='0'&&pins[i]<='9'){
            p+=pins[i];
        }else if(pins[i]==','){
            if(p!='')
            separated.push(p);
            p="";
        }
    }
    if(p!='')
    separated.push(p);
    return separated;
}

function seed(data){
    data.forEach((store)=>{
        let Pincodes=splitarray(String(store['Pincode_Covered']));
        Pincodes.forEach((Pincode)=>{
            var newbr={...store
                    ,Pincode_Covered:Pincode};
            Branch_db.create(newbr,function(err,new_br){
                if(err)
                console.log(err);
                else
                console.log(new_br);
            })
        })
     })
}
 
function alert(data){
    data.forEach((store)=>{
        var newi={
            Branch_Name:store['Branch_Name'],
        }
        Alert_db.create(newi,function(err,newi){
            if(err)
            console.log(err);
            else{
            console.log(newi);
            }
        })
    })
}
module.exports = {
    seed
};
