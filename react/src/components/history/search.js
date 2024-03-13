import React from 'react'
import { useViewSearchHisory } from '../../api/searchHistoryApi'

const search = ({subcategoryId}) => {
  const {data,isLoading}=useViewSearchHisory(subcategoryId)


 
}

export default search