import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { db } from '~/db/firebase'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from '~/atoms/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '~/atoms/ui/dropdown-menu';
import { Button } from '~/atoms/ui/button';
import { MoreHorizontal } from 'lucide-react';

interface Guest {
  _id: string;
  guestID: string
  email: string;
  firstName: string;
  lastName: string;
}

export const GuestListTable = () => {
  const [guests, setGuests] = useState<Guest[]>([]);

  const getGuestList = () => {
    const guestListCollection = collection(db, 'guestlist');
    onSnapshot(guestListCollection, res => {
      const guestList = res.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
      } as Guest));
      setGuests(guestList);
    });
  };

  useEffect(() => {
    getGuestList();
  }, []);

  const handleDelete = (id: string) => {
    const guestRef = doc(db, 'guestlist', id);
    deleteDoc(guestRef)
      .then(() => {
        console.log("Document deleted successfully");
      })
      .catch(error => {
        console.log("Error deleting document: ", error);
      });
  }

  return (
    <Card className="w-9/12 mt-5 mb-6 mx-auto dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Guest list</CardTitle>
        <CardDescription>Manage your guests and check their survey responses.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.map(guest => (
              <TableRow key={guest._id}>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(guest._id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong>{" "}
          products
        </div>
      </CardFooter>
    </Card >
  )

}