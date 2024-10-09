"use client";
import {useState} from 'react';
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {createVote} from "@/lib/actions/Poll.actions";
import {useRouter} from "next/navigation";

const PollForm = ({poll}) => {
    const [selected, setSelected] = useState(null);
    const router = useRouter();
    const handleVote = async() => {
        if (!selected) return;
        const vote = await createVote(poll.id, selected);
        if (vote?.errors) {
            alert(vote.errors.title);
            return;
        }
        router.refresh();

    }
    return (
        <div>
            <div className={"grid md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                {poll.options.map(option => (
                    <Card key={option.id} onClick={() => setSelected(option.id)} className={cn(
                        "cursor-pointer transition",
                        selected === option.id && "border-2 border-blue-500"
                    )}>
                        <CardHeader>
                            <CardTitle>{option.text}</CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            {selected && (
                <div className={"mt-4"}>
                    <button className={"bg-blue-500 text-white px-4 py-2 rounded"} onClick={handleVote}>Vote</button>
                </div>
            )}
        </div>
    );
};

export default PollForm;