// imiona państwa młodych - zaciągane z formularza rejestracji
// data wydarzenia
// godzina
// ceremonia - nazwa miejsca, adres
// wesele - nazwa miejsca, adres
// kolor przewodni
// kod wydarzenia
// numery telefonów pary młodej

import React, { useState } from 'react';
import { Button } from "~/atoms/ui/button"
import { Input } from '~/atoms/ui/input';
import { Label } from '~/atoms/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '~/atoms/ui/card';


export const EventForm = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your dream event</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <Label>
                        Bride's name
                        <Input name='bride' />
                    </Label>
                    <Label>
                        Groom's name
                        <Input name='groom' type='groom'/>
                    </Label>
                    <Label>
                        Event date
                        <Input name='date' type='date'/>
                    </Label>
                    <Label>
                        Event time
                        <Input name='time' type='number'/>
                    </Label>
                    <Label>
                        Ceremony address
                        <Input name='place' />
                        <Input name='address' type='address'/>
                    </Label>
                    <Label>
                        Reception address
                        <Input name='place' />
                        <Input name='date' type='date'/>
                    </Label>
                    <Label>
                        Lead color
                        <Input name='color' type='color'/>
                    </Label>
                    <Label>
                        Bride's phone number
                        <Input name='bride_number' type='number' />
                    </Label>
                    <Label>
                        Groom's phone number
                        <Input name='groom_number' type='number'/>
                    </Label>
                    <Label>
                        Unique event code
                    </Label>

                    <Button type='submit'>Add your event</Button>
                </form>
            </CardContent>
        </Card>
    );
};



