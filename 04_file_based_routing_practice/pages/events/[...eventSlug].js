import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';

function FilteredEventsPage() {
  const router = useRouter();

  console.log(router.query);

  return (
    <MainLayout>
      <h1>FilteredEventsPage</h1>
    </MainLayout>
  );
}
export default FilteredEventsPage;
