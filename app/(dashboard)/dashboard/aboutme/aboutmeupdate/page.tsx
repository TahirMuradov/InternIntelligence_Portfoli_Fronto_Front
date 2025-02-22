import UpdateAboutMeForm from "../../../../../components/dashboard/aboutMe/UpdateAboutMeForm";


const page = () => {
    const apiDomen = process.env.apiDomen;
  return (
   <UpdateAboutMeForm apiDomen={apiDomen}/>
  )
}

export default page