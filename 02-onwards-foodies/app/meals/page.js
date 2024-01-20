import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meal-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';
import MealsLoadingPage from './loading-out';

export const metadata = {
  title: 'All Meals',
  description: 'Browse all meals added by our amazing community',
};

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and
          delicious
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your Favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        {/* Suspense -  lets you display a fallback until its children have finished loading. */}
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
