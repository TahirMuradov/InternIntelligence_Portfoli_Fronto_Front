import AboutMeUpdateForm from "@/components/dashboard/AboutMe/AboutMeUpdateForm"


const page = () => {
    const apiDomen = process.env.apiDomen;
  return (
   <AboutMeUpdateForm apiDomen={apiDomen}/>
  )
}

export default page