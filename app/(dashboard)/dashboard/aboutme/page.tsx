import AboutMeTable from "@/components/dashboard/AboutMe/AboutMeTable"

const page = () => {
    const apiDomen = process.env.apiDomen;
  return (
    <AboutMeTable apiDomen={apiDomen} />
  )
}

export default page