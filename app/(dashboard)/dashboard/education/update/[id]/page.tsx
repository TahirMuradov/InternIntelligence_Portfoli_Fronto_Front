import UpdateEducationForm from '@/components/dashboard/education/UpdateEducation';
import React from 'react'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
    const apiDomen = process.env.apiDomen;
  return (
    <UpdateEducationForm apiDomen={apiDomen}id={id} key={1}/>
  )
}

