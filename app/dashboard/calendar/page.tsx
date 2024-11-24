import { Calendar } from "./components/calendar";

export default function CalendarPage () {
  return(
    <main className="flex flex-col flex-grow">
      <div className="flex-grow overflow-hidden">
        <Calendar />
      </div>
    </main>
  )
}