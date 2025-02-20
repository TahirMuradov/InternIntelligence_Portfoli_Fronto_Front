import UpdateMainForm from "@/components/dashboard/main/UpdateMainForm";


const page = () => {
    const apiDomen = process.env.apiDomen;
  return (
    <UpdateMainForm apiDomen={apiDomen}/>
  )
}

export default page