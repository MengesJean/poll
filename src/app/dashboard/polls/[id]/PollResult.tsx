"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const PollResult = ({poll}) => {
    const voteLength = poll.vote.length;
    return (
        <div className={"space-y-4"}>
            {poll.options.map(option => (
                <Card key={option.id} className={"relative overflow-hidden"}>
                    <div className={"absolute inset-0 z-0"}>
                        <div className={"bg-blue-500/50 h-full"} style={{width: `${option.vote.length / voteLength * 100}%`}}></div>
                    </div>
                    <div className={"relative z-10"}>
                        <CardHeader>
                            <CardTitle>{option.text}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>Nombre de vote : {option.vote.length}</div>
                        </CardContent>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default PollResult;