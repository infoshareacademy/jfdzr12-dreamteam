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

function getRandomCode(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const EventForm = (): React.ReactElement => {

    const [brideName, setBrideName] = useState<string>('');
    const [groomName, setGroomName] = useState<string>('');
    const [eventDate, setEventDate] = useState<string>('');
    const [eventTime, setEventTime] = useState<string>('');
    const [ceremonyPlace, setCeremonyPlace] = useState<string>('');
    const [ceremonyAddress, setCeremonyAddress] = useState<string>('');
    const [receptionPlace, setReceptionPlace] = useState<string>('');
    const [receptionAddress, setReceptionAddress] = useState<string>('');
    const [brideNumber, setBrideNumber] = useState<string>('');
    const [groomNumber, setGroomNumber] = useState<string>('');
    const [leadColor, setLeadColor] = useState<string>('');

    const handleOnClick = () => {
        console.log(getRandomCode(1000, 9000));
    }

    console.log(brideName, groomName, eventDate, eventTime, ceremonyPlace, ceremonyAddress, receptionPlace, receptionAddress, brideNumber, groomNumber, leadColor)

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
                                        <Input name='bride_name' value={brideName} onChange={(e) => setBrideName(e.target.value)}/>
                                    </div>
                                    <div className='flex flex-col space-y-1.5'>
                                        <Label>Groom's</Label>
                                        <Input name='groom_name' value={groomName} onChange={(e) => setGroomName(e.target.value)}/>
                                    </div>
                                </div>
                            </legend>

                            <legend className='text-lg font-bold mb-2'>Event
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Date</Label>
                                        <DatePicker value={eventDate} onSelectDate={setEventDate}/>
                                    </div>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Time</Label>
                                        <Input name='event_time' value={eventTime} onChange={(e) => setEventTime(e.target.value)}/>
                                    </div>
                                </div>
                            </legend>

                            <legend className='text-lg font-bold mb-2'>Ceremony
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Place</Label>
                                        <Input name='ceremony_place' value={ceremonyPlace} onChange={(e) => setCeremonyPlace(e.target.value)}/>
                                    </div>
                                    <div className='flex flex-col space-y-1.5'>
                                        <Label>Address</Label>
                                        <Input name='ceremony_address' type='address' value={ceremonyAddress} onChange={(e) => setCeremonyAddress(e.target.value)}/>
                                    </div>
                                </div>
                            </legend>

                            <legend className='text-lg font-bold mb-2'>Reception
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Place</Label>
                                        <Input name='reception_place' value={receptionPlace} onChange={(e) => setReceptionPlace(e.target.value)}/>
                                    </div>
                                    <div className='flex flex-col space-y-1.5 mb-5'>    
                                        <Label>Address</Label>
                                        <Input name='reception_address' type='address' value={receptionAddress} onChange={(e) => setReceptionAddress(e.target.value)}/> 
                                    </div>
                                </div>
                            </legend>

                            <legend className='text-lg font-bold mb-2'>Phone numbers
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Bride's</Label>
                                        <Input name='bride_number' type='tel' value={brideNumber} onChange={(e) => setBrideNumber(e.target.value)}/>
                                    </div>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Groom's</Label>
                                        <Input name='groom_number' type='tel' value={groomNumber} onChange={(e) => setGroomNumber(e.target.value)}/>
                                    </div>
                                </div>
                            </legend>

                            <legend className='text-lg font-bold mb-2'>Other
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex flex-col space-y-1.5 mb-5'>
                                        <Label>Lead color</Label>
                                        <Input name='lead_color' type='color' value={leadColor} onChange={(e) => setLeadColor(e.target.value)}/>
                                    </div>
                                </div>
                            </legend>

                        </div>
                    </fieldset>
                </form>
            </CardContent>
            <CardFooter className='grid grid-cols-2 gap-4'>
                <Button className='w-full'>Cancel</Button>
                <Button type='submit' className='w-full' onClick={handleOnClick}>Add your event</Button>
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

