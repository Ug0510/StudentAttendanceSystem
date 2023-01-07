import "./styles.css";
import AttendanceSytem from "./AttendanceForm/AttendanceSystem";
import Header from "./Header/header";

export default function App() {
  return (
    <div className="main">
      <Header />
      <h2 className="heading">Attendance Form</h2>
      <AttendanceSytem />
    </div>
  );
}
