import Navbar from '@/components/layouts/navbar';

const bookings = [
  {
    id: 1,
    expeditionName: 'Deep Sea Adventure',
    date: '2023-08-15',
    status: 'Confirmed',
  },
  {
    id: 2,
    expeditionName: 'Coral Reef Exploration',
    date: '2023-09-01',
    status: 'Pending',
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-8">Your Bookings</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Expedition</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="px-6 py-4">{booking.expeditionName}</td>
                  <td className="px-6 py-4">{booking.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
