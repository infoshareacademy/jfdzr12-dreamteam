// import React from 'react';
// import { Button } from "~/atoms/ui/button";
// import { Link } from "@remix-run/react";

// export function AddEvent() {
//   return (
//    <>
//     <div style={{ width: '200px', margin: 'auto auto', marginRight: 'auto' }}>
//       <Link to="new-event"> 
//         <Button style={{ display: 'block', width: '100%', marginTop: '30px', marginBottom: '30px' }} variant="outline">
//           Add Your Wedding Event
//         </Button>
//       </Link>
//       <Link to="new-related-event"> 
//         <Button style={{ display: 'block', width: '100%', marginBottom: '30px' }} variant="outline">
//           Add Related Event
//         </Button>
//       </Link>
//     </div>
//     </>
//   );
// }


import { Button } from "~/atoms/ui/button";
import { Link } from "@remix-run/react";

export function AddEvent() {
  return (
    <>
      <div className="container">
        <div className="left-section section">
          <h2>Your Wedding</h2>
          <Link to="new-event">
            <Button className="add-button" variant="outline">
              Add Your Wedding Event
            </Button>
          </Link>
        </div>
        <div className="right-section section">
          <h2>Related Event</h2>
          <Link to="new-related-event">
            <Button className="add-button" variant="outline">
              Add Related Event
            </Button>
          </Link>
        </div>
      </div>
      <style>{`
        .container {
          display: flex;
        }

        .section {
          flex: 1;
          text-align: center;
          padding: 20px;
        }

        .right-section {
          border-left: 1px solid #ccc;
        }

        .add-button {
          display: block;
          width: 80%;
          margin: 30px auto;
        }
      `}</style>
    </>
  );
}