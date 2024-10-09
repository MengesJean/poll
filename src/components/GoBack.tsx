"use client"

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "lucide-react";

const GoBack = () => {
    const router = useRouter();
    const goBack = () => {
        router.back();
    }
    return (
        <Button onClick={goBack}>
            <ArrowLeft className={"mr-2"}/>
            Go Back
        </Button>
    );
};

export default GoBack;