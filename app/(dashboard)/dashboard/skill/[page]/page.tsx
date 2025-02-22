import SkillTable from '@/components/dashboard/skill/SkillTable'
import React from 'react'

const page:React.FC<{ params: {page:number } }> = ({params:{page}}) => {
    const apiDomen = process.env.apiDomen;
    return (
   <SkillTable apiDomen={apiDomen} page={page}/>
  )
}

export default page