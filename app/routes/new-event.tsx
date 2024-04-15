import { addDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
import { DatePicker } from "~/atoms/ui/date-picker";
import { Input } from "~/atoms/ui/input";
import { Label } from "~/atoms/ui/label";
import { Textarea } from "~/atoms/ui/textarea";
import { eventRef } from "~/db/event-ref";
import { uniqueCodeGenerator } from "~/lib/utils";


interface NewEventFormData {
    firstPerson: string,
    secondPerson: string,
    eventDate: string,
    eventTime: string,
    ceremonyPlace: string,
    ceremonyAddress: string,
    receptionPlace: string,
    receptionAddress: string,
    firstPersonPhone: string,
    secondPersonPhone: string,
}

type FormErrorData<T> = Partial<Record<keyof T, string>>

export default function NewEventPage () {

    const [error, setError] = useState<FormErrorData<NewEventFormData>>();
    const [eventDate, setEventDate] = useState<Date | undefined>();

    async function handleOnSubmit(event: FormEvent) {
        if(!(event.target instanceof HTMLFormElement)) {
            return
        }
        event.preventDefault();
        const _formData = new FormData(event.target)
        console.log("_formData", _formData)
        if(eventDate) {
            _formData.append('eventDate', eventDate.toString());
        }

        const nextID = await uniqueCodeGenerator.next();
        console.log('nextID', nextID.value);
        _formData.append('eventID', String(nextID.value))

        const formData = Object.fromEntries(_formData.entries())
        console.log("submit", formData, event)

        const errors: FormErrorData<NewEventFormData> = {};

        if(!("firstPerson" in formData && typeof formData.firstPerson === "string" && formData.firstPerson.length > 2)) {
            errors.firstPerson = 'Use at least 2 characters'
        }
        if(!("secondPerson" in formData && typeof formData.secondPerson === "string" && formData.secondPerson.length > 2)) {
            errors.secondPerson = 'Use at least 2 characters'
        }
        if(!("eventDate" in formData)) {
            errors.eventDate = 'Enter event date'
        }
        if(!("eventTime" in formData && typeof formData.eventTime === "string" && formData.eventTime.length > 2)) {
            errors.eventTime = 'Enter event time'
        }
        if(!("ceremonyPlace" in formData && typeof formData.ceremonyPlace === "string" && formData.ceremonyPlace.length > 2)) {
            errors.ceremonyPlace = 'Enter ceremony place, use at least 2 characters'
        }
        if(!("ceremonyAddress" in formData && typeof formData.ceremonyAddress === "string" && formData.ceremonyAddress.length > 2)) {
            errors.ceremonyAddress = 'Enter ceremony address, use at least 2 characters'
        }
        if(!("receptionPlace" in formData && typeof formData.receptionPlace === "string" && formData.receptionPlace.length > 2)) {
            errors.receptionPlace = 'Enter reception place, use at least 2 characters'
        }
        if(!("receptionAddress" in formData && typeof formData.receptionAddress === "string" && formData.receptionAddress.length > 2)) {
            errors.receptionAddress = 'Enter reception address, use at least 2 characters'
        }
        if(!("firstPersonPhone" in formData && typeof formData.firstPersonPhone === "string" && formData.firstPersonPhone.length >= 6)) {
            errors.firstPersonPhone = "Enter first person's number. Use at least 6 numbers"
        }
        if(!("secondPersonPhone" in formData && typeof formData.secondPersonPhone === "string" && formData.secondPersonPhone.length >= 6)) {
            errors.secondPersonPhone = "Enter second person's number. Use at least 6 numbers"
        }

        setError(errors)
        
        addDoc(eventRef, formData)
    
    }

    return (
        <Card className='w-full max-w-screen-lg'>
            <CardHeader>
                <CardTitle className='text-center'>Your dream event</CardTitle>
            </CardHeader>
            <CardContent>
                <form id='EventForm' onSubmit={handleOnSubmit}>
                    <div className='w-full'>
                        <div className='text-lg font-bold mb-2'><p>Names</p>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex flex-col space-y-1.5 mb-5'>
                                    <Label>First person 
                                        <Input name='firstPerson'/>
                                        {!!error?.firstPerson && <em>{error.firstPerson}</em>}
                                    </Label>
                                </div>
                                <div className='flex flex-col space-y-1.5 mb-5'>
                                    <Label>Second person 
                                        <Input name='secondPerson'/>
                                        {!!error?.secondPerson && <em>{error.secondPerson}</em>}
                                    </Label>
                                </div>
                            </div>
                        </div>
                        

                        <div className='text-lg font-bold mb-2'><p>Event</p>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex flex-col space-y-1.5 mb-5'>
                                    <Label>Date 
                                    <DatePicker 
                                            value={eventDate}
                                            onSelectDate={(date) => setEventDate(date)}
                                        />
                                    </Label>
                                </div>
                                <div className='flex flex-col space-y-1.5 mb-5'>
                                    <Label>Time 
                                        <Input name='eventTime' type='time'/>
                                        {!!error?.eventTime && <em>{error.eventTime}</em>}
                                    </Label>
                                </div>
                            </div>
                        </div>

                        <div className='text-lg font-bold mb-2'><p>Ceremony</p>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex flex-col space-y-1.5 mb-5'>
                                    <Label>Place 
                                        <Input name='ceremonyPlace' />
                                        {!!error?.ceremonyPlace && <em>{error.ceremonyPlace}</em>}
                                    </Label>
                                </div>
                                <div className='flex flex-col space-y-1.5 mb-5'>
                                    <Label>Address 
                                        <Textarea name='ceremonyAddress' />
                                        {!!error?.ceremonyAddress && <em>{error.ceremonyAddress}</em>}
                                    </Label>
                                </div>
                            </div>
                        </div>

                        <div className='text-lg font-bold mb-2'><p>Reception</p>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex flex-col space-y-1.5 mb-5'>
                                    <Label>Place 
                                        <Input name='receptionPlace' />
                                        {!!error?.receptionPlace && <em>{error.receptionPlace}</em>}
                                    </Label>
                                </div>
                                <div className='flex flex-col space-y-1.5 mb-5'>
                                    <Label>Address 
                                        <Textarea name='receptionAddress' />
                                        {!!error?.receptionAddress && <em>{error.receptionAddress}</em>}
                                    </Label>
                                </div>
                            </div>
                        </div>

                        <div className='text-lg font-bold mb-2'><p>Phone numbers</p>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex flex-col space-y-1.5 mb-5'>
                                    <Label>First person 
                                        <Input name='firstPersonPhone' type='tel' />
                                        {!!error?.firstPersonPhone && <em>{error.firstPersonPhone}</em>}
                                    </Label>
                                </div>
                                <div className='flex flex-col space-y-1.5 mb-5'>
                                    <Label>Second person
                                        <Input name='secondPersonPhone' type='tel' />
                                        {!!error?.secondPersonPhone && <em>{error.secondPersonPhone}</em>}
                                    </Label>
                                </div>
                            </div>
                        </div>

                        <div className='text-lg font-bold mb-2'><p>Other</p>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='flex flex-col space-y-1.5 mb-5'>
                                    <Label>Lead color 
                                        <Input name='color' type='color' />
                                    </Label>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </CardContent>
            <CardFooter className='grid grid-cols-2 gap-4'>
                <Button className='w-full'>Cancel</Button>
                <Button type='submit' form='EventForm' className='w-full'>Add your event</Button>
            </CardFooter>
        </Card>
    )
}