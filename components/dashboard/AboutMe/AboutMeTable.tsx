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
    const router=useRouter();
    const sessions=useSession();
  
    useEffect(()=>{
    
      fetch(`${apiDomen}api/Aboutme/GetAboutMeForTable`, {
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
   
          SetAboutMes(x)
        console.log(x)
     
      }
    });
    },[])
     const [loader,SetLoader]=useState<boolean>(false)
      function AboutMeDelete(id:string){
        SetLoader(true)
       fetch(`${apiDomen}api/Aboutme/DeleteAboutMe?AboutMeId=${id}`, {
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
              confirmButtonText: 'Cool'
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
                  text: 'AboutMe  delete successfully!',
                  icon: 'success',
                  confirmButtonText: 'Cool'
              }).then((res) => {
                  if (res.isConfirmed) {
                    SetLoader(false)
                    fetch(`${apiDomen}api/Aboutme/GetAboutMeForUI`, {
                      headers: {
                      
                        'Authorization':`Bearer ${sessions.data?.user.token}`,
                      },
                      cache:"no-store",
                      method: "GET",
                    }).then(res=>res.json()).then(x=>SetAboutMes(x));
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
                  router.push("/dashboard/aboutme")// Clear the form
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
             
                <StyledTableRow key={aboutMes?.data.id}>
                  
                  <StyledTableCell align='center' component="th" scope="row">
                    {aboutMes?.data.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{aboutMes?.data.fullName}</StyledTableCell>
                  <StyledTableCell align="center">{`${aboutMes?.data.birthDay}`}</StyledTableCell>
                  <StyledTableCell align="center">{`${aboutMes?.data.nationality}`}</StyledTableCell>
                  <StyledTableCell align="center">{`${aboutMes?.data.adress}`}</StyledTableCell>
                  <StyledTableCell align="center">{`${aboutMes?.data.phoneNumber}`}</StyledTableCell>
                  <StyledTableCell align="center">{`${aboutMes?.data.email}`}</StyledTableCell>
                  <StyledTableCell align="center">{`${aboutMes?.data.photoUrl}`}</StyledTableCell>
                  <StyledTableCell align="center">{`${aboutMes?.data.cvUrl}`}</StyledTableCell>
              
                
               
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
         
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default AboutMeTable