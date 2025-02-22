import AboutMeUpdateForm from "@/components/dashboard/aboutMe/UpdateAboutMeForm"


const page = () => {
    const apiDomen = process.env.apiDomen;
  return (
   <AboutMeUpdateForm apiDomen={apiDomen}/>
  )
}

export default page