import MainTable from '@/components/dashboard/main/MainTable';
import React from 'react'

const page = () => {
    const apiDomen = process.env.apiDomen;
  return (
    <MainTable apiDomen={apiDomen}/>
  )
}

export default page