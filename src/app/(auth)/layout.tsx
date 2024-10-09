import React from 'react';
import AuthTabs from "@/app/(auth)/AuthTabs";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";

const Layout = async () => {
    const session = await auth();
    if(session) {
        redirect('/');
    }
    return (
        <div className={"flex justify-center"}>
            <AuthTabs />
        </div>
    );
};

export default Layout;