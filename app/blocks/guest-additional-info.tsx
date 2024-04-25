import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from '~/atoms/ui/table';
import { NewGuest } from '~/lib/new-guest';
import { guestRefOrder } from '~/db/guest-list-ref';
import { ScrollArea, ScrollBar } from '~/atoms/ui/scroll-area';
import { useParams } from '@remix-run/react';

const Header = [
  'No.',
  'Name',
  'Menu',
  'Partner menu',
  'Child menu',
  'Additional information',
]

export const GuestAdditionalInfo = () => {

  const { eventID } = useParams()

  const [guests, setGuests] = useState<NewGuest[]>([]);

  const getGuestList = () => {
    onSnapshot(guestRefOrder, res => {
      const guestList = res.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NewGuest));
      console.log("guest list", guestList);
      const filteredGuestList = guestList.filter(guest => guest.eventID === eventID);
      setGuests(filteredGuestList);
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
            {Header.map((header, index) => (
              <TableHead key={index} className='text-center'>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest, index) => (
            <TableRow key={guest.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium ">{guest.firstName} {guest.lastName}</TableCell>
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.selectedMenuGuest}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.selectedMenuPartner}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.selectedMenuChild}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal max-w-40">{guest.formData.additionalInfo}</TableCell> : <TableCell>{null}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )

}