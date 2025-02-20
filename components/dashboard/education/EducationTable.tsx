"use client"

import Result from "@/types/ApiResultType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../common/loader/index";
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import GetEducationDetail from "@/types/EducationTypes/GetEducationDetail";
import PaginatedList from "@/types/PaginatedList";



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

const EducationTable = ({apiDomen,page}:{page:number,apiDomen:string|undefined}) => {
    const[educations,SetEducations]=useState<Result<PaginatedList<GetEducationDetail>>|null>(null);
    const router=useRouter();
    const sessions=useSession();
  
    useEffect(()=>{
    
      fetch(`${apiDomen}api/Education/GetEducationForTable?page=${page}`, {
        headers: {
           'Authorization':`Bearer ${sessions.data?.user.token}`,
        },
        cache:"no-store",
        method: "GET",
      }).then(res=>{

        if(res.status==401){ 

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
      else if(!res.ok){
        Swal.fire({
          title: 'Error!',
          text: 'An unexpected error occurred!',
          icon: 'error',
          confirmButtonText: 'Cool',
          allowEscapeKey:false,
          allowOutsideClick:false
        }
     
    ).then(x=>{
        if (x.isConfirmed) {
                      SetLoader(false)
       signOut()
    
        }
      });
      return;
      }
        return    res.json();
      }
        
    
    ).then(x=>{
      if (x) {
   
          SetEducations(x)
      
      }
    });
    },[])
     const [loader,SetLoader]=useState<boolean>(false)
      function EducationDelete(id:string){
        SetLoader(true)
       fetch(`${apiDomen}api/Education/DeleteEducation?id=${id}`, {
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
              
                SetLoader(false)

           signOut()
              router.refresh();
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
                    SetLoader(false)
                    fetch(`${apiDomen}api/Education/GetEducationForTable?page=${page}`, {
                      headers: {
                      
                        'Authorization':`Bearer ${sessions.data?.user.token}`,
                      },
                      cache:"no-store",
                      method: "GET",
                    }).then(res=>res.json()).then(x=>SetEducations(x));
                      router.refresh();
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
                  router.push("/dashboard/education/1")// Clear the form
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
                <StyledTableCell align='center'>Education Name</StyledTableCell>
                <StyledTableCell align='center'>Description</StyledTableCell>
                <StyledTableCell align='center'>Start Date</StyledTableCell>
                <StyledTableCell align='center'>End Date</StyledTableCell>
                          
             
           
            
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {
                educations?.data.data.map((edu)=>(


                <StyledTableRow key={edu?.id}>
                  
                  <StyledTableCell align='center' component="th" scope="row">
                    {edu?.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{edu?.educationName}</StyledTableCell>
                  <StyledTableCell align="center">{Date.parse( ` ${ edu.startDate}`)}</StyledTableCell>
                  <StyledTableCell align="center">{Date.parse(` ${ edu.endDate}`)}</StyledTableCell>
                  <StyledTableCell align="center">{`${edu?.description}`}</StyledTableCell>
                     
                
               
                        <StyledTableCell align="center">
   {
    edu?.id!=null?
    <button onClick={()=>EducationDelete(edu?.id)} className=" mx-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
      Delete
    </button>
    :null
   }                     
    <Link href={`/dashboard/education/updateeducation/${edu.id}`} className=" mx-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
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

export default EducationTable