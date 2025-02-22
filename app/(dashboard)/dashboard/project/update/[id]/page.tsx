import UpdateProjectForm from '@/components/dashboard/project/UpdateProjectForm'
import React from 'react'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
const{id}=await params;
    const apiDomen = process.env.apiDomen;

  return (
   <UpdateProjectForm id={id} apiDomen={apiDomen}/>
  )
}

