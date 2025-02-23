"use client"

import Result from "@/types/ApiResultType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../common/loader/Loader";
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import PaginatedList from "@/types/PaginatedList";
import GetProjectDetail from "@/types/ProjectTypes/GetProjectDetail";



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

const ProjectTable = ({apiDomen,page}:{page:number,apiDomen:string|undefined}) => {
    const[projects,SetProjects]=useState<Result<PaginatedList<GetProjectDetail>>|null>(null);
    const router=useRouter();
    const sessions=useSession();
  
    useEffect(()=>{
    
      fetch(`${apiDomen}api/Project/GetProjectForTable?page=${page}`, {
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
            if(result.isSuccess){
              SetProjects(result);
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
             
              Object.keys(result.errors).forEach((key) => {
                result.errors[key].forEach((message: string) => {
                
                    errors += `<li>${message}</li>`;
                });
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

                SetLoader(false)
             
                router.refresh();
            }
           });
       });
    },[])
     const [loader,SetLoader]=useState<boolean>(false)
      function ProjectDelete(id:string){
        SetLoader(true)
       fetch(`${apiDomen}api/Project/DeleteProject?id=${id}`, {
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
                      router.refresh();
                      SetLoader(false);
                  }
              });
              return;
          }else if(!response.ok){
            Swal.fire({
              title: 'Error!',
              text: 'An unexpected error occurred!',
              icon: 'error',
              confirmButtonText: 'Cool',
              allowEscapeKey:false,
              allowOutsideClick:false 

          }).then(x=>{
            if (x.isConfirmed) {
              
              
              signOut()
              router.refresh();
              SetLoader(false)
            }
          });
         return ;
        }

    
          return response.json()
        })
        .then(responsData=>{
          if (responsData) {
            
            if (responsData.isSuccess) {
              Swal.fire({
                  title: 'Success!',
                  text: 'Education  delete successfully!',
                  icon: 'success',
                  confirmButtonText: 'Cool',
                  allowEscapeKey:false,
                  allowOutsideClick:false 
              }).then((res) => {
                
                  if (res.isConfirmed) {
                  
                    SetProjects(prevProjects => {
                      if (!prevProjects) return null;
              
                      return {
                          ...prevProjects,
                          data: {
                              ...prevProjects.data,
                              data: prevProjects.data.data.filter(project => project.id !== id)
                          }
                      };
                  });
                      router.refresh();
                      SetLoader(false)
                  }
              })
          }else{
            Swal.fire({
              title: 'Error!',         
              icon: 'error',
              confirmButtonText: 'Cool'
          }).then((res) => {
              if (res.isConfirmed) {
                SetLoader(false)
                router.refresh();
                  router.push("/dashboard/project/1")
              }
          })
          }
          }
      
      })
        
        ;
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
                <StyledTableCell align='center'>Description</StyledTableCell>
               
                          
             
           
            
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {
                projects?.data.data.map((project)=>(


                <StyledTableRow key={project?.id}>
                  
                  <StyledTableCell align='center' component="th" scope="row">
                    {project?.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{project?.name}</StyledTableCell>
                  <StyledTableCell align="center">{`${project?.description}`}</StyledTableCell>
                     
                
               
                        <StyledTableCell align="center">
   {
    project?.id!=null?
    <button onClick={()=>ProjectDelete(project?.id)} className=" mx-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
      Delete
    </button>
    :null
   }                     
    <Link href={`/dashboard/project/update/${project.id}`} className=" mx-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
      Edit
    </Link>
                        </StyledTableCell>
                </StyledTableRow>
                ))
             }
         
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default ProjectTable