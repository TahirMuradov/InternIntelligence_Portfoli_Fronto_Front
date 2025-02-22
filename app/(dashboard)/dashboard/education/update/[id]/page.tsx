import UpdateEducationForm from '@/components/dashboard/education/UpdateEducation';
import React from 'react'

const page:React.FC<{ params: {id:string } }> = ({params:{id}}) => {
    const apiDomen = process.env.apiDomen;
  return (
    <UpdateEducationForm apiDomen={apiDomen}id={id} key={1}/>
  )
}

export default page