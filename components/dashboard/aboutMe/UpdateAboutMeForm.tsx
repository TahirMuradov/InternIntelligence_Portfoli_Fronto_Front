"use client"

import Result from "@/types/ApiResultType"
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import Swal from "sweetalert2";
import { signOut, useSession } from "next-auth/react";
import GetAboutMeDetailDTO from "@/types/AboutMeTypes/GetAboutMeDetailDTO";
import Loader from "@/components/common/loader/Loader";


const UpdateAboutMeForm:React.FC<{apiDomen:string|undefined}>=({
    apiDomen,
    
})=>{
const [aboutMe,SetAboutMe]=useState<Result<GetAboutMeDetailDTO>|null>(null);
    const[loader,SetLoader]=useState<boolean>(false)
    const router=useRouter();
    const sessions=useSession();
    useEffect(()=>{
        SetLoader(true)
        fetch(`${apiDomen}api/Aboutme/GetAboutMeForTable`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
                         'Authorization':`Bearer ${sessions.data?.user.token}`
          }
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
           
            if(result.isSuccess){
                SetAboutMe(result)
                SetLoader(false)
            }
            if (!result.isSuccess) {
  
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
      },[])

      function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault();
       SetLoader(true)
       const form = new FormData(e.currentTarget);      
   
    form.append("id",`${aboutMe?.data.id}`)

   
       fetch(`${apiDomen}api/Aboutme/UpdateAboutMe`, {
           method:'PUT',
           headers: {
            
              'Authorization':`Bearer ${sessions.data?.user.token}`
            },
           body:form ,
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
                    text: 'About me create successfully!',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                    allowEscapeKey:false,
                    allowOutsideClick:false
                }).then((res) => {
                    if (res.isConfirmed) {
                      SetLoader(false)                
                router.push("/dashboard/aboutme")
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
   if (loader || aboutMe?.data==null) {
       return(<Loader/>)
   }
   return(<form id="addPaymentgMethod" onSubmit={HandleSubmit}>
    <div className="grid grid-cols-4 gap-6 mb-6">
        {/* Full Name */}
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Full Name:
            </label>
            <input
                placeholder="Full Name"
                type="text"
                name="FullName"
                defaultValue={aboutMe?.data.fullName || ""}
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
                AboutMe Description:
            </label>
            <input
                placeholder="AboutMe Description"
                type="text"
                name="Description"
                defaultValue={aboutMe?.data.description || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>

        {/* Birth Day */}
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Birth Day:
            </label>
            <input
                type="date"
                name="BirthDay"
                defaultValue={Date.parse(`${aboutMe?.data.birthDay}`) || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>

        {/* Nationality */}
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nationality:
            </label>
            <input
                placeholder="Nationality"
                type="text"
                name="Nationality"
                defaultValue={aboutMe?.data.nationality || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>

        {/* Address */}
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address:
            </label>
            <input
                placeholder="Address"
                type="text"
                name="Adress"
                defaultValue={aboutMe?.data.adress || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>

        {/* Phone Number */}
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number:
            </label>
            <input
                placeholder="Phone Number"
                type="text"
                name="PhoneNumber"
                defaultValue={aboutMe?.data.phoneNumber || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>

        {/* Email */}
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email:
            </label>
            <input
                placeholder="Email"
                type="email"
                name="Email"
                defaultValue={aboutMe?.data.email || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            />
        </div>

        {/* Photo Input (Accepts Only Images) */}
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Upload Photo:
            </label>
            <input
                type="file"
                name="Photo"
                accept="image/png, image/jpeg, image/jpg"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                          bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 
                          dark:border-gray-600 dark:placeholder-gray-400"
                required
            />
        </div>

        {/* CV Input (Accepts Only PDF) */}
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Upload CV (PDF):
            </label>
            <input
                type="file"
                name="Cv"
                accept=".pdf"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                          bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 
                          dark:border-gray-600 dark:placeholder-gray-400"
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


export default UpdateAboutMeForm