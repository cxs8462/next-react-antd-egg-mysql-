import Login from '../Pages/Login'
import AdminIndex from '../Pages/AdminIndex'
import Write from '../Components/Write'
import Type from '../Components/Type'
import SetHead from '../Components/SetHead'
import Self from '../Components/Self'
import Lists from '../Components/Lists'

const routes=[
    {
        path:'/',
        component:Login,
        name:'Login',
        exact: true
    },
    {
        path:'/admin',
        component:AdminIndex,
        name:'AdminIndex',
        routes:[
            {
                path:'/admin',
                exact:true,
                component:Write,
            },
            {
                path:'/admin/settype',
                exact:true,
                component:Type,
            },
            {
                path:'/admin/sethead',
                exact:true,
                component:SetHead,
            },
            {
                path:'/admin/setself',
                exact:true,
                component:Self,
            },
            {
                path:'/admin/lists',
                exact:true,
                component:Lists
            }
        ]
    }
]

export default routes