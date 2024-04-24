import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from '~/atoms/ui/table';
import { NewGuest } from '~/type/new-guest';
import { guestRefOrder } from '~/db/guest-list-ref';

const guestPrefHeader = [
  'Partner',
  'Children',
  'Menu',
  'Partner menu',
  'Child menu',
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
        {guests.map((guest) => (
          <TableRow key={guest.id}>
            <TableCell className="font-medium ">{guest.firstName} {guest.lastName}</TableCell>
            {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.partner}</TableCell> : <TableCell>{null}</TableCell>}
            {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.numberOfChildren}</TableCell> : <TableCell>{null}</TableCell>}
            {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.selectedMenuGuest}</TableCell> : <TableCell>{null}</TableCell>}
            {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.selectedMenuPartner}</TableCell> : <TableCell>{null}</TableCell>}
            {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.selectedMenuChild}</TableCell> : <TableCell>{null}</TableCell>}
            {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.transport}</TableCell> : <TableCell>{null}</TableCell>}
            {guest.formData ? <TableCell className="font-medium text-center font-normal">{guest.formData.alcohols}</TableCell> : <TableCell>{null}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

}