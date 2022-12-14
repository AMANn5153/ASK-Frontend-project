import { configureStore } from "@reduxjs/toolkit";
import Question from "../feature/Question/Question"
import Comment from "../feature/Comments/comments"
import UserInfo from "../feature/UserInfo/UserInfo";
import Login from "../feature/Log_in_out/Login_out";
import Reply from "../feature/Reply/Reply";
import editProfile  from "../feature/UserInfo/EditProfile";
import ask from "../feature/ASK/Ask";

export const Store=configureStore({
    reducer:{
        question:Question,
        comment:Comment,
        UserInfo:UserInfo,
        Login,
        Reply,
        editProfile,
        ask
    }
})

