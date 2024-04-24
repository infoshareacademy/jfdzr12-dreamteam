import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from '~/atoms/ui/table';
import { NewGuest } from '~/type/new-guest';
import { guestRefOrder } from '~/db/guest-list-ref';
import { ScrollBar } from '~/atoms/ui/scroll-area';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const guestPrefHeader = [
  'No.',
  'Partner',
  'Children',
  'Accommodation',
  'Transport',
  'Alcohol',
]

export const GuestPreferTable = () => {
  const [guests, setGuests] = useState<NewGuest[]>([]);

  const getGuestList = () => {
    onSnapshot(guestRefOrder, res => {
      const guestList = res.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NewGuest));
      console.log("tuturutu", guestList);
      setGuests(guestList);
    });
  };

  useEffect(() => {
    getGuestList();
  }, []);

  return (
    <ScrollArea className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {guestPrefHeader.map((header, index) => (
              <TableHead key={index} className='text-center'>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest, index) => (
            <TableRow key={guest.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium ">{guest.firstName} {guest.lastName}</TableCell>
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.partner}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.numberOfChildren}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.accommodation}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.transport}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal max-w-36">{guest.formData.alcohols[0]} {guest.formData.alcohols[1]} {guest.formData.alcohols[2]} {guest.formData.alcohols[3]} {guest.formData.alcohols[4]} {guest.formData.alcohols[5]} {guest.formData.alcohols[6]}</TableCell> : <TableCell>{null}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table >
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )

}