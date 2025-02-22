import AddProjectForm from '@/components/dashboard/project/AddProjectForm';
import React from 'react'

const page:React.FC = () => {
    const apiDomen = process.env.apiDomen;
  return (
    <AddProjectForm apiDomen={apiDomen}/>
  )
}

export default page