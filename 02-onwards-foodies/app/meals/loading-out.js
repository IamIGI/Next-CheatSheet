// If the name is loading.js, then this fill will be used when api is fetched
// on all nested files

import classes from './loading.module.css';

export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals....</p>;
}
