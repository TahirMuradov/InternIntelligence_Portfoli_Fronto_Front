import GetProjectForUI from '@/types/ProjectTypes/GetProjectForUI';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const DefaultContent=()=>{
    return (
        <>
        <section id="workeducation" className='bg-[#22252C] w-full h-auto'>
    
      <div className="edu w-[80%] mx-auto py-28">
    <div id='title' className="w-full text-center">
        <h2>Projects</h2>
    </div>
    <div className="content w-full h-auto">
    <div className="cd-timeline w-full h-auto">
        <div className="cd-timeline-block w-full h-auto">
            <div className="grid grid-cols-1 text-center py-10">
    <div className="dot_start">
    <FontAwesomeIcon icon={faBuildingColumns} />
    </div>
            </div>
            <div className="grid lg:grid-cols-5 grid-rows-2 pb-6">
    <div className="title lg:col-span-2 lg:text-end">
        <h2 className='text-[20px] block'> Shoes Ecommerce </h2>
        
     
    </div>
    <div className="dot lg:col-span-1 hidden lg:block text-center relative">
    <div className='big'>
        <div className=''></div>
    </div>
    </div>
    <div className="content lg:col-span-2 text-white font-serif text-[14px]">
        <p className='w-1/2'>
       <a href="https://shoes-next-js.vercel.app/" target="_blank">https://shoes-next-js.vercel.app/</a>  <br />
        NextJs 14,Next-Intl,NextAuth,TypeScript,Tailwindcss,MaterialU,Redux Toolkit
            </p> 
    </div>
    </div>
    <div className="grid lg:grid-cols-5 grid-rows-2 pb-6">
    <div className="title lg:col-span-2 lg:text-end">
        <h2 className='text-[20px] block'> Shoes Ecommerce Api  </h2>
        
     
    </div>
    <div className="dot lg:col-span-1 hidden lg:block text-center relative">
    <div className='big'>
        <div className=''></div>
    </div>
    </div>
    <div className="content lg:col-span-2 text-white font-serif text-[14px]">
        <p className='w-1/2'>
        API, N-Tier architecture, supported multilanguage validate error
     messages with Fluent Validation , JWTToken, Authorize and Authenticate
            </p> 
    </div>
    </div>
    <div className="grid lg:grid-cols-5 grid-rows-2 pb-6">
    <div className="title lg:col-span-2 lg:text-end">
        <h2 className='text-[20px] block'>Karl Fashion</h2>
     
    </div>
    <div className="dot lg:col-span-1 hidden lg:block text-center relative">
    <div className='big'>
        <div className=''></div>
    </div>
    </div>
    <div className="content lg:col-span-2 text-white font-serif text-[14px]">
        <p className='w-1/2'>
          MVC, N-tier architecture,addtocart
          , Orderpdf Generator
           IdentityToken, Confirm Email,
          Forgot Password,Multilanguage
          ,Orderpdf Send Email
            </p> 
    </div>
    </div>
    <div className="grid lg:grid-cols-5 grid-rows-2 pb-6">
    <div className="title lg:col-span-2 lg:text-end">
        <h2 className='text-[20px] block'>Karl-Fashion Api</h2>
    
    </div>
    <div className="dot lg:col-span-1 hidden lg:block text-center relative">
    <div className='big'>
        <div className=''></div>
    </div>
    </div>
    <div className="content lg:col-span-2 text-white text-[14px]"> 
      <p className='w-1/2'>
    
    AccessToken, RefreshToken,
    Jwt token, Hashing,
    FluentValidation,
    Multilanguage
      </p>
    </div>
    </div>
    <div className="grid lg:grid-cols-5 grid-rows-2 pb-6">
    <div className="title lg:col-span-2 lg:text-end">
        <h2 className='text-[20px] block'>Aztu-Events</h2>
        
    </div>
    <div className="dot lg:col-span-1 hidden lg:block text-center relative">
    <div className='big'>
        <div className=''></div>
    </div>
    </div>
    <div className="content lg:col-span-2 text-white text-[14px]">
    <p className='w-1/2'>
          MVC, N-tier architecture,
          IdentityToken,ConfirmEmail,
          Forgot Password, Multilanguage
            </p> 
    </div>
    </div>
    <div className="grid lg:grid-cols-5 grid-rows-2  pb-6">
    <div className="title lg:col-span-2 lg:text-end">
        <h2 className='text-[20px] block'>ZMT zmt.az</h2>
        
    </div>
    <div className="dot lg:col-span-1 hidden lg:block text-center relative">
    <div className='big'>
        <div className=''></div>
    </div>
    </div>
    <div className="content lg:col-span-2 text-white text-[14px]">
    <p className='w-1/2'>
          MVC,N-tier architecture,
          IdentityToken,Confirm Email,
          Forgot Password
            </p> 
    </div>
    </div>
        </div>
    </div>
    </div>
      </div>
        </section>
        </>
      )
}
const Projects=async ({data}:{data:GetProjectForUI[]|null}) => {
   
            if (data) {
                return (
                    <>
                    <section id="workeducation" className='bg-[#22252C] w-full h-auto'>
                
                  <div className="edu w-[80%] mx-auto py-28">
                <div id='title' className="w-full text-center">
                    <h2>Projects</h2>
                </div>
                <div className="content w-full h-auto">
                <div className="cd-timeline w-full h-auto">
                    <div className="cd-timeline-block w-full h-auto">
                        <div className="grid grid-cols-1 text-center py-10">
                <div className="dot_start">
                <FontAwesomeIcon icon={faBuildingColumns} />
                </div>
                        </div>
                        {
                            data.map((project, index) => (

                        <div className="grid lg:grid-cols-5 grid-rows-2 pb-6" key={index}>
                <div className="title lg:col-span-2 lg:text-end">
                    <h2 className='text-[20px] block'> {project.name} </h2>
                    
                 
                </div>
                <div className="dot lg:col-span-1 hidden lg:block text-center relative">
                <div className='big'>
                    <div className=''></div>
                </div>
                </div>
                <div className="content lg:col-span-2 text-white font-serif text-[14px]">
               {
                project.description
               }
                </div>
                </div>
                            ))
                        }
            
                    </div>
                </div>
                </div>
                  </div>
                    </section>
                    </>
                  )
            }
          
 
       return<DefaultContent/>
    

}

export default Projects