import ProjectTable from "@/components/dashboard/project/ProjectTable"

const page :React.FC<{ params: {page:number } }>= ({params:{page}}) => {
  const apiDomen = process.env.apiDomen;
  if (page<1) {
    page=1
  }
  return (
    <ProjectTable apiDomen={apiDomen} page={page}/>
  )
}

export default page