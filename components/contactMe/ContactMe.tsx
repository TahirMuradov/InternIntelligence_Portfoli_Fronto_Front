"use client"
import { useState } from "react";
import Loader from "../common/loader/Loader";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";


 const ContactMe:React.FC=()=> {
  const apiDomen = process.env.NEXT_PUBLIC_API_DOMEN;
  const [focused, setFocused] = useState<{ [key: string]: boolean }>({});
  const[loader,SetLoader]=useState<boolean>(false)
  const router=useRouter();
  const handleFocus = (field: string) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setFocused((prev) => ({ ...prev, [field]: false }));
    }
  };
     function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault();
     SetLoader(true);
       const form = new FormData(e.currentTarget);       
  
       fetch(`${apiDomen}api/ContactMe/AddContactMe`, {
        headers:{
          'Content-Type': 'application/json',
        },
           method:'POST',
        
           body:JSON.stringify({
            'name':form.get("name"),
            'email':form.get("email"),
            'message':form.get("message")
           }) ,
       })
       .then(response => {
 
        
        return response.json()
    })
       .then(result => {
        if (result) {
            
            if (result.isSuccess) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Message was sent successfully!',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                    allowEscapeKey:false,
                    allowOutsideClick:false
                }).then((res) => {
                    if (res.isConfirmed) {
                      SetLoader(false)                
                
                    }
                });
            } else {
  
             let errors = "<ul>";
             if (Array.isArray(result.messages)) {
             
                 result.messages.forEach((message:string)=> {
                     errors += `<li>${message}</li>`;
                 });
             } else if (result.message) {
              
                 errors += `<li>${result.message}</li>`;
             }
             else if(result.errors){
                Object.keys(result.errors).forEach((key) => {
                    result.errors[key].forEach((message: string) => {
                                                errors += `<li>${message}</li>`;
                    });
                });
             }
             errors += "</ul>";
     
             Swal.fire({
                 title: 'Error!',
                 html: errors, 
                 icon: 'error',
                 confirmButtonText: 'Cool',
                 allowEscapeKey:false,
                 allowOutsideClick:false
             }).then(res => {
                 if (res.isConfirmed) {
                     SetLoader(false);
                     router.refresh();
                 }
             });
            }

        }

       })
       .catch(error => {
           Swal.fire({
               title: 'Error!',
               text: `An unexpected error occurred!${error}`,
               icon: 'error',
               confirmButtonText: 'Cool',
               allowEnterKey:false,
               allowOutsideClick:false
           }).then((x)=>{
            if(x.isConfirmed){

                SetLoader(false)
             
                router.refresh();
            }
           });
       });
      
   }
   if (loader) {
    return( 
  <div className="w-[100%] bg-[#111827]">
    <div className="w-[80%] mx-auto py-5 ">

<Loader/>
    </div>
  </div>  
  )
}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h2 className="text-3xl px-1 font-bold text-teal-400 mb-6">CONTACT ME</h2>
      <form className="w-full max-w-2xl" onSubmit={HandleSubmit} >
        <div className="flex flex-col md:flex-row gap-4">
          {["name", "email"].map((field) => (
            <div key={field} className="relative w-full">
              <label
                className={`absolute left-0 transition-all ${
                  focused[field]
                    ? "text-teal-400 text-xs -top-2"
                    : "text-gray-400 text-base top-3"
                }`}
              >
                {field.toUpperCase()} *
              </label>
              <input
              name={field === "email" ? "email" : "name"}
                type={field === "email" ? "email" : "text"}
                className="w-full border-b border-gray-600 bg-transparent outline-none py-2 text-white focus:border-teal-400 pt-5"
                onFocus={() => handleFocus(field)}
                onBlur={(e) => handleBlur(field, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 relative">
          <label
            className={`absolute left-0 transition-all ${
              focused["message"]
                ? "text-teal-400 text-xs -top-2"
                : "text-gray-400 text-base top-3"
            }`}
          >
            MESSAGE *
          </label>
          <textarea
            className="w-full border-b border-gray-600 bg-transparent outline-none py-2 text-white focus:border-teal-400 pt-5"
            rows={4}
            name="message"
            onFocus={() => handleFocus("message")}
            onBlur={(e) => handleBlur("message", e.target.value)}
          ></textarea>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="border border-teal-400 text-teal-400 px-6 py-2 hover:bg-teal-400 hover:text-gray-900 transition-all"
          >
            SEND MESSAGE
          </button>
        </div>
      </form>
    </div>
  );
}
export default ContactMe;