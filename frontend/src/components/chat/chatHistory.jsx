import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { Chat } from './chat';

const chatHistory = () => {
  const {searchParms,setSearchParams}=useSearchParams()
  return (
    <div>
      <Chat receiverId={searchParms.get('receiverId')}/>
    </div>

  )
}

export default chatHistory