import GetProjectForUI from '@/types/ProjectTypes/GetProjectForUI';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const DefaultContent=()=>{
  const projects = [
    {
      title: "Shoes Ecommerce",
      description:
        "NextJs 14, Next-Intl, NextAuth, TypeScript, TailwindCSS, MaterialUI, Redux Toolkit",
      link: "https://shoes-next-js.vercel.app/",
    },
    {
      title: "Shoes Ecommerce API",
      description:
        "API, N-Tier architecture, multilingual validation errors (FluentValidation), JWT Token, Authentication & Authorization",
    },
    {
      title: "Karl Fashion",
      description:
        "MVC, N-tier architecture, Add to Cart, Order PDF Generator, IdentityToken, Confirm Email, Forgot Password, Multilanguage, Order PDF via Email",
    },
    {
      title: "Karl-Fashion API",
      description:
        "AccessToken, RefreshToken, JWT Token, Hashing, FluentValidation, Multilanguage",
    },
    {
      title: "Aztu-Events",
      description:
        "MVC, N-tier architecture, IdentityToken, Confirm Email, Forgot Password, Multilanguage",
    },
    {
      title: "ZMT zmt.az",
      description: "MVC, N-tier architecture, IdentityToken, Confirm Email, Forgot Password",
    },
  ];
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
              projects.map((project, index) => (


            <div className="grid grid-cols-1 lg:grid-cols-5 grid-rows-2 pb-6" key={index}>
    <div className="title lg:col-span-2 lg:text-end">
        <h2 className='text-[20px] block'> {project.title} </h2>
        
     
    </div>
    <div className="dot lg:col-span-1 left-0 lg:block text-center relative">
    <div className='big'>
        <div className=''></div>
    </div>
    </div>
    <div className="content lg:col-span-2 text-white font-serif text-[14px]">
        <p className='w-1/2'>
        {project.link && (
  <a href={project.link} target="_blank" rel="noopener noreferrer">
    {project.link}
  </a>
)}<br/>
        {project.description}
            </p> 
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