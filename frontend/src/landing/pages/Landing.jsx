import React, { useRef } from 'react';

import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Pricing } from '../components/Pricing';
import { Product } from '../components/Product';
import { Stats } from '../components/Stats';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const Landing = () => {
  const pricingRef = useRef(null);
  const productRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToProduct = () => {
    productRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    pricingRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-screen-2xl">
      <Header
        scrollToProduct={scrollToProduct}
        scrollToPricing={scrollToPricing}
        scrollToContact={scrollToContact}
      />
      <Hero
        scrollToProduct={scrollToProduct}
        scrollToPricing={scrollToPricing}
      />
      <Product reference={productRef} />
      <Stats />
      <Pricing reference={pricingRef} />
      <Contact reference={contactRef} />
      <Footer
        scrollToProduct={scrollToProduct}
        scrollToContact={scrollToContact}
      />
    </div>
  );
};

export default Landing;
