import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer.prompt([
    {message:"Type in your url", 
    name:"url",
},   
]).then((ans)=>{
    // console.log(ans);
    const url=ans.url;
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));
    fs.writeFile("saved_url.txt", url, (err)=>{
        console.log(err);
    });
}).catch((err)=>{
    console.log(err);
});
