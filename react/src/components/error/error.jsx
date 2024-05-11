import React from 'react'

const Error = ({error}) => {
  if(error.status===500){
    return(
      <>
      <div className='text-center h-screen flex place-content-center p-10'>
        <div>Internal Server Error</div>
      </div>
    </>
    )
  }
    if (error.status >= 500) {
        return (
          <>
            <div className='text-center h-screen flex place-content-center p-10'>
              <div>Something Went Wrong</div>
            </div>
          </>
        );
      }
      if (error.status === "FETCH_ERROR") {
        return (
          <>
            <div className='  text-center h-screen flex place-content-center p-10 '>
              <div><span>Could not Connect to the Server</span></div>
              
            </div>
          </>
        );
      }
      if(error.status===404){
        return(
          <>
           <div className='  text-center absolute left-0 right-0  top-3 '>
              <div><span>404</span></div>
              <div>Page not found</div>
              
            </div>
          </>
        )
      }

}

export default Error