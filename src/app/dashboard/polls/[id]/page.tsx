import {deletePoll, getPollById} from "@/lib/actions/Poll.actions";
import {PollType} from "@/lib/types/Poll.type";
import PollForm from "@/app/dashboard/polls/[id]/PollForm";
import PollResult from "@/app/dashboard/polls/[id]/PollResult";
import GoBack from "@/components/GoBack";
import Link from "next/link";
import {Button} from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

const Page = async ({params}: {params: {id: string}}) => {
    const {id} = params;
    const poll = await getPollById<PollType>(id);
    const isVoted = poll.vote.some(vote => vote.userId === poll.userId);

    return (
        <div>
            <div className={"mb-4 flex items-center space-x-4"}>
                <GoBack/>
                <Link href={`/dashboard/polls/${id}/edit`}>
                    <Button>Edit</Button>
                </Link>
                <Dialog>
                    <DialogTrigger asChild={true}>
                        <Button variant="destructive">
                            Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Are you absolutely sure?
                            </DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <form action={async () => {
                                "use server";
                                await deletePoll(poll.id);
                            }}>
                                <Button variant="destructive" type={"submit"}>Delete</Button>
                            </form>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <h1 className={"text-4xl font-bold mb-4"}>{poll.title}</h1>
            {isVoted ? <PollResult poll={poll}/> : <PollForm poll={poll}/>}

        </div>
    );
};

export default Page;