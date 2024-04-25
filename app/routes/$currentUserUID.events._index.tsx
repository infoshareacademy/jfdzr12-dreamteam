
import React from 'react';
import { AddEvent } from '~/blocks/add-event';
import { CreatedEventNav } from '~/blocks/created-event-nav';
import { CreatedRelatedEventNav } from '~/blocks/created-related-event-nav';

export default function SignInPage() {


// return (
//   <div className=" flex justify-center items-center h-screen max-w-screen-lg mx-auto w-full pl-4 mt-4 lg:flex lg:flex-row lg:pl-0"style={{ transform: 'scale(1.5)' }}>
//     <div className="flex flex-col items-center w-full">
//         <div className="lg:w-1/2">
//         <CreatedEventNav />
//         </div>
//         <div className="w-full pr-4">
//         <AddEvent />
//         </div>
//    <CreatedRelatedEventNav />
        
//     </div> 
//   </div>
  
// );
// }


return (
<>

        <CreatedEventNav />
        <AddEvent />
   <CreatedRelatedEventNav />
   </>
  
);
}