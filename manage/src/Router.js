import React from 'react';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'
import Login from './Pages/Login'
import Admin from './Pages/AdminIndex'
import './static/Pages/public.css'
function Main(){
    return (
        <div>
            <Router>
                <Route path='/' exact component={Login}></Route>
                <Route path='/admin'  component={Admin}></Route>
            </Router>
        </div>
    )
}
export default Main