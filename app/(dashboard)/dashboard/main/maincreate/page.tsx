import AddMainForm from "../../../../../components/dashboard/main/AddMainForm";



const page = () => {
    const apiDomen = process.env.apiDomen;
  return (
    <AddMainForm apiDomen={apiDomen}/>
  )
}

export default page