import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { v4 as uuidv4 } from 'uuid';

const db = sql('meals.db');

export async function getMeals() {
  // Simulate api requests
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //   throw new Error('Loading meals failure');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  // protect against html injection
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  //---------

  const extension = meal.image.name.split('.').pop();
  const randomId = uuidv4();
  const fileName = `${randomId}.${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  // method args:  think we want to write, fn executed when it's done writing
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saved image failed!');
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(
    `
  INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
  VALUES ( @title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `
  ).run(meal);
}
