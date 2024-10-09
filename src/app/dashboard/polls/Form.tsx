"use client";

import {useEffect, useState} from 'react';
import { useFormState } from 'react-dom'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CalendarIcon, X} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {createPoll, modifyPoll} from "@/lib/actions/Poll.actions";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";

const initialState = {
    errors: []
}

const Form = ({poll}) => {
    const [state, formAction] = useFormState(poll?.id ? modifyPoll : createPoll, initialState);
    const [options, setOptions] = useState(poll?.options || []);
    return (
        <form action={formAction}>
            {poll?.id && <Input type="hidden" name="id" value={poll.id}/>}
            <div className="space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" name="title" defaultValue={poll?.title}/>
                    {state?.errors?.title && <div className={"text-sm text-red-500 mt-2"}>{state.errors?.title}</div>}
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" defaultValue={poll?.description}/>
                    {state?.errors?.description &&
                        <div className={"text-sm text-red-500 mt-2"}>{state.errors?.description}</div>}
                </div>
                <div>
                    <Label htmlFor="date-start" className={"mr-2"}>Date start</Label>
                    <DatePicker name={"date-start"} defaultValue={poll?.dateStart}/>
                    {state?.errors?.dateStart &&
                        <div className={"text-sm text-red-500 mt-2"}>{state.errors?.dateStart}</div>}
                </div>
                <div>
                    <Label htmlFor="date-end" className={"mr-2"}>Date end</Label>
                    <DatePicker name={"date-end"} defaultValue={poll?.dateEnd}/>
                    {state?.errors?.dateEnd &&
                        <div className={"text-sm text-red-500 mt-2"}>{state.errors?.dateEnd}</div>}
                </div>
                <div className={"border rounded p-4"}>
                    <Label>Options</Label>
                    {poll?.id ? (
                        <ul className="space-y-2 list-disc list-inside">
                            {options.map((option, index) => (
                                <li key={index}>
                                    {option.text}
                                </li>
                            ))}
                        </ul>
                    ):(
                        <>
                            <div className="space-y-4">
                                {options.map((option, index) => (
                                    <div key={index} className={"flex items-center"}>
                                        <Input type="text" id={`options[${index}]`} name={`options`}
                                               defaultValue={option.text}/>
                                        <X className={"ml-2 cursor-pointer"}
                                           onClick={() => setOptions(options.filter((_, i) => i !== index))}/>
                                    </div>
                                ))}
                            </div>
                            {state?.errors?.options &&
                                <div className={"text-sm text-red-500 mt-2"}>{state.errors?.options}</div>}
                            <div className="mt-4">
                                <Button type="button" onClick={() => setOptions([...options, {text: ""}])}>Add Option</Button>
                            </div>
                        </>
                    )}
                </div>
                <div>
                    <Button type="submit">{poll?.id ? "Modify" : "Create"} Poll</Button>
                </div>
            </div>
        </form>
    );
};

const DatePicker = ({name, defaultValue}) => {
    const [date, setDate] = useState<Date>(new Date(defaultValue || Date.now()));
    return (
        <>
            <Input type="hidden" name={name} value={date ? date.toISOString() : ""}/>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </>
    )
}

export default Form;