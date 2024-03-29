import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Button } from '~/atoms/ui/button'
import { Calendar } from '~/atoms/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '~/atoms/ui/popover'

interface DatePickerProps {
    value: Date | undefined;
    onSelectDate: (date: Date) => void;
}

export function DatePicker({value, onSelectDate}: DatePickerProps) {
    const [date, setDate] = useState<Date>();

    useEffect(() => {
        if (value) {
            setDate(new Date(value));
        }
    }, [value]);

    const handleDateOnChange = (selectedDate: Date | undefined) => {
        if(selectedDate) {
        onSelectDate(selectedDate);
        setDate(selectedDate);
        }
    }

    return (
            <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={'outline'}
                className={cn(
                    'justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                )}
                >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar
                mode='single'
                selected={date}
                onSelect={handleDateOnChange}
                initialFocus
                />
            </PopoverContent>
            </Popover>
        )
}
