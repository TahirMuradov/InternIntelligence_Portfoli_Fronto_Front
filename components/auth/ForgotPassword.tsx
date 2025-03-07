"use client"
import Link from "next/link"
import forgot from "@/public/forgoutPassword.png"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import Result from "@/types/ApiResultType"

const ForgotPassword:React.FC<{apiDomen:string|undefined}>=({apiDomen})=>{
    const route=useRouter();
  async  function Submit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email=form.get("email");
        if (email===null||email===undefined) {
            route.refresh();
        }
      const response:Response=await  fetch(`${apiDomen}api/Auth/SendEmailTokenForForgotPassword?Email=${email}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
                    
            },
            cache: "no-store",
            method: "PUT",
          });
          if (response.ok) {
            Swal.fire({
              title: 'Info',
              html: `Confirmation link has been sent to your email.`,
             icon: 'info',
             confirmButtonText: 'Ok!',
             allowEscapeKey:false,
             allowOutsideClick:false
                           }).then(x=>{
                            if (x.isConfirmed) {
                              route.push("/auth/login")
                            }
                           })
          }
       
          if (!response.ok) {
        
            let errors = "<ul>";
            if (response.status==401) {
              errors += `<li>UnAuthorized</li>`;
            }
                if (response.status!==200){
                  const result:Result<null>=await response.json();
                 
                 
                    if (Array.isArray(result.messages)) {
                    
                        result.messages.forEach((message:string)=> {
                            errors += `<li>${message}</li>`;
                        });
                    } else if (result.message) {
                     
                        errors += `<li>${result.message}</li>`;
                    }
                    errors += "</ul>";
               
                
                }
                Swal.fire({
                  title: 'Error',
                  html: `${errors}`,
                 icon: 'error',
                 confirmButtonText: 'Ok!',
                 allowEscapeKey:false,
                 allowOutsideClick:false
                               }).then(x=>{
                                if (x.isConfirmed) {
                                  route.refresh()
                                }
                               })
          }
      }
    
    return(  <div className="w-4/5 mx-auto my-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
         <div className="flex flex-wrap items-center">
           <div className="hidden w-full xl:block xl:w-1/2">
             <div className="px-26 py-17.5 text-center">
               {/* <Link className="mb-5.5 inline-block" href="/">
           
                 <Image
                   className=""
                   src={logo}
                   alt="Logo"
                   width={176}
                   height={32}
                 />
               </Link> */}
 
               <p className="2xl:px-20">
             
               </p>
 
               <span className="mt-15 relative inline-block w-full">
                <Image width={640} height={480} src={forgot} alt="forgotpassword" />
               </span>
             </div>
           </div>
 
           <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
             <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
             
               <h2 className="mb-9 text-2xl font-bold text-black  sm:text-title-xl2">
               Forgot Password
               </h2>
 
               <form onSubmit={(e)=>Submit(e)}>
                 <div className="mb-4">
                   <label className="mb-2.5 block font-medium text-black">
                     Email
                   </label>
                   <div className="relative">
                     <input
                       type="email"
                       name="email"
                       placeholder="Enter your email"
                       className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                     />
 
                     <span className="absolute right-4 top-4">
                       <svg
                         className="fill-current"
                         width="22"
                         height="22"
                         viewBox="0 0 22 22"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                       >
                         <g opacity="0.5">
                           <path
                             d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                             fill=""
                           />
                         </g>
                       </svg>
                     </span>
                   </div>
                 </div>
 
               
 
                 <div className="mb-5">
                   <input
                 
                     type="submit"
                     value="Send Email"
                     className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-black transition hover:bg-opacity-90"
                   />
                 </div>
 
 
                 <div className="mt-6 text-center text-black">
                   <p>
                   Do you want to log in?{" "}
                     <Link href="/auth/login" className="text-primary">
                    Sign in
                     </Link>
                   </p>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </div>
   </div>
    )
}
export default ForgotPassword;