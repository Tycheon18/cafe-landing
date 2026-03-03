import React, { useState, useEffect, useRef } from 'react';

const HeroWithImage = ({ title, subtitle, buttonText, buttonLink = '#', backgroundImage, overlayOpacity = 0.5, textAlign = 'center', height = 'screen' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true); }); }, { threshold: 0.1 });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => { if (heroRef.current) observer.unobserve(heroRef.current); };
  }, []);
  const heightClass = { screen: 'h-screen', lg: 'h-[600px]', md: 'h-[400px]' }[height];
  const alignClass = { left: 'text-left items-start', center: 'text-center items-center', right: 'text-right items-end' }[textAlign];
  return (
    <section ref={heroRef} className={`relative ${heightClass} w-full overflow-hidden`} style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      <div className={`relative z-10 flex flex-col justify-center ${alignClass} h-full px-4 sm:px-6 lg:px-8`}>
        <div className={`max-w-7xl w-full ${textAlign === 'center' ? 'mx-auto' : ''}`}>
          <h1 className={`text-5xl md:text-7xl font-bold text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{title}</h1>
          {subtitle && <p className={`text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl transition-all duration-700 delay-200 ${textAlign === 'center' ? 'mx-auto' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>{subtitle}</p>}
          {buttonText && <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}><a href={buttonLink} onClick={(e) => { if (buttonLink.startsWith('#')) { e.preventDefault(); document.querySelector(buttonLink)?.scrollIntoView({ behavior: 'smooth' }); } }} className="inline-block px-8 py-4 bg-coffee-600 hover:bg-coffee-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300">{buttonText}</a></div>}
        </div>
      </div>
    </section>
  );
};
export default HeroWithImage;
