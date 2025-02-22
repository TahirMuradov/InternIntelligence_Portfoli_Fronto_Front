import EducationTable from "@/components/dashboard/education/EducationTable"


export default async  function  page ({
    params,
  }: {
    params: Promise<{ page: number }>
  }){
let {page}=await params
if (page<1)page=1
    const apiDomen = process.env.apiDomen;
    return(
        <EducationTable page={page} apiDomen={apiDomen}/>
    )
}
