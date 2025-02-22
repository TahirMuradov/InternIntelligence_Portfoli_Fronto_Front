import ContactmeTable from "@/components/dashboard/contactme/ContactmeTable";

export default async function page ({
    params,
  }: {
    params: Promise<{ page: number }>
  }){

    let {page}=await params
if (page<1)page=1
    const apiDomen = process.env.apiDomen;
    return(<ContactmeTable apiDomen={apiDomen}page={page}/>)
  }