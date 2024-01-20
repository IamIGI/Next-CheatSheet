import MainHeader from '../components/main-header/main-header';
import './globals.css';

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// export const metadata = {
//   generator: 'Next.js',
//   applicationName: 'Next.js',
//   referrer: 'origin-when-cross-origin',
//   keywords: ['Next.js', 'React', 'JavaScript'],
//   authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
//   creator: 'Jiachi Liu',
//   publisher: 'Sebastian Markbåge',
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
// }

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
