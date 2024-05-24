import { useState } from "react";


export default function Myfile()
{
    const [file,setFile]=useState(null);
 
  
  
  
  
  
    const handleChange = (e) =>
        {
            setFile(e.target.files[0]);
        };
   
    const handleUpload = (e) =>
        {
            if(!file){
                console.log("No file choosen");
                return;
            }
            const fd=new FormData();
            fd.append('file',file);
           
        }

   
   
   
   
   
   
   
   
   
    return(
        <><div>Files</div>
        <div>
            <div>
                <input  onChange={handleChange} type="file" />
                <button onclick={handleUpload}>Upload</button>
            </div>
            
        </div></>
    );
}