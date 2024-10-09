"use client"

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Check} from "lucide-react";

const PollCard = ({poll}) => {
    const {title, options} = poll;
    const isVoted = poll.vote.some(vote => vote.userId === poll.userId);
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                        <p>
                            Options : {options.length}
                        </p>
                        <p>
                            Votes : {poll.vote.length}
                        </p>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        {isVoted && (<p>
                            <Check/>
                        </p>)}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Link href={`/dashboard/polls/${poll.id}`}>
                    <Button>View Poll</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default PollCard;