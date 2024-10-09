export type PollType = {
    id: string;
    title: string;
    options: PollOptionType[];
}

export type PollOptionType = {
    id: string;
    text: string;
    pollId: string;
}

export type PollVoteType = {
    id: string;
    optionId: string;
    userId: string;
    pollId: string;
}