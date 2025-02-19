import AboutMeCreate from '@/components/dashboard/AboutMe/AboutMeCreate';
import React from 'react'

const page = () => {
    const apiDomen = process.env.apiDomen;
  return (
    <AboutMeCreate apiDomen={apiDomen}/>
  )
}

export default page