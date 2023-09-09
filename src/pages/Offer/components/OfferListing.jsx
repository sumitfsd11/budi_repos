import React from 'react'
import {useFetch} from '@/hooks/useFetch'
export default function OfferListing() {
    const onSuccess = React.useCallback(()=>{

    },[])
    
    const onFailure = React.useCallback(()=>{

    },[])

    const { isLoading, callFetch } = useFetch({
        initialUrl: "/login/",
        skipOnStart: true,
        onFailure,
        onSuccess,
      });

  return (
    <React.Fragment>
      {/* how to make it is your name  */}

    </React.Fragment>
  )
}
