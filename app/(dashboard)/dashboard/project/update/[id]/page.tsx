import UpdateProjectForm from '@/components/dashboard/project/UpdateProjectForm'
import React from 'react'

const page:React.FC<{ params: {id:string } }> = ({params:{id}}) => {
    const apiDomen = process.env.apiDomen;

  return (
   <UpdateProjectForm id={id} apiDomen={apiDomen}/>
  )
}

export default page