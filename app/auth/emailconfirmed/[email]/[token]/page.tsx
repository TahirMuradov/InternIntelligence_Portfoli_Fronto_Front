
import Result from "@/types/ApiResultType";
import Link from "next/link";
import { FC } from "react";

interface PageProps {
  params: {
    email: string;
    token: string;
  };
}


const page: FC<PageProps> = async ({ params }) => {
  const { email, token } = params; 

  try {
    const apiDomen = process.env.apiDomen;
    console.log(apiDomen);

    const response: Response = await fetch(`${apiDomen}api/Auth/ChecekdConfirmedEmailToken`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: decodeURIComponent(email),
        token: decodeURIComponent(token),
      }),
    });

    console.log(response);
    const data: Result<null> = await response.json();

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-xl font-semibold text-red-600">Profile approved info</h2>
          <p className="text-gray-600 mt-5">
            {data.isSuccess ? "Your profile has been approved" : "Your profile has already been confirmed"}
          </p>
          <Link href="/auth/login" className="mt-4 block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.log("Error confirming email:", error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-600 mt-5">Something went wrong. Please try again later.</p>
        </div>
      </div>
    );
  }
};
export default page