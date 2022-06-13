import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { firestoredb } from "../../firebase-config";
import { Timestamp } from "firebase/firestore";

const AddShift = () => {
  const [shiftname, setShiftname] = useState();
  const [starttime, setStarttime] = useState();
  const [endtime, setEndtime] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await setDoc(
      doc(firestoredb, "miratsinsights", "peoples", "shift", String(shiftname)),
      {
        shiftname: shiftname,
        starttime: starttime,
        endtime: endtime,
      },
      {
        merge: true,
      }
    ).then(() => {
      console.log("shift added successfully");
    });
  };

  return (
    <>
      <h1>Hello world</h1>

      <form action="">
        <label htmlFor="">Shift Name</label>
        <input
          type="text"
          name="shiftname"
          onChange={(e) => {
            setShiftname(e.target.value);
          }}
          value={shiftname}
        />

        <label htmlFor="">Start Time</label>
        <input
          type="time"
          name="starttime"
          onChange={(e) => {
            setStarttime(
              new Date(
                "0",
                "0",
                "0",
                e.target.value.split(":")[0],
                e.target.value.split(":")[1]
              )
            );
          }}
        />

        <label htmlFor="">End Time</label>
        <input
          type="time"
          name="endtime"
          onChange={(e) => {
            setEndtime(
              new Date(
                "0",
                "0",
                "0",
                e.target.value.split(":")[0],
                e.target.value.split(":")[1]
              )
            );
          }}
        />

        <button type="submit" onClick={handleFormSubmit}>
          submit
        </button>
      </form>
    </>
  );
};

export default AddShift;
