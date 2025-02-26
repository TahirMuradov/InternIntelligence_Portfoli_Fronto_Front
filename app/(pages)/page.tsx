import AboutMe from "@/components/aboutMe/AboutMe";
import ContactMe from "@/components/contactMe/ContactMe";
import Education from "@/components/education/Education";
import Main from "@/components/main/Main";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";
import Result from "@/types/ApiResultType";
import GetAllDataForHome from "@/types/HomeTypes/GetAllDataForHome";

async function  dataFecthAsync(apiDomen:string|undefined):Promise< Result<GetAllDataForHome>|null>{
  try {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const response:Response=await  fetch(`${apiDomen}api/Home/GetAllDataForHome`, {
      cache:"no-store",
      method: "GET",
    })
    if (!response.ok) {
      console.log("API request failed:", response)
      return null;
    }
    const result :Result<GetAllDataForHome>=await response.json();
    if (!result.isSuccess) {
      console.log("API response error:", result);
      return null;
    }
    return result;
  } catch (error) {
    console.log("Fetch error:", error);
    return null;
  }
}

export default async function Home() {
    const apiDomen = process.env.apiDomen;
    const result=await dataFecthAsync(apiDomen);
    if (result?.isSuccess) {
        return(<>
            <Main mainData={result.data.main}/>
            <AboutMe data={result.data.aboutMe}/>
            <Education data={result.data.education}/>
            <Projects data={result.data.project}/>
            <Skills data={result.data.skill}/>
            <ContactMe/>
            
            </>
            )
    }

   return(<>
            <Main mainData={null}/>
            <AboutMe data={null}/>
            <Education data={null}/>
            <Projects data={null}/>
            <Skills data={null}/>
            <ContactMe/>
            
            </>
            )
    
 
}
