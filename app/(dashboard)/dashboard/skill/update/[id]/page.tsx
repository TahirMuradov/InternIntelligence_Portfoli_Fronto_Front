import UpdateSkillForm from '@/components/dashboard/skill/UpdateSkillForm';
import React from 'react'

const page:React.FC<{ params: { id:string } }> = ({params:{id}}) => {
    const apiDomen = process.env.apiDomen;
  return (
   <UpdateSkillForm apiDomen={apiDomen}id={id}/>
  )
}

export default page