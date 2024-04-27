import { Link, useNavigate, useParams } from "@remix-run/react";
import { addDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
import { DatePicker } from "~/atoms/ui/date-picker";
import { Input } from "~/atoms/ui/input";
import { Label } from "~/atoms/ui/label";
import { Textarea } from "~/atoms/ui/textarea";
import { useCurrentUser } from "~/db/auth";
import { eventIdref, relatedEventRef } from "~/db/event-ref";
import { getUserUID } from "~/db/get-user-uid";
import { RelatedEventData, uniqueCodeGenerator } from "~/lib/utils";


type FormErrorData<T> = Partial<Record<keyof T, string>>

export default function RelatedEvent() {
    const [error, setError] = useState<FormErrorData<RelatedEventData> | null>();
    const [eventDate, setEventDate] = useState<Date | undefined>();
    const [userUID, setUserUID] = useState<string | null>();

    const navigate = useNavigate();
    
    const user = useCurrentUser();

    useEffect(() => {
        if(user.status === 'authenticated') {
            getUserUID()
                .then(res => setUserUID(res))
        } else {
            setUserUID(null)
        }
    }, [user.status])

    const {currentUserUID} = useParams();

    async function handleOnSubmit(event: FormEvent) {
        if(!(event.target instanceof HTMLFormElement)) {
            return
        }
        event.preventDefault();

        const _formData = new FormData(event.target);
        console.log("_formData", _formData)

        if(userUID) {
        _formData.append('userUID', userUID)
        }

        if(eventDate) {
            _formData.append("eventDate", eventDate.toString());
        };

        const nextID = await uniqueCodeGenerator.next();
        _formData.append("eventID", String(nextID.value));

        const formData = Object.fromEntries(_formData.entries());

        const errors: FormErrorData<RelatedEventData> = {};

        if(!("eventName" in formData && typeof formData.eventName === "string" && formData.eventName.length >= 4)) {
            errors.eventName = "Enter name of your event"
        }
        if(!("eventDate" in formData)) {
            errors.eventDate = "Choose event date"
        };
        if(!("eventTime" in formData && typeof formData.eventTime === "string" && formData.eventTime.length >= 4)) {
            errors.eventTime = "Enter hours and minutes in 24-hour format"
        };
        if(!("eventPlace" in formData && typeof formData.eventPlace === "string" && formData.eventPlace.length >= 2)) {
            errors.eventPlace = "Enter event place, use at least 2 characters"
        };
        if(!("eventStreetAddress" in formData && typeof formData.eventStreetAddress === "string" && formData.eventStreetAddress.length >= 2)) {
            errors.eventStreetAddress = "Enter event street address, use at least 2 characters"
        };
        if(!("eventCityAddress" in formData && typeof formData.eventCityAddress === "string" && formData.eventCityAddress.length >= 2)) {
            errors.eventCityAddress = "Enter event city address, use at least 2 characters"
        };
        if(!("eventCountryAddress" in formData && typeof formData.eventCountryAddress === "string" && formData.eventCountryAddress.length >= 2)) {
            errors.eventCountryAddress = "Enter event country address, use at least 2 characters"
        };

        setError(errors);

        if(Object.keys(errors).length !== 0) {
            return;
        } else {
            await addDoc(eventIdref, {"ID": nextID.value});
            await addDoc(relatedEventRef, formData);
            event.target.reset();
            navigate(`/${currentUserUID}/events`);
        }
    }

    return (
        <Card className="w-full max-w-screen-lg mx-auto my-8">
            <CardHeader className="my-4">
                <CardTitle className="mb-2">Your dream event</CardTitle>
                <CardDescription>{"Provide the necessary information about the event related to your wedding."}</CardDescription>
                <CardDescription>{"You can also provide additional information: your wedding code (if you have one) and others."}</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="EventForm" onSubmit={handleOnSubmit}>
                    <div className="w-full border-b-2 pb-4">

                        <div className="text-lg mb-2">
                            <p className="border-t-2 pt-4">Name</p>
                            <CardDescription className="mb-6">{"(e.g. bachelorette party)"}</CardDescription>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-start-2 col-end-4 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="eventName">Name of your event</Label> 
                                    <Input name="eventName" />
                                    {!!error?.eventName && <em className="text-base text-red-700">{error.eventName}</em>}
                                </div>
                            </div>
                        </div>

                        <div className="text-lg mb-2">
                            <p className="border-t-2 pt-4">Event</p>
                            <CardDescription className="mb-6">{"Date and time (in 24-hour format)"}</CardDescription>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-start-2 flex flex-col space-y-1.5 mb-5">
                                    <Label>Date</Label> 
                                    <DatePicker value={eventDate} onSelectDate={(date) => setEventDate(date)}/>
                                    {!!error?.eventDate && <em className="text-base text-red-700">{error.eventDate}</em>}                                   
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="eventTime">Time</Label> 
                                    <Input name="eventTime" type="time"/>
                                    {!!error?.eventTime && <em className="text-base text-red-700">{error.eventTime}</em>}
                                </div>
                            </div>
                        </div>

                        <div className="text-lg mb-2">
                            <p className="border-t-2 pt-4">Location</p>
                            <CardDescription className="mb-6">Event venue and address</CardDescription>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-start-2 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="eventPlace">Place name</Label>
                                    <Input name="eventPlace" />
                                    {!!error?.eventPlace && <em className="text-base text-red-700">{error.eventPlace}</em>}
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="eventStreetAddress">Street</Label> 
                                    <Input name="eventStreetAddress" />
                                    {!!error?.eventStreetAddress && <em className="text-base text-red-700">{error.eventStreetAddress}</em>}
                                </div>
                                <div className="col-start-3 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="eventCityAddress">City</Label> 
                                    <Input name="eventCityAddress" />
                                    {!!error?.eventCityAddress && <em className="text-base text-red-700">{error.eventCityAddress}</em>}
                                </div>
                                <div className="col-start-3 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="eventCountryAddress">Country</Label> 
                                    <Input name="eventCountryAddress" />
                                    {!!error?.eventCountryAddress && <em className="text-base text-red-700">{error.eventCountryAddress}</em>}
                                </div>
                            </div>
                        </div>

                        <div className="text-lg mb-2">
                            <p className="border-t-2 pt-4">Code</p>
                            <CardDescription className="mb-6">{"Your wedding code (if you have one)"}</CardDescription>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-start-2 col-end-4 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="eventCode">Code of your wedding event</Label> 
                                    <Input name="eventCode" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-lg mb-2">
                            <p className="border-t-2 pt-4">Other</p>
                            <CardDescription className="mb-6">{"(optional)"}</CardDescription>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-start-2 col-end-4 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="other">Additional information</Label>
                                    <Textarea name="other"/>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </CardContent>
            <CardFooter className="grid grid-cols-3 gap-4">
            <Link to={`/${currentUserUID}/events`} className="col-start-2"><Button className="w-full" variant="outline">Cancel</Button></Link>
                <Button type="submit" form="EventForm">Add</Button>
            </CardFooter>
        </Card>
    )
}