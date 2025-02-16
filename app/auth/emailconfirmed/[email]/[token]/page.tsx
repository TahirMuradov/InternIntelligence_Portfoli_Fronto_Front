import Result from "@/types/ApiResultType";
import Link from "next/link";




interface Props { 
    params: {
      email: string;
      token: string;
    };
  }
  
  const page:React.FC<Props> = async ({params:{email,token}}) => {
  
  
  try {
  
    const apiDomen = process.env.apiDomen;
  
  
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(`${apiDomen}api/Auth/ChecekdConfirmedEmailToken`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        email:decodeURIComponent(email),
        token:decodeURIComponent(token)
      })
    });
    
  const data:Result<null>=await response.json();
  
    
  if (data.isSuccess) {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-black-100">
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md">
      <h2 className="text-xl font-semibold text-red-600">Profile approved info</h2>
      <p className="text-gray-600 mt-5">
      Your profile has been approved
      </p>
      <Link href={"/auth/login"} className="mt-4 block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      Sign in
      </Link>
    </div>
  </div>
   )
  }
  return   <div className="flex items-center justify-center min-h-screen bg-black-100">
  <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md">
    <h2 className="text-xl font-semibold text-red-600">Profile approved info</h2>
    <p className="text-gray-600 mt-5">
    Your profile has already been confirmed
    </p>
    <Link href={"/auth/login"} className="mt-4 block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Sign in
    </Link>
  </div>
  </div>
  }catch(error){
  console.log(error)
  }
  
  
  }
  
  export default page;