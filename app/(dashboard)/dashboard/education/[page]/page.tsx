import EducationTable from '@/components/dashboard/education/EducationTable'
import React from 'react'

const page:React.FC<{ params: {page:number } }> = ({params:{page}}) => {
    const apiDomen = process.env.apiDomen;
    if (page<1) {
        page=1
    }
    return (
    <EducationTable page={page} apiDomen={apiDomen}/>
  )
}

export default page