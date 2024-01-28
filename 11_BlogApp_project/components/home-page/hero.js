import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        {/* read about Image next in docs */}
        <Image
          src="/images/site/igor.jpg"
          alt="Profile"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'am Igor</h1>
      <p>Developer for over 2 years, and 7 months of commercial experience</p>
    </section>
  );
}

export default Hero;
