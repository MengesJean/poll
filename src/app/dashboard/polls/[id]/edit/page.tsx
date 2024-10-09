import Form from "@/app/dashboard/polls/Form";
import {getPollById} from "@/lib/actions/Poll.actions";
import {PollType} from "@/lib/types/Poll.type";

const Page = async ({params}: {params: {id: string}}) => {
    const {id} = params;
    const poll = await getPollById<PollType>(id);

    return (
        <div>
            <Form poll={poll}/>
        </div>
    );
};

export default Page;