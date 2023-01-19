import *as Yup from "yup"

export const schema=Yup.object().shape({
    password:Yup.string().required("enter new password"),
    confirmPassword:Yup.string().when("password",{
        is:val=>(val&&val.length>0?true:false),
        then:Yup.string().oneOf([Yup.ref("password")],"password must be same")
    })
})