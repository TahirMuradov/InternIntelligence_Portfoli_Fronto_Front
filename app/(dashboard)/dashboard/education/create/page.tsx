import AddEducationForm from '@/components/dashboard/education/AddEducationForm';
import React from 'react'

const page :React.FC= () => {
    const apiDomen = process.env.apiDomen;
  return (
  <AddEducationForm apiDomen={apiDomen}/>
  )
}

export default page