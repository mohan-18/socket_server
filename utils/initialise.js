var Branch_db=require("../models/branch");

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
        let str=String(store['Branch_Name']);
        let lower_branch=str.toLowerCase();
        Pincodes.forEach((Pincode)=>{
            var newbr={...store
                    ,Branch_Name:lower_branch
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

module.exports = {
    seed
};
