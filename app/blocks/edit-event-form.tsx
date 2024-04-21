import { Link, useParams } from "@remix-run/react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
import { DatePicker } from "~/atoms/ui/date-picker";
import { Input } from "~/atoms/ui/input";
import { Label } from "~/atoms/ui/label";
import { useCurrentUser } from "~/db/auth";
import { getYourEvent } from "~/db/get-your-event";
import { updateYourEvent } from "~/db/update-your-event";
import { EventData } from "~/lib/utils";


type FormErrorData<T> = Partial<Record<keyof T, string>>

export default function EditEventPage() {

    const [error, setError] = useState<FormErrorData<EventData> | null>();
    const [eventDate, setEventDate] = useState<Date | undefined>();
    const [eventData, setEventData] = useState<EventData | null>();

    // const params = useParams();
    // const eventId = params.eventID;

    const user = useCurrentUser();

    useEffect(() => {
        if(user.status === 'authenticated') {
            getYourEvent()
            .then(res => {
                const eventData = res as EventData;
                setEventData(eventData);
                setEventDate(new Date(eventData.eventDate))});
        } else {
            setEventData(null);
            setEventDate(undefined);
        }
    }, [user.status])

    async function handleOnSubmit(event: FormEvent) {
        if(!(event.target instanceof HTMLFormElement)) {
            return
        }
        event.preventDefault();

        const _formData = new FormData(event.target);
        console.log("_formData", _formData)

        if(eventDate) {
            _formData.append("eventDate", eventDate.toString());
        };

        const formData = Object.fromEntries(_formData.entries());

        const errors: FormErrorData<EventData> = {};

        if(!("firstPerson" in formData && typeof formData.firstPerson === "string" && formData.firstPerson.length >= 2)) {
            errors.firstPerson = "Enter name, use at least 2 characters"
        };
        if(!("secondPerson" in formData && typeof formData.secondPerson === "string" && formData.secondPerson.length >= 2)) {
            errors.secondPerson = "Enter name, use at least 2 characters"
        };
        if(!("eventDate" in formData)) {
            errors.eventDate = "Choose event date"
        };
        if(!("eventTime" in formData && typeof formData.eventTime === "string" && formData.eventTime.length >= 4)) {
            errors.eventTime = "Enter hours and minutes in 24-hour format"
        };
        if(!("ceremonyPlace" in formData && typeof formData.ceremonyPlace === "string" && formData.ceremonyPlace.length >= 2)) {
            errors.ceremonyPlace = "Enter ceremony place, use at least 2 characters"
        };
        if(!("ceremonyStreetAddress" in formData && typeof formData.ceremonyStreetAddress === "string" && formData.ceremonyStreetAddress.length >= 2)) {
            errors.ceremonyStreetAddress = "Enter ceremony street address, use at least 2 characters"
        };
        if(!("ceremonyCityAddress" in formData && typeof formData.ceremonyCityAddress === "string" && formData.ceremonyCityAddress.length >= 2)) {
            errors.ceremonyCityAddress = "Enter ceremony city address, use at least 2 characters"
        };
        if(!("ceremonyCountryAddress" in formData && typeof formData.ceremonyCountryAddress === "string" && formData.ceremonyCountryAddress.length >= 2)) {
            errors.ceremonyCountryAddress = "Enter ceremony country address, use at least 2 characters"
        };
        if(!("receptionPlace" in formData && typeof formData.receptionPlace === "string" && formData.receptionPlace.length >= 2)) {
            errors.receptionPlace = "Enter reception place, use at least 2 characters"
        };
        if(!("receptionStreetAddress" in formData && typeof formData.receptionStreetAddress === "string" && formData.receptionStreetAddress.length >= 2)) {
            errors.receptionStreetAddress = "Enter reception street address, use at least 2 characters"
        };
        if(!("receptionCityAddress" in formData && typeof formData.receptionCityAddress === "string" && formData.receptionCityAddress.length >= 2)) {
            errors.receptionCityAddress = "Enter reception city address, use at least 2 characters"
        };
        if(!("receptionCountryAddress" in formData && typeof formData.ceremonyCountryAddress === "string" && formData.ceremonyCountryAddress.length >= 2)) {
            errors.receptionCountryAddress = "Enter ceremony country address, use at least 2 characters"
        };
        if(!("firstPersonPhone" in formData && typeof formData.firstPersonPhone === "string" && formData.firstPersonPhone.length >= 6)) {
            errors.firstPersonPhone = "Enter first person's number. Use at least 6 numbers"
        };
        if(!("secondPersonPhone" in formData && typeof formData.secondPersonPhone === "string" && formData.secondPersonPhone.length >= 6)) {
            errors.secondPersonPhone = "Enter second person's number. Use at least 6 numbers"
        };

        setError(errors);

        if(Object.keys(errors).length !== 0) {
            return;
        } else {
            await updateYourEvent(eventData?.eventID, formData);
        }
    }

    return (
        <Card className="w-full max-w-screen-lg mx-auto my-8">
            <CardHeader>
                <CardTitle className="text-center">{`Edit your event number ${eventData?.eventID}`}</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="EventForm" onSubmit={handleOnSubmit}>
                    <div className="w-full border-b-2 pb-4">

                        <div className="text-lg font-bold mb-2"><p className="border-t-2 py-4 mb-4">Names</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-start-2 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="firstPerson" >First person name</Label> 
                                    <Input name="firstPerson" defaultValue={eventData?.firstPerson}/>
                                    {!!error?.firstPerson && <em className="text-xs">{error.firstPerson}</em>}
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="secondPerson">Second person name</Label> 
                                    <Input name="secondPerson" defaultValue={eventData?.secondPerson}/>
                                    {!!error?.secondPerson && <em className="text-xs">{error.secondPerson}</em>} 
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-lg font-bold mb-2"><p className="border-t-2 py-4 mb-4">Event</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-start-2 flex flex-col space-y-1.5 mb-5">
                                    <Label>Date</Label> 
                                    <DatePicker value={eventDate} onSelectDate={(date) => setEventDate(date)} />
                                    {!!error?.eventDate && <em className="text-xs">{error.eventDate}</em>}                                   
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="eventTime">{`Time (in 24-hour format)`}</Label> 
                                    <Input name="eventTime" type="time" defaultValue={eventData?.eventTime}/>
                                    {!!error?.eventTime && <em className="text-xs">{error.eventTime}</em>}
                                </div>
                            </div>
                        </div>

                        <div className="text-lg font-bold mb-2"><p className="border-t-2 py-4 mb-4">Ceremony</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-start-2 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="ceremonyPlace">Place name</Label> 
                                    <Input name="ceremonyPlace" defaultValue={eventData?.ceremonyPlace}/>
                                    {!!error?.ceremonyPlace && <em className="text-xs">{error.ceremonyPlace}</em>}
                                    
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="ceremonyStreetAddress">Street</Label> 
                                    <Input name="ceremonyStreetAddress" defaultValue={eventData?.ceremonyStreetAddress}/>
                                    {!!error?.ceremonyStreetAddress && <em className="text-xs">{error.ceremonyStreetAddress}</em>}
                                </div>
                                <div className="col-start-3 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="ceremonyCityAddress">City</Label> 
                                    <Input name="ceremonyCityAddress" defaultValue={eventData?.ceremonyCityAddress}/>
                                    {!!error?.ceremonyCityAddress && <em className="text-xs">{error.ceremonyCityAddress}</em>}
                                </div>
                                <div className="col-start-3 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="ceremonyCountryAddress">Country</Label> 
                                    <Input name="ceremonyCountryAddress" defaultValue={eventData?.ceremonyCountryAddress}/>
                                    {!!error?.ceremonyCountryAddress && <em className="text-xs">{error.ceremonyCountryAddress}</em>}
                                </div>
                            </div>
                        </div>

                        <div className="text-lg font-bold mb-2"><p className="border-t-2 py-4 mb-4">Reception</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-start-2 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="receptionPlace">Place name</Label>
                                    <Input name="receptionPlace" defaultValue={eventData?.receptionPlace}/>
                                    {!!error?.receptionPlace && <em className="text-xs">{error.receptionPlace}</em>}
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="receptionStreetAddress">Street</Label> 
                                    <Input name="receptionStreetAddress" defaultValue={eventData?.receptionStreetAddress}/>
                                    {!!error?.receptionStreetAddress && <em className="text-xs">{error.receptionStreetAddress}</em>}
                                </div>
                                <div className="col-start-3 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="receptionCityAddress">City</Label> 
                                    <Input name="receptionCityAddress" defaultValue={eventData?.receptionCityAddress}/>
                                    {!!error?.receptionCityAddress && <em className="text-xs">{error.receptionCityAddress}</em>}
                                </div>
                                <div className="col-start-3 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="receptionCountryAddress">Country</Label> 
                                    <Input name="receptionCountryAddress" defaultValue={eventData?.receptionCountryAddress}/>
                                    {!!error?.receptionCountryAddress && <em className="text-xs">{error.receptionCountryAddress}</em>}
                                </div>
                            </div>
                        </div>

                        <div className="text-lg font-bold mb-2"><p className="border-t-2 py-4 mb-4">Phone numbers</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-start-2 flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="firstPersonPhone">First person phone number</Label>
                                    <Input name="firstPersonPhone" type="tel" defaultValue={eventData?.firstPersonPhone}/>
                                    {!!error?.firstPersonPhone && <em className="text-xs">{error.firstPersonPhone}</em>}
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="secondPersonPhone">Second person phone number</Label>
                                    <Input name="secondPersonPhone" type="tel" defaultValue={eventData?.secondPersonPhone}/>
                                    {!!error?.secondPersonPhone && <em className="text-xs">{error.secondPersonPhone}</em>}
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </CardContent>
            <CardFooter className="grid grid-cols-3 gap-4">
                {/* <Button className="col-start-2" variant="outline">
                    <Link to="/add-event">Cancel</Link>
                </Button> */}
                <Link to="/your-event" className="col-start-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2" >
                    Cancel
                </Link>
                {/* nie wiem jak po kliknięciu i wysłaniu formularza przekierować użytkownika na inną  stronę */}
                <Button type="submit" form="EventForm" >Update event</Button>
            </CardFooter>
        </Card>
    )
}