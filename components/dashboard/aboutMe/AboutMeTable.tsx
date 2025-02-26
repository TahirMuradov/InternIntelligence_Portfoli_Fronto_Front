"use client"

import Result from "@/types/ApiResultType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../common/loader/Loader";
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import GetAboutMeDetailDTO from "@/types/AboutMeTypes/GetAboutMeDetailDTO";



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

const AboutMeTable = ({apiDomen}:{apiDomen:string|undefined}) => {
    const[aboutMes,SetAboutMes]=useState<Result<GetAboutMeDetailDTO>|null>(null);
    const [loader,SetLoader]=useState<boolean>(false)

    const router=useRouter();
    const sessions=useSession();
  
    useEffect(()=>{
    SetLoader(true)
      fetch(`${apiDomen}api/Aboutme/GetAboutMeForTable`, {
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
              SetAboutMes(result)
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
                     SetAboutMes(null);
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
SetAboutMes(null)
                SetLoader(false)
             
                router.refresh();
            }
           });
       });
    },[])
    if (aboutMes) {
      console.log(aboutMes)
    }
      function AboutMeDelete(id:string){
        SetLoader(true)
       fetch(`${apiDomen}api/Aboutme/DeleteAboutMe?AboutMeId=${id}`, {
          headers: {
          'Authorization':`Bearer ${sessions.data?.user.token}`
          },
         method: "DELETE",
        })  .then(response => {
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
                  Swal.fire({
                      title: 'Success!',
                      text: 'AboutMe delete successfully!',
                      icon: 'success',
                      confirmButtonText: 'Cool',
                      allowEscapeKey:false,
                      allowOutsideClick:false
                  }).then((res) => {
                      if (res.isConfirmed) {
                 
                        SetAboutMes(prevAboutMes => {
                          if (!prevAboutMes) return null;
                  
                          return {
                              ...prevAboutMes,
                              data: {
                                  ...prevAboutMes.data,
                                  data: null
                              }
                          };
                      });
                        SetLoader(false)                
                 
                      }
                  });
              } else {
    
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
                <StyledTableCell align='center'>FullName</StyledTableCell>
                <StyledTableCell align='center'>Birth Day</StyledTableCell>
                <StyledTableCell align='center'>Nationality</StyledTableCell>
                <StyledTableCell align='center'>Adress</StyledTableCell>
                <StyledTableCell align='center'>Phone Number</StyledTableCell>
                <StyledTableCell align='center'>Email</StyledTableCell>
                <StyledTableCell align='center'>Photo</StyledTableCell>
                <StyledTableCell align='center'>CV Pdf</StyledTableCell>
             
             
           
            
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {
              aboutMes?
              
              
                <StyledTableRow key={aboutMes?.data.id}>
                  
                  <StyledTableCell align='center' component="th" scope="row">
                    {aboutMes?.data.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{aboutMes?.data.fullName}</StyledTableCell>
                  <StyledTableCell align="center">{new Date(aboutMes?.data.birthDay).toLocaleDateString()}</StyledTableCell>
                  <StyledTableCell align="center">{`${aboutMes?.data.nationality}`}</StyledTableCell>
                  <StyledTableCell align="center">{`${aboutMes?.data.adress}`}</StyledTableCell>
                  <StyledTableCell align="center">{`${aboutMes?.data.phoneNumber}`}</StyledTableCell>
                  <StyledTableCell align="center">{`${aboutMes?.data.email}`}</StyledTableCell>
                  <StyledTableCell align="center">
  {aboutMes?.data.photoUrl && (
    <img
      src={apiDomen+aboutMes.data.photoUrl}
      alt="Profile Photo"
      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
    />
  )}
</StyledTableCell>
<StyledTableCell align="center">
  {aboutMes?.data.cvUrl ? (
    <a
      href={apiDomen+aboutMes.data.cvUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block mx-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      View CV
    </a>
  ) : (
    <span className="text-gray-500">No CV</span>
  )}
</StyledTableCell>
              
                
               
                        <StyledTableCell align="center">
   {
    aboutMes?.data.id!=null?
    <button onClick={()=>AboutMeDelete(aboutMes?.data.id)} className=" mx-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
      Delete
    </button>
    :null
   }                     
    <Link href={`/dashboard/aboutme/aboutmeupdate`} className=" mx-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
      Edit
    </Link>
                        </StyledTableCell>
                </StyledTableRow>
              :null
             }
         
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default AboutMeTable