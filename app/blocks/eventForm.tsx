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
    [key: string]: string | Date;
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

    const [errors, setErrors] = useState<InputsErrors>({});

    const handleSubmit = (e: React.FormEvent) => {
    
        if (!formData.eventDate) {
            alert('Please select a date.');
            return;
        }
    

    };

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
                <form>
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
                                    </div>
                                    <div className='flex flex-col space-y-1.5'>
                                        <Label>Groom's</Label>
                                        <Input 
                                            name='groom_name' 
                                            value={formData.groomName} 
                                            onChange={(e) => setFormData(data => ({...data, groomName: e.target.value}))}
                                            required
                                        />
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
                                    </div>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Time</Label>
                                        <Input 
                                            name='event_time' 
                                            value={formData.eventTime} 
                                            onChange={(e) => setFormData(data => ({...data, eventTime: e.target.value}))}
                                            required
                                        />
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
                                    </div>
                                </div>
                            </legend>

                        </div>
                    </fieldset>
                </form>
            </CardContent>
            <CardFooter className='grid grid-cols-2 gap-4'>
                <Button className='w-full'>Cancel</Button>
                <Button type='button' className='w-full'>Add your event</Button>
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

