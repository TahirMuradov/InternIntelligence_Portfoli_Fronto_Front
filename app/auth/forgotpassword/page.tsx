import ForgotPassword from "@/components/auth/ForgotPassword";




const forgotPassword:React.FC = () => {



  try {
    const apiDomen = process.env.apiDomen;
    return <ForgotPassword key={1} apiDomen={apiDomen}/>
  } catch (error) {
    console.log(error)
  }
}
export default forgotPassword