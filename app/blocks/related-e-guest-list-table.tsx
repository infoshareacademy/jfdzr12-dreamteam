import { onSnapshot, deleteDoc, doc, } from 'firebase/firestore'
import { db } from '~/db/firebase'
import { useEffect, useState } from 'react';
import { useParams } from '@remix-run/react';
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from '~/atoms/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '~/atoms/ui/dropdown-menu';
import { Button } from '~/atoms/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { RelatedEventNewGuest } from '~/lib/new-guest';
import { relatedEventGuestRefOrder } from '~/db/related-e-guest-list-ref';
import { ScrollArea, ScrollBar } from '~/atoms/ui/scroll-area';


export const RelatedEventGuestListTable = () => {

  const { eventID } = useParams()

  const [relatedEvGuests, setRelatedEvGuests] = useState<RelatedEventNewGuest[]>([]);

  const getRelatedEventGuestList = () => {
    onSnapshot(relatedEventGuestRefOrder, res => {
      const relatedEventGuestList = res.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as RelatedEventNewGuest));
      console.log("guest list", relatedEventGuestList);
      const filteredGuestList = relatedEventGuestList.filter(guest => guest.eventID === eventID);
      setRelatedEvGuests(filteredGuestList);
    });
  };

  useEffect(() => {
    getRelatedEventGuestList();
  }, []);

  const handleDelete = (id: string) => {
    const relatedEventGuestRefDel = doc(db, 'relatedEventGuestList', id);
    deleteDoc(relatedEventGuestRefDel)
      .then(() => {
        console.log("Document deleted successfully");
      })
      .catch(error => {
        console.log("Error deleting document: ", error);
      });
  }

  return (
    <ScrollArea className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>First name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {relatedEvGuests.map((guest, index) => (
            <TableRow key={guest.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{guest.guestID}</TableCell>
              <TableCell className="font-medium">{guest.firstName}</TableCell>
              <TableCell className="font-medium">{guest.lastName}</TableCell>
              <TableCell className="font-medium">{guest.email}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      aria-haspopup="true"
                      size="icon"
                      variant="ghost"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleDelete(guest.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table >
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )

}