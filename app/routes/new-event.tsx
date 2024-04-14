import { FormEvent, useState } from "react";
import { Button } from "~/atoms/ui/button";
import { DatePicker } from "~/atoms/ui/date-picker";
import { Input } from "~/atoms/ui/input";
import { Label } from "~/atoms/ui/label";
import { Textarea } from "~/atoms/ui/textarea";


interface NewEventFormData {
    firstPerson: string,
    secondPerson: string,
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

    function handleOnSubmit(event: FormEvent) {
        if(!(event.target instanceof HTMLFormElement)) {
            return
        }
        event.preventDefault();
        const _formData = new FormData(event.target)
        console.log("_formData", _formData)
        const formData = Object.fromEntries(_formData.entries())
        console.log("submit", formData, event)

        const errors: FormErrorData<NewEventFormData> = {};

        if(!("firstPerson" in formData && typeof formData.firstPerson === "string" && formData.firstPerson.length > 2)) {
            errors.firstPerson = 'Use at least 2 characters'
        }
        if(!("secondPerson" in formData && typeof formData.secondPerson === "string" && formData.secondPerson.length > 2)) {
            errors.secondPerson = 'Use at least 2 characters'
        }
        if(!("eventTime" in formData && typeof formData.eventTime === "string" && formData.eventTime.length > 2)) {
            errors.eventTime = 'Enter event time'
        }
        if(!("ceremonyPlace" in formData && typeof formData.ceremonyPlace === "string" && formData.ceremonyPlace.length > 2)) {
            errors.ceremonyPlace = 'Enter ceremony place, use at least 2 characters'
        }
        if(!("ceremonyAddress" in formData && typeof formData.ceremonyAddress === "string" && formData.ceremonyAddress.length > 2)) {
            errors.ceremonyAddress = 'Podaj adres miejsca, w którym odbędzie się ceremonia'
        }
        if(!("receptionPlace" in formData && typeof formData.receptionPlace === "string" && formData.receptionPlace.length > 2)) {
            errors.receptionPlace = 'Podaj nazwę miejsca, w którym odbędzie się przyjęcie'
        }
        if(!("receptionAddress" in formData && typeof formData.receptionAddress === "string" && formData.receptionAddress.length > 2)) {
            errors.receptionAddress = 'Podaj adres miejsca, w którym odbędzie się przyjęcie'
        }
        if(!("firstPersonPhone" in formData && typeof formData.firstPersonPhone === "string" && formData.firstPersonPhone.length >= 6)) {
            errors.firstPersonPhone = 'Numer telefonu powinien składać się z co najmniej 6 cyfr'
        }
        if(!("secondPersonPhone" in formData && typeof formData.secondPersonPhone === "string" && formData.secondPersonPhone.length >= 6)) {
            errors.secondPersonPhone = 'Numer telefonu powinien składać się z co najmniej 6 cyfr'
        }

        setError(errors)
    }

    return (
    <form onSubmit={handleOnSubmit}>

        <div><p>Names</p>
            <Label>First person 
                <Input name='firstPerson'/>
                {/* {error?.firstPerson ? (
                    <em>{error.firstPerson}</em>
                ) : null} */}
                {!!error?.firstPerson && <em>{error.firstPerson}</em>}
            </Label>
            <Label>Second person 
                <Input name='secondPerson'/>
                {!!error?.secondPerson && <em>{error.secondPerson}</em>}
            </Label>
        </div>

        <div><p>Event</p>
            <Label>Date 
                {/* <DatePicker/> */}
            </Label>
            <Label>Time 
                <Input name='eventTime' type='time'/>
                {!!error?.eventTime && <em>{error.eventTime}</em>}
            </Label>
        </div>

        <div><p>Ceremony</p>
            <Label>Place 
                <Input name='ceremonyPlace' />
                {!!error?.ceremonyPlace && <em>{error.ceremonyPlace}</em>}
            </Label>
            <Label>Address 
                <Textarea name='ceremonyAddress' />
                {!!error?.ceremonyAddress && <em>{error.ceremonyAddress}</em>}
            </Label>
        </div>

        <div><p>Reception</p>
            <Label>Place 
                <Input name='receptionPlace' />
                {!!error?.receptionPlace && <em>{error.receptionPlace}</em>}
            </Label>
            <Label>Address 
                <Textarea name='receptionAddress' />
                {!!error?.receptionAddress && <em>{error.receptionAddress}</em>}
            </Label>
        </div>

        <div><p>Phone numbers</p>
            <Label>First person 
                <Input name='firstPersonPhone' type='tel' />
                {!!error?.firstPersonPhone && <em>{error.firstPersonPhone}</em>}
            </Label>
            <Label>Second person
                <Input name='secondPersonPhone' type='tel' />
                {!!error?.secondPersonPhone && <em>{error.secondPersonPhone}</em>}
            </Label>
        </div>

        <div><p>Other</p>
            <Label>Lead color 
                <Input name='firstPersonPhone' type='color' />
            </Label>
        </div>

        <Button type='submit'>Add your event</Button>
    </form>
    )
}