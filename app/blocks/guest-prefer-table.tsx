import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from '~/atoms/ui/table';
import { NewGuest } from '~/lib/new-guest';
import { guestRefOrder } from '~/db/guest-list-ref';
import { ScrollArea, ScrollBar } from '~/atoms/ui/scroll-area';
import { useParams } from '@remix-run/react';

const guestPrefHeader = [
  'Partner',
  'Children',
  'No. of children',
  'Accommodation',
  'Transport',
  'Additional information',
]

export const GuestPreferTable = () => {

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
            <TableCell>No.</TableCell>
            <TableCell>Name</TableCell>
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
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.partner === "on" ? "yes" : "no"}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.child === "on" ? "yes" : "no"}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.numberOfChildren}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.accommodation === "on" ? "yes" : "no"}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.transport === "on" ? "yes" : "no"}</TableCell> : <TableCell>{null}</TableCell>}
              {guest.formData ? <TableCell className="font-medium text-center font-normal max-w-48">{guest.formData.additionalInfo}</TableCell> : <TableCell>{null}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table >
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )

}