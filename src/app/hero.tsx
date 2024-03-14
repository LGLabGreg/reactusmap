import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { FileCode } from 'lucide-react';

import bgImage from '@/assets/hero/stars.jpg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
  return (
    <section
      id="home"
      className="pt-28 pb-12 sm:pt-36 sm:pb-24 px-4 before:content[' '] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-white before:bg-opacity-95"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundPosition: '50% 0px',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
      }}
    >
      <Container className="relative flex flex-col justify-center items-center">
        <Heading
          level="h1"
          className="text-5xl md:text-6xl lg:text-8xl leading-tight text-center mb-8"
        >
          React United States Map
        </Heading>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <Button size="lg" asChild className="mb-2 sm:mb-0  sm:mr-2">
            <Link href="#demos">View demo</Link>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <Link href="#documentation">
              <FileCode className="mr-2" />
              Read the docs
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
