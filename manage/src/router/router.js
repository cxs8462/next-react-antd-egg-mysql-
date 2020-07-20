import React,{lazy,Suspense} from 'react'
import Loading from '../Components/loading/Loading'
// import Login from '../Pages/Login'

// import AdminIndex from '../Pages/AdminIndex'
// import Write from '../Components/Write'
// import Type from '../Components/Type'
// import SetHead from '../Components/SetHead'
// import Self from '../Components/Self'
// import Lists from '../Components/Lists'
const Login = lazy(()=>import('../Pages/Login'))

const  AdminIndex = lazy(()=>import('../Pages/AdminIndex'))
const Write = lazy(()=>import('../Components/Write'))
const Type = lazy(()=>import('../Components/Type'))
const SetHead = lazy(()=>import('../Components/SetHead'))
const Self = lazy(()=>import('../Components/Self'))
const Lists = lazy(()=>import('../Components/Lists'))



const Lazy = Component=>props=>{
    return <Suspense fallback={<Loading/>}>
        <Component {...props}></Component>
    </Suspense>
}
const routes=[
    {
        path:'/',
        component:Lazy(Login),
        name:'Login',
        exact: true
    },
    {
        path:'/admin',
        component:Lazy(AdminIndex),
        name:'AdminIndex',
        routes:[
            {
                path:'/admin',
                exact:true,
                component:Lazy(Write),
            },
            {
                path:'/admin/settype',
                exact:true,
                component:Lazy(Type),
            },
            {
                path:'/admin/sethead',
                exact:true,
                component:Lazy(SetHead),
            },
            {
                path:'/admin/setself',
                exact:true,
                component:Lazy(Self),
            },
            {
                path:'/admin/lists',
                exact:true,
                component:Lazy(Lists)
            }
        ]
    }
]

export default routes