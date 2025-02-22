import UpdateSkillForm from '@/components/dashboard/skill/UpdateSkillForm';
import React from 'react'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}){
  const{id}=await params;
    const apiDomen = process.env.apiDomen;
  return (
   <UpdateSkillForm apiDomen={apiDomen}id={id}/>
  )
}

