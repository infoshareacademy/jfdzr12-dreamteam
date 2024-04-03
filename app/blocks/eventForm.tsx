// imiona państwa młodych - zaciągane z formularza rejestracji
// data wydarzenia
// godzina
// ceremonia - nazwa miejsca, adres
// wesele - nazwa miejsca, adres
// kolor przewodni
// kod wydarzenia
// numery telefonów pary młodej

import React, { useState } from 'react';
import { Button } from '~/atoms/ui/button'
import { Input } from '~/atoms/ui/input';
import { Label } from '~/atoms/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/atoms/ui/card';
import { DatePicker } from './datePicker';
import errorsToRecord from '@hookform/resolvers/io-ts/dist/errorsToRecord.js';
import { Alert } from '~/atoms/ui/alert';
import { validateInputsPhoneNumbers, validateInputTimeFormat, validateInputsStringValues } from '~/lib/utils';

// const formField = {
//     Names: {
//         brideNameLabel: "Bride's",
//         brideNameInput: "brideName",
//         groomNameLabel: "Groom's",
//         groomNameInput: "groomName",
//     },
//     Event: {
//         eventDateLabel: "Date",
//         eventDateInput: "eventDate",
//         eventTimeLabel: "Time",
//         eventTimeInput: "eventTime",
//     },
//     Ceremony: {
//         ceremonyPlaceLabel: "Place",
//         ceremonyPlaceInput: "ceremonyPlace",
//         ceremonyAddressLabel: "Address",
//         ceremonyAddressInput: "ceremonyAddress",
//     },
//     Reception: {
//         receptionPlaceLabel: "Place",
//         receptionPlaceInput: "receptionPlace",
//         receptionAddressLabel: "Address",
//         receptionAddressInput: "receptionAddress",
//     },
//     PhoneNumbers: {  // Zmieniono na "PhoneNumbers"
//         brideNumberLabel: "Bride's",
//         brideNumberInput: "brideNumber",
//         groomNumberLabel: "Groom's",
//         groomNumberInput: "groomNumber",
//     },
//     Other: {
//         leadColorLabel: "Lead color",
//         leadColorInput: "leadColor",
//     }
// }

interface EventFormData {
    brideName: string;
    groomName: string;
    eventDate: Date | undefined;
    eventTime: string;
    ceremonyPlace: string;
    ceremonyAddress: string;
    receptionPlace: string;
    receptionAddress: string;
    brideNumber: string;
    groomNumber: string;
    leadColor: string;
}

interface InputsErrors {
    [key: string]: string;
}

