import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';

import bgImage from '@/assets/hero/section-bg-1.jpg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
  return (
    <section
      id="home"
      className="pt-36 pb-24 before:content[' '] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-white before:bg-opacity-90"
      style={{
        background: `url(${bgImage.src})`,
        backgroundPosition: '50% 0px',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
      }}
    >
      <Container className="relative flex flex-col justify-center items-center">
        <Heading level="h1" className="text-8xl text-center mb-8">
          React United States Map
        </Heading>
        <Button asChild>
          <Link href="#demo">View demo</Link>
        </Button>
      </Container>
    </section>
  );
};

export default Hero;
