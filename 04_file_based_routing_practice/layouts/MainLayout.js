import Link from 'next/link';

function MainLayout({ children }) {
  return (
    <div>
      <Link href="/">Home</Link>
      <div>{children}</div>
    </div>
  );
}
export default MainLayout;
