import CreateAboutMeForm from "@/components/dashboard/AboutMe/CreateAboutMeForm";



const page = () => {
    const apiDomen = process.env.apiDomen;
  return (
    <CreateAboutMeForm apiDomen={apiDomen}/>
  )
}

export default page