import { Button } from "~/atoms/ui/button";
import { Link } from "@remix-run/react";




export function AddEvent() {
  return (
    <>
      <div className="container">
        <div className="left-section section mt-10">
          <h2>Your Wedding<span className="ml-2">&#9829;</span></h2>
          <Link to="new-event">
          <Button className="add-button" variant="outline">
              Add Your Wedding Event 
            </Button>
          </Link>
        </div>
        <div className="right-section section mt-10">
          <h2>Related Event<span className="ml-2">&#9829;</span></h2>
          <Link to="new-related-event">
            <Button className="add-button" variant="outline" >
            Add Related Event
            </Button>
          </Link>
        </div>
      </div>
      <style>{`
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 40px; 
          
          
        .section {
          flex: 1;
          text-align: center;
      
      
  
        }

        .add-button {
          display: block;
          width: 85%;
          margin: 30px auto;
      
        }
      `}</style>
    </>
  );
}

