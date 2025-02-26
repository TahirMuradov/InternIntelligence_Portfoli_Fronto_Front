"use client"

import Result from "@/types/ApiResultType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../common/loader/Loader";
import { Pagination, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import PaginatedList from "@/types/PaginatedList";
import GetSkillDetail from "@/types/SkillTypes/GetSkillDetail";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const SkillTable = ({apiDomen,page}:{page:number,apiDomen:string|undefined}) => {
    const[skills,SetSkills]=useState<Result<PaginatedList<GetSkillDetail>>|null>(null);
    const [pageState,SetPageState]=useState<number>(page);
    const [loader,SetLoader]=useState<boolean>(false)

    const router=useRouter();
    const sessions=useSession();
  function dataFetch(page:number){
    fetch(`${apiDomen}api/Skill/GetSkillForTable?page=${page}`, {
      headers: {
         'Authorization':`Bearer ${sessions.data?.user.token}`,
      },
      cache:"no-store",
      method: "GET",
    })
       .then(response => {
      if (response.status==401) {
        Swal.fire({
            title: 'Authorization Error!',
            text: 'Your session has expired. Please log in again.',
            icon: 'info',
            confirmButtonText: 'Login',
             allowEscapeKey:false,
             allowOutsideClick:false                     
        }).then(res => {
            if (res.isConfirmed) {
                signOut(); 
                SetLoader(false);
                router.refresh();
            }
        });
        return;
    }
    
    return response.json()
})
   .then(result => {
    
    if (result) {
        if (result.isSuccess) {
          SetSkills(result)
          SetLoader(false)
        }
        if (!result.isSuccess) {

         let errors = "<ul>";
         if (Array.isArray(result.messages)) {
         
             result.messages.forEach((message:string)=> {
                 errors += `<li>${message}</li>`;
             });
         } else if (result.message) {
          
             errors += `<li>${result.message}</li>`;
         }
         else if(result.errors){
    
            result.errors.Description.forEach((message:string)=> {
                errors += `<li>${message}</li>`;
            });
         }
         errors += "</ul>";
 
         Swal.fire({
             title: 'Error!',
             html: errors, 
             icon: 'error',
             confirmButtonText: 'Cool',
             allowEscapeKey:false,
             allowOutsideClick:false
         }).then(res => {
             if (res.isConfirmed) {
                 SetLoader(false);
                 SetSkills(null);
                 router.refresh();
             }
         });
        }

    }

   })
   .catch(error => {
       Swal.fire({
           title: 'Error!',
           text: `An unexpected error occurred!${error}`,
           icon: 'error',
           confirmButtonText: 'Cool',
           allowEnterKey:false,
           allowOutsideClick:false
       }).then((x)=>{
        if(x.isConfirmed){
SetSkills(null)
            SetLoader(false)
         
            router.refresh();
        }
       });
   });
  }
    useEffect(()=>{
    SetLoader(true)
    dataFetch(pageState);
    },[pageState])
      function SkillDelete(id:string){
        SetLoader(true)
       fetch(`${apiDomen}api/Skill/DeleteSkill?id=${id}`, {
          headers: {
          'Authorization':`Bearer ${sessions.data?.user.token}`
          },
         method: "DELETE",
        }).then(response=>{
          
     
            if (response.status==401) {
              Swal.fire({
                  title: 'Authorization Error!',
                  text: 'Your session has expired. Please log in again.',
                  icon: 'info',
                  confirmButtonText: 'Login',
                   allowEscapeKey:false,
                   allowOutsideClick:false                     
              }).then(res => {
                  if (res.isConfirmed) {
                      signOut(); 
                      SetLoader(false);
                      router.refresh();
                  }
              });
              return;
          }

    
          return response.json()
        })
        .then(responsData=>{
          if (responsData) {
            
            if (responsData.isSuccess) {
              Swal.fire({
                  title: 'Success!',
                  text: 'Skill  delete successfully!',
                  icon: 'success',
                  confirmButtonText: 'Cool',
                  allowEscapeKey:false,
                  allowOutsideClick:false 
              }).then((res) => {
                  if (res.isConfirmed) {
                    SetLoader(false)
                    SetSkills(prevSkills => {
                      if (!prevSkills) return null;
              
                      return {
                          ...prevSkills,
                          data: {
                              ...prevSkills.data,
                              data: prevSkills.data.data.filter(skill => skill.id !== id)
                          }
                      };
                  });
                      router.refresh();
                  }
              })
          }else{
            let errors = "<ul>";
            if (Array.isArray(responsData.messages)) {
            
                responsData.messages.forEach((message:string)=> {
                    errors += `<li>${message}</li>`;
                });
            } else if (responsData.message) {
             
                errors += `<li>${responsData.message}</li>`;
            }
            else if(responsData.errors){
               responsData.errors.Description.forEach((message:string)=> {
                   errors += `<li>${message}</li>`;
               });
            }
            errors += "</ul>";
    
            Swal.fire({
                title: 'Error!',
                html: errors, 
                icon: 'error',
                confirmButtonText: 'Cool',
                allowEscapeKey:false,
                allowOutsideClick:false
            }).then(res => {
                if (res.isConfirmed) {
                    SetLoader(false);
                    router.refresh();
                }
            });
          }
          }
      
      })
        
        ;
      }


      const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        SetPageState(value); 
        
    }

      if (loader) {
        return <Loader/>
      }
     
      return (
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'> Id</StyledTableCell>
                <StyledTableCell align='center'>Name</StyledTableCell>
                <StyledTableCell align='center'>isBackend</StyledTableCell>
               
                          
             
           
            
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {
                skills?.data.data.map((skill)=>(


                <StyledTableRow key={skill?.id}>
                  
                  <StyledTableCell align='center' component="th" scope="row">
                    {skill?.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{skill?.skillName}</StyledTableCell>
                  <StyledTableCell align="center">{`${skill?.isBackend}`}</StyledTableCell>
                     
                
               
                        <StyledTableCell align="center">
   {
    skill?.id!=null?
    <button onClick={()=>SkillDelete(skill?.id)} className=" mx-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
      Delete
    </button>
    :null
   }                     
    <Link href={`/dashboard/skill/update/${skill.id}`} className=" mx-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
      Edit
    </Link>
                        </StyledTableCell>
                </StyledTableRow>
                ))
             }
         
            </TableBody>
          </Table>
           <div className="flex justify-center">
                                  <Pagination color="standard" count={skills?.data.totalPages} shape="rounded" onChange={handlePageChange}  />
                                  </div>
        </TableContainer>
  )
}

export default SkillTable