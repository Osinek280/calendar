import CalendarForm from "../components/form";

export default function CalendarListPage() {
  const hasCalendar = false;

  return (
    <main className="flex flex-col flex-grow">
      <div className="flex-grow overflow-hidden">
        {hasCalendar ? (
          <p>calendar list: </p>
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center h-full text-center text-gray-500">
            <p className="text-3xl">There are no calendars.</p>
            <p>
              You can use the Web version if you have at least one TimeTree
              shared calendar. <br /> You can't use OS calendar in the Web
              version.
            </p>
            <CalendarForm />
          </div>
        )}
      </div>
    </main>
  );
}

