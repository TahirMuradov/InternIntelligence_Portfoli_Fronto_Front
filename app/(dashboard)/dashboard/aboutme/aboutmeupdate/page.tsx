import AboutMeUpdateForm from "@/components/dashboard/aboutMe/AboutMeUpdateForm"


const page = () => {
    const apiDomen = process.env.apiDomen;
  return (
   <AboutMeUpdateForm apiDomen={apiDomen}/>
  )
}

export default page