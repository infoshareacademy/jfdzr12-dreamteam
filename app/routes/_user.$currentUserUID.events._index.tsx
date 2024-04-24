
import React from 'react';
import { AddEvent } from '~/blocks/add-event';
import { CreatedEventNav } from '~/blocks/created-event-nav';
import { CreatedRelatedEventNav } from '~/blocks/created-related-event-nav';

export default function SignInPage() {
//   return (
  
//     <>
//       <div> 
//         <AddEvent />
//         <CreatedEventNav />
//         <CreatedRelatedEventNav />
//       </div>
//     </>
//   );
// }

// return (
//   <div className="flex justify-center items-center h-screen max-w-screen-lg mx-auto">
   
//         <div className="w-1/2 pr-4">
//           <AddEvent />
//         </div>
//         <div className="w-1/2 pl-4">
//           <div>
//             <CreatedEventNav />
//           </div>
//           <div>
//             <CreatedRelatedEventNav />
//           </div>
//         </div>
//       </div>
    

// );
//}
// return (
//   <div className="flex justify-center items-center h-screen max-w-screen-lg mx-auto">
//     <div className="flex flex-col items-center w-full">
//       <div className="w-full pr-4">
//         <AddEvent />
//       </div>
//       <div className="w-full pl-4 mt-4">
//         <div>
//           <CreatedEventNav />
//         </div>
//         <div className="mt-4">
//           <CreatedRelatedEventNav />
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }


return (
  <div className=" flex justify-center items-center h-screen max-w-screen-lg mx-auto w-full pl-4 mt-4 lg:flex lg:flex-row lg:pl-0"style={{ transform: 'scale(1.5)' }}>
    <div className="flex flex-col items-center w-full">
        <div className="lg:w-1/2">
        <CreatedEventNav />
        </div>
        <div className="w-full pr-4">
        <AddEvent />
        </div>
   <CreatedRelatedEventNav />
        
    </div> 
  </div>
  
);
}

// return (
//   <div className="flex justify-center items-center h-screen max-w-screen-lg mx-auto">
//     <div className="flex flex-col w-full lg:flex-row lg:pl-0">
//       <div className="w-full lg:w-1/2">
//         <CreatedEventNav />
//       </div>
//       <div className="w-full lg:w-1/2 pr-4">
//         <AddEvent />
//       </div>
//       <div className="w-full lg:w-1/2">
//         <CreatedRelatedEventNav />
//       </div>
//     </div>
//   </div>
// );
// }