export const EventForm = (): React.ReactElement => {

    const [formData, setFormData] = useState<EventFormData>({
        brideName: '',
        groomName: '',
        eventDate: undefined,
        eventTime: '',
        ceremonyPlace: '',
        ceremonyAddress: '',
        receptionPlace: '',
        receptionAddress: '',
        brideNumber: '',
        groomNumber: '',
        leadColor: '',
    })

    const [inputsErrors, setInputsErrors] = useState<InputsErrors>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        const newErrors: InputsErrors = {};
    
        if (!formData.brideName.trim()) {
            newErrors.brideName = "Enter bride's name";
        } else if (!validateInputsStringValues(formData.brideName)) {
            newErrors.brideName = 'Use at least two letters'
        }
        if (!formData.groomName.trim()) {
            newErrors.groomName = "Enter groom's name";
        } else if (!validateInputsStringValues(formData.groomName)) {
            newErrors.groomName = 'Use at least two letters'
        }
        if (!formData.eventDate) {
            newErrors.eventDate = 'Select date';
        }
        if (!formData.eventTime.trim()) {
            newErrors.eventTime = 'Enter event time';
        } else if (!validateInputTimeFormat(formData.eventTime)) {
            newErrors.eventTime = 'Time format is 00:00'
        }
        if (!formData.ceremonyPlace.trim()) {
            newErrors.ceremonyPlace = 'Enter ceremony place';
        } else if (!validateInputsStringValues(formData.ceremonyPlace)) {
            newErrors.ceremonyPlace = 'Use at least two letters'
        }
        if (!formData.ceremonyAddress.trim()) {
            newErrors.ceremonyAddress = 'Enter ceremony address';
        }
        if (!formData.receptionPlace.trim()) {
            newErrors.receptionPlace = 'Enter reception place';
        } else if (!validateInputsStringValues(formData.receptionPlace)) {
            newErrors.receptionPlace = 'Use at least two letters'
        }
        if (!formData.receptionAddress.trim()) {
            newErrors.receptionAddress = 'Enter reception address';
        }
        if (!formData.brideNumber.trim()) {
            newErrors.brideNumber = "Enter bride's number";
        } else if (!validateInputsPhoneNumbers(formData.brideNumber)) {
            newErrors.brideNumber = 'Use at least 6 digits.'
        }
        if (!formData.groomNumber.trim()) {
            newErrors.groomNumber = "Enter groom's number";
        } else if (!validateInputsPhoneNumbers(formData.groomNumber)) {
            newErrors.groomNumber = 'Use at least 6 digits.'
        }
        if (!formData.leadColor.trim()) {
            newErrors.leadColor = 'Select lead color of your event';
        }
    
        if (Object.keys(newErrors).length > 0) {
            setInputsErrors(newErrors);
            console.log('Errors:', inputsErrors);
            return;
        }
    
        console.log('Form submitted successfully')
    };

    console.log(formData)

    // obliczenie lczby dni pozostałych do wydarzenia
    const today = new Date();
    if(formData.eventDate) {
        const timeDifference = formData.eventDate.getTime() - today.getTime();
        const daysToEvent = Math.floor(timeDifference / (1000 * 3600 * 24));
        console.log(`Do ślubu pozostało: ${daysToEvent} dni`);
    }

    return (
        <Card className='w-full max-w-screen-lg'>
            <CardHeader>
                <CardTitle className='text-center'>Your dream event</CardTitle>
            </CardHeader>
            <CardContent>
                <form id='EventForm' /*onSubmit={handleSubmit}*/>
                    <fieldset>
                        
                        <div className='w-full'>

                            <legend className='text-lg font-bold mb-2'>Names
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Bride's</Label>
                                        <Input 
                                            name='bride_name' 
                                            value={formData.brideName} 
                                            onChange={(e) => setFormData(data => ({...data, brideName: e.target.value}))}
                                            required
                                        />
                                        {inputsErrors.brideName && <div className="text-red-500">{inputsErrors.brideName}</div>}
                                    </div>
                                    <div className='flex flex-col space-y-1.5'>
                                        <Label>Groom's</Label>
                                        <Input 
                                            name='groom_name' 
                                            value={formData.groomName} 
                                            onChange={(e) => setFormData(data => ({...data, groomName: e.target.value}))}
                                            required
                                        />
                                        {inputsErrors.groomName && <div className="text-red-500">{inputsErrors.groomName}</div>}
                                    </div>
                                </div>
                            </legend>

                            <legend className='text-lg font-bold mb-2'>Event
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Date</Label>
                                        <DatePicker 
                                            value={formData.eventDate} 
                                            onSelectDate={(date) => setFormData (data => ({...data, eventDate: date}))}
                                        />
                                        {inputsErrors.eventDate && <div className="text-red-500">{inputsErrors.eventDate}</div>}
                                    </div>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Time</Label>
                                        <Input 
                                            name='event_time' 
                                            value={formData.eventTime} 
                                            onChange={(e) => setFormData(data => ({...data, eventTime: e.target.value}))}
                                            required
                                        />
                                        {inputsErrors.eventTime && <div className="text-red-500">{inputsErrors.eventTime}</div>}
                                    </div>
                                </div>
                            </legend>

                            <legend className='text-lg font-bold mb-2'>Ceremony
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Place</Label>
                                        <Input 
                                            name='ceremony_place' 
                                            value={formData.ceremonyPlace} 
                                            onChange={(e) => setFormData(data => ({...data, ceremonyPlace: e.target.value}))}
                                            required
                                        />
                                        {inputsErrors.ceremonyPlace && <div className="text-red-500">{inputsErrors.ceremonyPlace}</div>}
                                    </div>
                                    <div className='flex flex-col space-y-1.5'>
                                        <Label>Address</Label>
                                        <Input 
                                            name='ceremony_address' 
                                            type='address' 
                                            value={formData.ceremonyAddress} 
                                            onChange={(e) => setFormData(data => ({...data, ceremonyAddress: e.target.value}))}
                                            required
                                        />
                                        {inputsErrors.ceremonyAddress && <div className="text-red-500">{inputsErrors.ceremonyAddress}</div>}
                                    </div>
                                </div>
                            </legend>

                            <legend className='text-lg font-bold mb-2'>Reception
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Place</Label>
                                        <Input 
                                            name='reception_place' 
                                            value={formData.receptionPlace} 
                                            onChange={(e) => setFormData(data => ({...data, receptionPlace: e.target.value}))}
                                            required
                                        />
                                        {inputsErrors.receptionPlace && <div className="text-red-500">{inputsErrors.receptionPlace}</div>}
                                    </div>
                                    <div className='flex flex-col space-y-1.5 mb-5'>    
                                        <Label>Address</Label>
                                        <Input 
                                            name='reception_address' 
                                            type='address' 
                                            value={formData.receptionAddress} 
                                            onChange={(e) => setFormData(data => ({...data, receptionAddress: e.target.value}))}
                                            required
                                        /> 
                                        {inputsErrors.receptionAddress && <div className="text-red-500">{inputsErrors.receptionAddress}</div>}
                                    </div>
                                </div>
                            </legend>

                            <legend className='text-lg font-bold mb-2'>Phone numbers
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Bride's</Label>
                                        <Input 
                                            name='bride_number' 
                                            type='tel' 
                                            value={formData.brideNumber} 
                                            onChange={(e) => setFormData(data => ({...data, brideNumber: e.target.value}))}
                                            required
                                        />
                                        {inputsErrors.brideNumber && <div className="text-red-500">{inputsErrors.brideNumber}</div>}
                                    </div>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Groom's</Label>
                                        <Input 
                                            name='groom_number' 
                                            type='tel' 
                                            value={formData.groomNumber} 
                                            onChange={(e) => setFormData(data => ({...data, groomNumber: e.target.value}))}
                                            required
                                        />
                                        {inputsErrors.groomNumber && <div className="text-red-500">{inputsErrors.groomNumber}</div>}
                                    </div>
                                </div>
                            </legend>

                            <legend className='text-lg font-bold mb-2'>Other
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Lead color</Label>
                                        <Input 
                                            name='lead_color' 
                                            type='color' 
                                            value={formData.leadColor} 
                                            onChange={(e) => setFormData(data => ({...data, leadColor: e.target.value}))}
                                            required
                                        />
                                        {inputsErrors.leadColor && <div className="text-red-500">{inputsErrors.leadColor}</div>}
                                    </div>
                                </div>
                            </legend>

                        </div>
                    </fieldset>
                </form>

            </CardContent>
            <CardFooter className='grid grid-cols-2 gap-4'>
                <Button className='w-full'>Cancel</Button>
                <Button type='submit' form='EventForm' className='w-full' onClick={handleSubmit}>Add your event</Button>
            </CardFooter>
        </Card>
    );
};





