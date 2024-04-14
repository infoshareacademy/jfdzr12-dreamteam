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

  const getGuestsList = async () => {
    const guestListCollection = collection(db, 'guestlist');
    getDocs(guestListCollection)
      .then(res => {
        const list = res.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setGuests(list)
      })
      .catch(e => console.error('Error getting guest list: ', error))
  }

  useEffect(() => {
    getGuestsList()
  }, [])

  return (
    <Table>
      <TableCaption>A list of your guests.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>

        <TableBody>
          {guests.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.firstname}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableHeader>
    </Table >
  )

}