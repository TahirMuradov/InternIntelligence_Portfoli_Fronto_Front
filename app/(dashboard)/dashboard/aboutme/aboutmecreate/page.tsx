import CreateAboutMeForm from '@/components/dashboard/aboutMe/CreateAboutMeForm';
import React from 'react'

const page = () => {
    const apiDomen = process.env.apiDomen;
  return (
    <CreateAboutMeForm apiDomen={apiDomen}/>
  )
}

export default page