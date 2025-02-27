"use client";
import React, {useState, } from "react";
import user from "../../../public/dashboard/product-1.jpg"
import Image from "next/image";
import Link from "next/link";
import WebIcon from '@mui/icons-material/Web';
import { signOut, useSession } from "next-auth/react";


export default function DefaultLayout({
  children
}: {
  children: React.ReactNode
}) {
   
   const session=useSession();
   const [isUserDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const [barsClick,setbarsClick]=useState<boolean>(false)
  const [main,setMain]=useState<boolean>(false)
  const [aboutme,setAboutMe]=useState<boolean>(false)
  const[education,SetEducation]=useState<boolean>(false);
  const[project,SetProject]=useState<boolean>(false);
  const[skill,SetSkill]=useState<boolean>(false);
 


  
  return (
    <>
    

<nav className="fixed top-0 z-50 w-full bg-blue border-b border-gray-200  dark:text-slate-400 dark:bg-slate-800">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start rtl:justify-end">
        <button onClick={()=>setbarsClick(!barsClick)}  type="button" className="inline-flex items-center p-2 text-sm text-black rounded-lg sm:hidden  dark:text-slate-400 dark:bg-slate-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a href="" className="flex ms-2 md:me-24">
         Logo

        </a>
      </div>
      <div className="flex items-center">
          <div className="flex items-center ms-3">
            <div>
              <button onClick={()=>setUserDropdownOpen(!isUserDropdownOpen)} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span className="sr-only">Open user menu</span>
                <Image className="w-8 h-8 rounded-full" src={user} alt="user photo"/>
              </button>
            </div>
            <div
  className={`z-50 transform transition-opacity ${
    isUserDropdownOpen ? "block opacity-100" : "opacity-0 hidden"
  } ease-in-out duration-500 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow  dark:text-slate-400 dark:bg-slate-800`}
  id="dropdown-user"
  style={{
    position: "absolute",
    right: "20px",
    top: "20px",
  }}
>
              <div className="px-4 py-3 dark:text-slate-400 dark:bg-slate-800" role="none">
                <span className="text-sm block" role="none">
                {session.data?.user.username}
                </span>
                {session.data?.user.email}
                 </div>
              <ul className="py-1" role="none">
              
              
                <li>
                  <button onClick={()=>signOut()} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</button>
                </li>
                <li>
                  <Link  className="block text-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"  href={"/"}>Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>

<aside id="logo-sidebar" className={` ${barsClick?"":"-translate-x-full"} fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform   bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
    
<li>

<button onClick={()=>setMain(!main)} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
<WebIcon/>


         <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Main</span>
         <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
         </svg>
   </button>
   <ul id="dropdown-example" className={`${main?"":"hidden"} py-2 space-y-2`}>
         <li>
            <Link href="/dashboard/main" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Main Table</Link>
         </li>
         <li>
            <Link href="/dashboard/main/maincreate" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Main Create</Link>
         </li>
      
   </ul>

</li>
<li>

<button onClick={()=>setAboutMe(!aboutme)} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
<WebIcon/>


         <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">AboutMe</span>
         <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
         </svg>
   </button>
   <ul id="dropdown-example" className={`${aboutme?"":"hidden"} py-2 space-y-2`}>
         <li>
            <Link href="/dashboard/aboutme" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">AboutMe Table</Link>
         </li>
         <li>
            <Link href="/dashboard/aboutme/aboutmecreate" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Aboutme Create</Link>
         </li>
      
   </ul>

</li>
<li>

<button onClick={()=>SetEducation(!education)} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
<WebIcon/>


         <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Education</span>
         <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
         </svg>
   </button>
   <ul id="dropdown-example" className={`${education?"":"hidden"} py-2 space-y-2`}>
         <li>
            <Link href="/dashboard/education/1" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Education Table</Link>
         </li>
         <li>
            <Link href="/dashboard/education/create" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Education Create</Link>
         </li>
      
   </ul>

</li>
<li>

<button onClick={()=>SetProject(!project)} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
<WebIcon/>


         <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Project</span>
         <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
         </svg>
   </button>
   <ul id="dropdown-example" className={`${project?"":"hidden"} py-2 space-y-2`}>
         <li>
            <Link href="/dashboard/project/1" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Project Table</Link>
         </li>
         <li>
            <Link href="/dashboard/project/create" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Project Create</Link>
         </li>
      
   </ul>

</li>
<li>

<button onClick={()=>SetSkill(!skill)} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
<WebIcon/>


         <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Skill</span>
         <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
         </svg>
   </button>
   <ul id="dropdown-example" className={`${skill?"":"hidden"} py-2 space-y-2`}>
         <li>
            <Link href="/dashboard/skill/1" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Skill Table</Link>
         </li>
         <li>
            <Link href="/dashboard/skill/create" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Skill Create</Link>
         </li>
      
   </ul>

</li>
         <li>
            <Link href="/dashboard/contactme/1" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
               {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full bg-red-600 text-white">{contactmeCount?.data}</span> */}
            </Link>
         </li>
    
        
      
      </ul>
   </div>
</aside>

<div onClick={()=>setbarsClick(false)} className="p-4 sm:ml-64">
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14  dark:text-slate-400 dark:bg-slate-800">
{children}
   </div>
</div>
</>
  );
}
