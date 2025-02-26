"use client"

import Result from "@/types/ApiResultType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../common/loader/Loader";
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import GetMainDetail from "@/types/MainTypes/GetMainDetail";




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

const MainTable = ({apiDomen}:{apiDomen:string|undefined}) => {
    const[main,Setmain]=useState<Result<GetMainDetail>|null>(null);
    const [loader,SetLoader]=useState<boolean>(false)
  
    const router=useRouter();
    const sessions=useSession();
  function  GetData(){
    fetch(`${apiDomen}api/Main/GetMainForTable`, {
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
            
            Setmain(result)
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
  }
    useEffect(()=>{
    SetLoader(true)
   GetData()
   
    },[])
      function MainDelete(id:string){
        SetLoader(true)
       fetch(`${apiDomen}api/Main/DeleteMain?MainId=${id}`, {
          headers: {
          'Authorization':`Bearer ${sessions.data?.user.token}`
          },
         method: "DELETE",
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
                      Swal.fire({
                          title: 'Success!',
                          text: 'Main successfully!',
                          icon: 'success',
                          confirmButtonText: 'Cool',
                          allowEscapeKey:false,
                          allowOutsideClick:false
                      }).then((res) => {
                          if (res.isConfirmed) {
                            Setmain(null);
                            SetLoader(false)                
                   
                          }
                      });
                  } else  {
        
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
                <StyledTableCell align='center'>Title</StyledTableCell>
                <StyledTableCell align='center'>Description</StyledTableCell>
           
             
             
           
            
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {
              main?.data !=null?
              
                <StyledTableRow key={main?.data.id}>
                  
                  <StyledTableCell align='center' component="th" scope="row">
                    {main?.data.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{main?.data.title}</StyledTableCell>
                  <StyledTableCell align="center">{main?.data.description}</StyledTableCell>
              
              
                
               
                        <StyledTableCell align="center">
   {
    main?.data.id!=null?
    <button onClick={()=>MainDelete(main?.data.id)} className=" mx-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
      Delete
    </button>
    :null
   }                     
    <Link href={`/dashboard/main/mainupdate`} className=" mx-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
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

export default MainTable