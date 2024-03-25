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

export const EventForm = () => {
    
    const formData = [
            {
            title: 'Names',
            fields: [
                { label: "Bride's", name: 'bride' },
                { label: "Groom's", name: 'groom' }
            ]
            },
            {
            title: 'Event',
            fields: [
                { label: 'Date', name: 'date', type: 'date' },
                { label: 'Time', name: 'time', type: 'number' }
            ]
            },
            {
            title: 'Ceremony',
            fields: [
                { label: 'Place', name: 'ceremony_place' },
                { label: 'Address', name: 'ceremony_address', type: 'address' }
            ]
            },
            {
            title: 'Reception',
            fields: [
                { label: 'Place', name: 'reception_place' },
                { label: 'Address', name: 'reception_address', type: 'address' }
            ]
            },
            {
            title: 'Phone numbers',
            fields: [
                { label: "Bride's", name: 'bride_number', type: 'tel' },
                { label: "Groom's", name: 'groom_number', type: 'tel' }
            ]
            },
            {
            title: 'Other',
            fields: [
                { label: 'Lead color', name: 'color', type: 'color' },
                { label: 'Unique event code', name: 'event_code' }
            ]
            }
        ];

    return (
        <Card className='w-full max-w-screen-lg'>
            <CardHeader>
                <CardTitle className='text-center'>Your dream event</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    {formData.map((section, index) => (
                        <fieldset key={index}>
                        <legend className='text-lg font-bold mb-2 text-center'>{section.title}</legend>
                        <div className='grid grid-cols-2 gap-4'>
                            {section.fields.map((field, fieldIndex) => (
                            <div key={fieldIndex} className='flex flex-col space-y-1.5 mb-5'>
                                <Label>{field.label}</Label>
                                <Input name={field.name} type={field.type || 'text'} />
                            </div>
                            ))}
                        </div>
                        </fieldset>
                    ))}
                    <CardFooter className='grid grid-cols-2 gap-4 p-0'>
                        <Button type='button' className='w-full'>Cancel</Button>
                        <Button type='submit' className='w-full'>Add your event</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};


// export const EventForm = () => {

//     return (
//         <Card className='w-full max-w-screen-lg'>
//             <CardHeader>
//                 <CardTitle className='text-center'>Your dream event</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <form>
//                     <fieldset>
                        
//                         <div className='w-full'>

//                             <legend className='text-lg font-bold mb-2 text-center'>Names
//                                 <div className='grid grid-cols-2 gap-4'>
//                                     <div className='flex flex-col space-y-1.5 mb-5'>
//                                         <Label>Bride's</Label>
//                                         <Input name='bride' />
//                                     </div>
//                                     <div className='flex flex-col space-y-1.5'>
//                                         <Label>Groom's</Label>
//                                         <Input name='groom' type='groom'/>
//                                     </div>
//                                 </div>
//                             </legend>

//                             <legend className='text-lg font-bold mb-2 text-center'>Event
//                                 <div className='grid grid-cols-2 gap-4'>
//                                     <div className='flex flex-col space-y-1.5 mb-5'>
//                                         <Label>Date</Label>
//                                         <Input name='date' type='date'/>
//                                     </div>
//                                     <div className='flex flex-col space-y-1.5 mb-5'>
//                                         <Label>Time</Label>
//                                         <Input name='time' type='number'/>
//                                     </div>
//                                 </div>
//                             </legend>

//                             <legend className='text-lg font-bold mb-2 text-center'>Ceremony
//                                 <div className='grid grid-cols-2 gap-4'>
//                                     <div className='flex flex-col space-y-1.5 mb-5'>
//                                         <Label>Place</Label>
//                                         <Input name='ceremony_place' />
//                                     </div>
//                                     <div className='flex flex-col space-y-1.5'>
//                                         <Label>Address</Label>
//                                         <Input name='ceremony_address' type='address'/>
//                                     </div>
//                                 </div>
//                             </legend>

//                             <legend className='text-lg font-bold mb-2 text-center'>Reception
//                                 <div className='grid grid-cols-2 gap-4'>
//                                     <div className='flex flex-col space-y-1.5 mb-5'>
//                                         <Label>Place</Label>
//                                         <Input name='reception_place' />
//                                     </div>
//                                     <div className='flex flex-col space-y-1.5 mb-5'>    
//                                         <Label>Address</Label>
//                                         <Input name='reception_address' type='address'/> 
//                                     </div>
//                                 </div>
//                             </legend>

//                             <legend className='text-lg font-bold mb-2 text-center'>Phone numbers
//                                 <div className='grid grid-cols-2 gap-4'>
//                                     <div className='flex flex-col space-y-1.5 mb-5'>
//                                         <Label>Bride's</Label>
//                                         <Input name='bride_number' type='tel' />
//                                     </div>
//                                     <div className='flex flex-col space-y-1.5 mb-5'>
//                                         <Label>Groom's</Label>
//                                         <Input name='groom_number' type='tel'/>
//                                     </div>
//                                 </div>
//                             </legend>

//                             <legend className='text-lg font-bold mb-2 text-center'>Other
//                                 <div className='grid grid-cols-2 gap-4'>
//                                     <div className='flex flex-col space-y-1.5 mb-5'>
//                                         <Label>Lead color</Label>
//                                         <Input name='color' type='color'/>
//                                     </div>
//                                     <div className='flex flex-col space-y-1.5 mb-5'>
//                                         <Label>Unique event code</Label>
//                                         <div><p>Event code:</p></div>
//                                     </div>
//                                 </div>
//                             </legend>

//                         </div>
//                     </fieldset>
//                 </form>
//             </CardContent>
//             <CardFooter className='grid grid-cols-2 gap-4'>
//                 <Button className='w-full'>Cancel</Button>
//                 <Button type='submit' className='w-full'>Add your event</Button>
//             </CardFooter>
//         </Card>
//     );
// };



