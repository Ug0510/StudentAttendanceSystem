import React, { useState, useEffect } from "react";

function AttendanceSystem() {
  const [entry, setEntry] = useState([]);

  //state to store the value of input fields
  const [studentEntry, setStudentEntry] = useState({
    roll_number: "",
    name: "",
    checkinTime: "",
    checkoutTime: "",
    status: "absent"
  });

  //To provide unique key to each entry which will work as an index too
  const [count, setCount] = useState(0);

  //To count the present number of student present write now
  const [presentStudent, setPresentStudent] = useState(0);

  //funtion to handle Input in Form
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStudentEntry({ ...studentEntry, [name]: value });
  };

  //function to add the new entry to the Student List
  const handleSubmit = (e) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
    const newEntry = {
      ...studentEntry,
      checkinTime: time,
      status: "present",
      id: count
    };
    setCount(count + 1);
    setEntry([...entry, newEntry]);
    setStudentEntry({ roll_number: "", name: "" });
    setPresentStudent(presentStudent + 1);
  };

  //Function to handle checkout
  function handleCheckout(id) {
    const studentIndex = id;
    // Make a copy of the list of students
    const newEntry = [...entry];
    // Update the status and checkout time for the student
    newEntry[studentIndex] = {
      ...newEntry[studentIndex],
      status: "absent",
      checkoutTime: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      })
    };
    // Update the list of students in state
    setEntry(newEntry);
    setPresentStudent(presentStudent - 1);
  }

  useEffect(() => {
    const rows = document.querySelectorAll("tr");
    entry.forEach((student, index) => {
      if (student.status === "absent") {
        rows[index + 1].classList.add("absent");
      } else {
        rows[index + 1].classList.remove("absent");
      }
    });
  }, [entry]);

  return (
    <div className="AttendanceSystem">
      <form className="checkinForm" onSubmit={handleSubmit}>
        <label>Roll number</label>
        <input
          type="text"
          name="roll_number"
          autoComplete="off"
          onChange={handleInput}
          value={studentEntry.roll_number}
        />
        <label>Name</label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          onChange={handleInput}
          value={studentEntry.name}
        />
        <button className="checkinButton" type="submit">
          Check in
        </button>
      </form>
      <p className="PresentStudentNumber">
        Number of Students Present right now is {presentStudent}
      </p>
      <div className="StudentList">
        <h2 className="heading head2">Students List</h2>

        <table>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Present Status</th>
              <th>Check in Time</th>
              <th>Check out Time</th>
            </tr>
          </thead>
          <tbody>
            {entry.map((curElem) => {
              const {
                id,
                roll_number,
                name,
                status,
                checkinTime,
                checkoutTime
              } = curElem;
              return (
                <tr key={id}>
                  <td>{roll_number}</td>
                  <td>{name}</td>
                  <td>{status}</td>
                  <td>{checkinTime}</td>
                  <td>
                    {checkoutTime ? (
                      checkoutTime
                    ) : (
                      <button
                        className="checkoutButton"
                        onClick={() => handleCheckout(id)}
                      >
                        Check Out
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceSystem;
