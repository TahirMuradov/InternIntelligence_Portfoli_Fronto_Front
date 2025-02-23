"use client"

import Result from "@/types/ApiResultType"
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import Swal from "sweetalert2";
import { signOut, useSession } from "next-auth/react";
import Loader from "@/components/common/loader/Loader";
import GetEducationDetail from "@/types/EducationTypes/GetEducationDetail";


const UpdateEducationForm:React.FC<{id:string,apiDomen:string|undefined}>=({
    apiDomen,
    id
})=>{
const [education,SetEducation]=useState<Result<GetEducationDetail>|null>(null);
    const[loader,SetLoader]=useState<boolean>(false)
    const router=useRouter();
    const sessions=useSession();
    useEffect(()=>{
        fetch(`${apiDomen}api/Education/GetEducationById?id=${id}`, {
          method: 'GET',
          headers: {
          'Authorization':`Bearer ${sessions.data?.user.token}`
          }
      })
      .then(response =>{ 
        
  
            if (response.status==401) {
                Swal.fire({
                    title: 'Authorization Error!',
                    text: 'Your session has expired. Please log in again.',
                    icon: 'info',
                    confirmButtonText: 'Login',
                     allowEscapeKey:false,
                     allowOutsideClick:false                     
                }).then(res => {
                    if (res.isConfirmed) {
                        signOut(); 
                        SetLoader(false);
                                        }
                });
                return ;
            }else if(!response.ok){
                Swal.fire({
                    title: 'Error!',
                    text: 'An unexpected error occurred!',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                }).then(x=>{
                  if (x.isConfirmed) {
                     SetLoader(false)      
                 signOut()
                    }
                });
                return ;
            }
     
        
        return  response.json()})
      .then(result => {
        if (result) {
            
            if (result.isSuccess) {
          SetEducation(result)
          
       
         
            } else {
              let errors = "<ul>";
              if (Array.isArray(result.messages)) {
              
                  result.messages.forEach((message:string)=> {
                      errors += `<li>${message}</li>`;
                  });
              } else if (result.message) {
               
                  errors += `<li>${result.message}</li>`;
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
              allowEscapeKey:false,
              allowOutsideClick:false,

          });
      });
      },[])

      function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault();
       SetLoader(true)
       const form = new FormData(e.currentTarget);        
       fetch(`${apiDomen}api/Education/UpdateEducation`, {
           method:'PUT',
           headers: {
            'Content-Type': 'application/json',
                          'Authorization':`Bearer ${sessions.data?.user.token}`
            },
           body:JSON.stringify({
            id:education?.data.id,
  educationName: form.get("educationName"),
  startDate: form.get("startDate"),
  endDate: form.get("endDate"),
  description:form.get("description")
           }) ,
       })
       .then(response => {
        if (response.status==401) {
            Swal.fire({
                title: 'Authorization Error!',
                text: 'Your session has expired. Please log in again.',
                icon: 'info',
                confirmButtonText: 'Login',
                 allowEscapeKey:false,
                 allowOutsideClick:false                     
            }).then(res => {
                if (res.isConfirmed) {
                    signOut(); 
                    SetLoader(false);
                    router.refresh();
                }
            });
            return;
        }
        return response.json()
    })
       .then(result => {
        if (result) {
            
            if (result.isSuccess) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Education updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                    allowOutsideClick:false,
                    allowEscapeKey:false
                }).then((res) => {
                    if (res.isConfirmed) {
                      SetLoader(false)                
                router.push("/dashboard/education/1")
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
               allowEscapeKey:false,
               allowOutsideClick:false
           }).then(x=>{
            if (x.isConfirmed) {
                
                SetLoader(false)
             
                router.refresh();
            }
           });
       });
      
   }
   if (loader || education?.data==null) {
       return(<Loader/>)
   }
   return(<form id="addPaymentgMethod" onSubmit={HandleSubmit}>
    <div className="grid grid-cols-4 gap-6 mb-6">
        {/* Full Name */}
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Education Name:
            </label>
            <input
                placeholder="Education Name"
                type="text"
                name="educationName"
                defaultValue={education?.data.educationName || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>

        {/* Description */}
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Education Description:
            </label>
            <input
                placeholder="Description"
                type="text"
                name="description"
                defaultValue={education?.data.description || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>

        {/* Start Date */}
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Start Date:
            </label>
            <input
                type="date"
                name="startDate"
                defaultValue={Date.parse(`${education?.data.startDate}`) || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>
   {/* End Date */}
   <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
               End Date:
            </label>
            <input
                type="date"
                name="endDate"
                defaultValue={Date.parse(`${education?.data.endDate}`) || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>
      
    </div>

    <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                   focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                   text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Submit
    </button>
</form>
)
}


export default UpdateEducationForm