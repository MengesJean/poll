import React, {Fragment} from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {getPollsByUser} from "@/lib/actions/Poll.actions";
import {auth} from "@/lib/auth";
import {notFound} from "next/navigation";
import PollCard from "@/components/PollCard";

const Page = async () => {
    const session = await auth();
    if(!session) {
        notFound();
    }
    const polls = await getPollsByUser(session.user.id);
    return (
        <div>
            <h1 className={"text-4xl font-bold mb-4"}>My polls</h1>
            <div className={"mb-8"}>
                <Link href={"/dashboard/polls/create"}>
                    <Button>Create Poll</Button>
                </Link>
            </div>
            <div className={"grid md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                {polls.map(poll => (
                    <Fragment key={poll.id}>
                        <PollCard poll={poll}/>
                    </Fragment>
                ))}
            </div>

        </div>
    );
};

export default Page;