// export const EventForm = (): React.ReactElement => {

//     const [brideName, setBrideName] = useState<string>('');
//     const [groomName, serGroomName] = useState<string>('');
//     const [eventDate, setEventDate] = useState<string>('');
//     const [eventTime, setEventTime] = useState<string>('');
//     const [ceremonyPlace, setCeremonyPlace] = useState<string>('');
//     const [ceremonyAddress, setCeremonyAddress] = useState<string>('');
//     const [receptionPlace, setReceptionPlace] = useState<string>('');
//     const [receptionAddress, setReceptionAddress] = useState<string>('');
//     const [brideNumber, setBrideNumber] = useState<string>('');
//     const [groomNumber, setGroomNumber] = useState<string>('');
//     const [leadColor, setLeadColor] = useState<string>('');


// interface Field {
//     label: string;
//     name: string;
//     type?: string;
//     onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// interface FormDataSection {
//     title: string;
//     fields: Field[];
// }


// const formData: FormDataSection[] = [
//         {
//         title: 'Names',
//         fields: [
//             { label: "Bride's", name: 'bride_name', onChange: (e) => setBrideName(e.target.value) },
//             { label: "Groom's", name: 'groom_name' }
//         ]
//         },
//         {
//         title: 'Event',
//         fields: [
//             { label: 'Date', name: 'event_date', type: 'date' },
//             { label: 'Time', name: 'event_time', type: 'number' }
//         ]
//         },
//         {
//         title: 'Ceremony',
//         fields: [
//             { label: 'Place', name: 'ceremony_place' },
//             { label: 'Address', name: 'ceremony_address', type: 'address' }
//         ]
//         },
//         {
//         title: 'Reception',
//         fields: [
//             { label: 'Place', name: 'reception_place' },
//             { label: 'Address', name: 'reception_address', type: 'address' }
//         ]
//         },
//         {
//         title: 'Phone numbers',
//         fields: [
//             { label: "Bride's", name: 'bride_number', type: 'tel' },
//             { label: "Groom's", name: 'groom_number', type: 'tel' }
//         ]
//         },
//         {
//         title: 'Other',
//         fields: [
//             { label: 'Lead color', name: 'lead_color', type: 'color' },
//             // { label: 'Unique event code', name: 'event_code' }
//         ]
//         }
//     ];


//     function handleOnClick() {
//         const eventCode = getRandomCode(1000, 9000);
//         console.log(eventCode)
//     }


//     return (
//         <Card className='w-full max-w-screen-lg'>
//             <CardHeader>
//                 <CardTitle className='text-center'>Your dream event</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <form>
//                     {formData.map((section) => (
//                         <fieldset key={section.title}>
//                         <legend className='text-lg font-bold mb-2 text-center'>{section.title}</legend>
//                         <div className='grid grid-cols-2 gap-4'>
//                             {section.fields.map((field) => (
//                                 <div key={field.name} className='flex flex-col space-y-1.5 mb-5'>
//                                 <Label>{field.label}</Label>
//                                 {field.type === 'date' ? (<DatePicker />) 
//                                 : (<Input name={field.name} type={field.type || 'text'} />)} 
//                                 </div>
//                             ))}
//                         </div>
//                         </fieldset>
//                     ))}
//                 </form>
//             </CardContent>
//             <CardFooter className='grid grid-cols-2 gap-4 p-5'>
//                 <Button type='button' className='w-full'>Cancel</Button>
//                 <Button type='submit' className='w-full' onClick={handleOnClick}>Add your event</Button>
//             </CardFooter>
//         </Card>
//     );
// };

