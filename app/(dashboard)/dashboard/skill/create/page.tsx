import AddSkillForm from '@/components/dashboard/skill/AddSkillForm';
import React from 'react'

const page:React.FC = () => {
    const apiDomen = process.env.apiDomen;
  return (
    <AddSkillForm apiDomen={apiDomen}/>
  )
}

export default page