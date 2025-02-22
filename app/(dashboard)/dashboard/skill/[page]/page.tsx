import SkillTable from '@/components/dashboard/skill/SkillTable'
import React from 'react'

export default async function Page({
  params,
}: {
  params: Promise<{ page:number}>
}) {
let{page}=await params;
if (page<1)
  page=1
    const apiDomen = process.env.apiDomen;
    return (
   <SkillTable apiDomen={apiDomen} page={page}/>
  )
}

