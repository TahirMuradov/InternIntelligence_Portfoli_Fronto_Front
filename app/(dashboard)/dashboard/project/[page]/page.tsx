import ProjectTable from "@/components/dashboard/project/ProjectTable"

export default async function Page({
  params,
}: {
  params: Promise<{ page:number }>
})  {
let {page}=await params;
  const apiDomen = process.env.apiDomen;
  if (page<1) {
    page=1
  }
  return (
    <ProjectTable apiDomen={apiDomen} page={page}/>
  )
}

