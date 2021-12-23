import React from 'react'
import ReactDOM from 'react-dom'
import { Login } from './pages/login'
import { Home } from './pages/home'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />          
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
    </BrowserRouter>
  )
}

export { App }
