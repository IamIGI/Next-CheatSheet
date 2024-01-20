import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';
import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/EventList';

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <MainLayout>
      <h1>HomePage</h1>
      <ul>
        <li>
          <Link href="/events">EventsPage</Link>
        </li>
      </ul>
      <EventList items={featuredEvents} />
    </MainLayout>
  );
}
export default HomePage;
