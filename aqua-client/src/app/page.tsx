import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Dive into Adventure with AquaExplore
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Experience the wonders of the deep sea through our submersible
              expeditions
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/user/dashboard">Explore Expeditions</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose AquaExplore?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Unique Expeditions"
                description="Discover breathtaking underwater landscapes and marine life"
              />
              <FeatureCard
                title="Expert Guides"
                description="Learn from experienced marine biologists and oceanographers"
              />
              <FeatureCard
                title="State-of-the-art Submersibles"
                description="Enjoy comfort and safety with our modern fleet"
              />
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              About AquaExplore
            </h2>
            <p className="text-lg text-center max-w-3xl mx-auto">
              AquaExplore is a leading provider of undersea submersible
              expeditions. Our mission is to make the wonders of the deep sea
              accessible to adventurers and researchers alike. With a focus on
              safety, education, and conservation, we offer unforgettable
              journeys into the heart of the ocean.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/user/dashboard">Expeditions</Link>
              </li>
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>Email: info@aquaexplore.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-300">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-300">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 AquaExplore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
