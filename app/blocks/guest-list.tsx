import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/atoms/ui/table';

import { collection, getDocs } from 'firebase/firestore'
import { db } from '~/db/firebase'
import { useEffect, useState } from 'react';



export const GuestList = () => {
  const [guests, setGuests] = useState([]);

  const getGuestList = async () => {
    const guestListCollection = collection(db, 'guestlist');
    try {
      const querySnapshot = await getDocs(guestListCollection);
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGuests(list);
    } catch (error) {
      console.error('Error getting guest list: ', error);
    }
  };

  useEffect(() => {
    getGuestList();
  }, []);

  return (
    <Table>
      <TableCaption>A list of your guests.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {guests.map(guest => (
          <TableRow key={guest.id}>
            <TableCell>{guest.firstName}</TableCell>
            <TableCell>{guest.lastName}</TableCell>
            <TableCell>{guest.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};