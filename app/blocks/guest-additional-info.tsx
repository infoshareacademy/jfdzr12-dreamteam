import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from '~/atoms/ui/table';
import { NewGuest } from '~/type/new-guest';
import { guestRefOrder } from '~/db/guest-list-ref';

const Header = [
  'Name',
  'Additional information',
]

export const GuestAdditionalInfo = () => {
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
          {Header.map((header, index) => (
            <TableHead key={index} >{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {guests.map((guest) => (
          <TableRow key={guest.id}>
            <TableCell className="font-medium ">{guest.firstName} {guest.lastName}</TableCell>
            {guest.formData ? <TableCell className="font-medium font-normal">{guest.formData.aditionalInfo}</TableCell> : <TableCell>{null}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

}