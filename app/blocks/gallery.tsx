import { Link, useParams } from "@remix-run/react";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from "firebase/storage";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
import { Input } from "~/atoms/ui/input";
import { Label } from "~/atoms/ui/label";
import { storage } from "~/db/firebase";
import { formEventLinkStyleCancel } from "~/lib/utils";

export default function UploadFile() {
    const [url, setUrl] = useState<string[]>();
    const {eventID} = useParams();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {currentUserUID} = useParams();

    useEffect(() => {
        const storageRef = ref(storage, eventID);
        listAll(storageRef)
            .then(res => Promise.all(res.items.map(itemRef => getDownloadURL(itemRef))))
            .then(urls => setUrl(urls))
            .catch(error => console.error(error));
    }, []);

    async function handleOnSubmit(event: FormEvent) {
        event.preventDefault();

        const file = fileInputRef.current?.files?.[0];
        
        if(!file) return;

        const storageRef = ref(storage, `${eventID}/${file.name}`);
        const uploadFile = uploadBytesResumable(storageRef, file);

        uploadFile.on("state_changed", 
            (snapshot) => {console.log(snapshot)},
            (error) => {console.error(error)},
            () => {getDownloadURL(uploadFile.snapshot.ref)
                .then((downloadURL) => {
                    setUrl(prevUrls => prevUrls ? [...prevUrls, downloadURL] : [downloadURL]);
                })
                .catch((error) => console.error('Error getting download URL:', error))}
            );
        fileInputRef.current.value = "";
    }

    async function handleDelete(url: string) {
        const storageRef = ref(storage, url);
        deleteObject(storageRef)
            .then(() => {
                setUrl(prevUrls => prevUrls ? prevUrls.filter(u => u !== url) : []);
            })
            .catch((error) => console.error('Error deleting file:', error));
    }

    return (
        <>
            <Card className="w-full max-w-screen-lg mx-auto my-8">
                <CardHeader className="my-4">
                    <CardTitle className="mb-2">Your gallery</CardTitle>
                    <CardDescription>Upload your photos or inspirations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="Gallery" onSubmit={handleOnSubmit}>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-start-2 col-end-4 flex flex-col space-y-1.5 mb-5">
                                <Label>Upload file</Label>
                                <Input type="file" ref={fileInputRef}/>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="grid grid-cols-3 gap-4">
                    <Link to={`/${currentUserUID}/events`} className={formEventLinkStyleCancel}>Cancel</Link>
                    <Button type="submit" form="Gallery">Send</Button>
                </CardFooter>
            </Card>
            <div className="w-full max-w-screen-lg mx-auto my-8 grid grid-cols-2 justify-center place-items-center gap-10 mt-10 mb-5">
                {url?.map((data) => (
                    <div key={data} className="relative m-5">
                            <Button onClick={() => handleDelete(data)} className="absolute top-0 right-0">X</Button>
                            <img src={data} className="h-260px w-full object-cover"/>
                    </div>))
                }
            </div>
        </>
    )
}
