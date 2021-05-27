import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => {

  return(
    <Route {...rest} render={() => {
      if(window.localStorage.getItem("token")) {
        return <Component />
      } else {
        return <Redirect to="/login" />
      }
    }}
    />
  )
}


export default ProtectedRoute; 