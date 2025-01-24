import Navbar from '@/components/layouts/navbar';
import Link from 'next/link';

const expeditions = [
  {
    id: 1,
    name: 'Deep Sea Adventure',
    date: '2023-08-15',
    price: 1500,
    availableSlots: 5,
  },
  {
    id: 2,
    name: 'Coral Reef Exploration',
    date: '2023-09-01',
    price: 1200,
    availableSlots: 3,
  },
  {
    id: 3,
    name: 'Underwater Volcano Tour',
    date: '2023-09-15',
    price: 1800,
    availableSlots: 2,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-8">
          Undersea Expeditions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expeditions.map((expedition) => (
            <div
              key={expedition.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                {expedition.name}
              </h2>
              <p className="text-gray-600 mb-2">Date: {expedition.date}</p>
              <p className="text-gray-600 mb-2">Price: ${expedition.price}</p>
              <p className="text-gray-600 mb-4">
                Available Slots: {expedition.availableSlots}
              </p>
              <Link
                href={`/book/${expedition.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
