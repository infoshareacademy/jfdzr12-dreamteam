import { onSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { db } from '~/db/firebase'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from '~/atoms/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '~/atoms/ui/dropdown-menu';
import { Button } from '~/atoms/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { NewGuest } from '~/type/new-guest';
import { guestRef } from '~/db/guest-list-ref';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '~/atoms/ui/tabs';

export const GuestListTable = () => {
  const [guests, setGuests] = useState<NewGuest[]>([]);

  const getGuestList = () => {
    const guestRefOrder = query(guestRef, orderBy('timestamp', 'desc'));
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

  const handleDelete = (gId: string) => {
    const guestRefDel = doc(db, 'guestlist', gId);
    deleteDoc(guestRefDel)
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
        <CardDescription>Manage your guests and check their preferences.</CardDescription>
      </CardHeader>
      <Tabs defaultValue="guests">
        <TabsList className="grid mx-6 grid-cols-2">
          <TabsTrigger value="guests">Guest list</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="guests">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  {/* <TableHead>Last Name</TableHead> */}
                  <TableHead>Email</TableHead>
                  <TableHead>Confirmation</TableHead>
                  <TableHead>
                    <span /*className="sr-only"*/>Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map(guest => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">{guest.guestID}</TableCell>
                    <TableCell className="font-medium">{guest.firstName} {guest.lastName}</TableCell>
                    {/* <TableCell className="font-medium">{guest.lastName}</TableCell> */}
                    <TableCell className="font-medium">{guest.email}</TableCell>
                    <TableCell>test</TableCell>
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
                          {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                          <DropdownMenuItem onClick={() => handleDelete(guest.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </TabsContent>
        <TabsContent value="preferences">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-2">ID</TableHead>
                  <TableHead className="p-2">Name</TableHead>
                  <TableHead className="p-2">Test</TableHead>
                  <TableHead className="p-2">Test</TableHead>
                  <TableHead className="p-2">Test</TableHead>
                  <TableHead className="p-2">Test</TableHead>
                  <TableHead className="p-2">Test</TableHead>
                  <TableHead className="p-2">
                    <span /*className="sr-only"*/>Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map(guest => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium p-2">{guest.guestID}</TableCell>
                    <TableCell className="font-medium p-2">{guest.firstName} {guest.lastName}</TableCell>
                    <TableHead className="font-medium p-2">Test</TableHead>
                    <TableHead className="font-medium p-2">Test</TableHead>
                    <TableHead className="font-medium p-2">Test</TableHead>
                    <TableHead className="font-medium p-2">Test</TableHead>
                    <TableHead className="font-medium p-2">Test</TableHead>
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
                          {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                          <DropdownMenuItem onClick={() => handleDelete(guest.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </TabsContent>
      </Tabs>
      <CardFooter className='grid justify-end'>
        <Button >Send email to all guests</Button>
      </CardFooter>
    </Card >
  )

}