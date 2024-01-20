'use server';
// It do not have to be action.js name for file
import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

function isInvalidText(text) {
  return text.title && text.title.trim() === '';
}

export async function shareMeal(prevState, formData) {
  //   'use server'; // function that execute only on server side,
  //  if you want to use it in no client file as  function
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input',
    };
  }
  await saveMeal(meal);
  revalidatePath('/meals'); //revalidate cache that belong to certain url path, 'path' - that one page, 'layout' - page and it's children pages
  redirect('/meals');
}
