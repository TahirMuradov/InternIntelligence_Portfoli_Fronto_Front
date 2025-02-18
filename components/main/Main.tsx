'use client';
import React from 'react'
import foto1 from "../../public/img/124434370.jpeg"
import style from "../main/main.module.scss"

const Main:React.FC = () => {

  return (
    <> 
    <style>
      
    </style>
<section style={{backgroundImage:`url(${foto1.src})`,backgroundRepeat:`no-repeat`,backgroundPosition:"center" ,backgroundSize:"cover"}} className={`${style.bg_mainColor} z-10 bg-no-repeat w-full h-[100vh]`}>
<div className={`${style.bg_mainColor} opacity-85 overlay w-full h-full flex justify-start items-center`}>
<div className='w-full'>
  <div  className='text-white ps-5'> 

<h1  className='text-[80px] lg:text-[120px]'>Hello</h1>
<h5 className='text-[35px] lg:text-[84px]'> My Name Is Tahir Muradov <br />
</h5>
<span className='text-[10px] lg:text-[25px]'>
  Full Stack Web Developer (c#)
  </span> 
  </div>
</div>
</div>

</section>
   </>
  )
}

export default Main