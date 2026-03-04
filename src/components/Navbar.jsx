import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Navbar — react-components-pack
 * 투명 모드: 히어로 위에서 투명, 스크롤 시 불투명 전환
 */
const Navbar = ({
  logo = 'Logo',
  links = [],
  sticky = true,
  transparent = false,
  rightContent = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    if (sticky || transparent) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [sticky, transparent]);

  const handleLinkClick = (e, href) => {
    setIsOpen(false);
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isSolid = !transparent || isScrolled;

  return (
    <nav className={`w-full transition-all duration-300 z-50 ${sticky ? 'fixed top-0 left-0 right-0' : 'relative'} ${isSolid ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className={`text-2xl font-bold transition-colors duration-200 ${isSolid ? 'text-coffee-800' : 'text-white'}`}>
            {logo}
          </a>
          <div className="hidden md:flex md:items-center md:gap-8">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-sm font-medium transition-colors duration-200 ${isSolid ? 'text-coffee-700 hover:text-coffee-500' : 'text-white hover:text-coffee-200'}`}
              >
                {link.label}
              </a>
            ))}
            {rightContent}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-md ${isSolid ? 'text-coffee-700 hover:bg-coffee-50' : 'text-white hover:bg-white/10'}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white shadow-lg">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-3 py-2 text-base font-medium text-coffee-700 hover:text-coffee-500 hover:bg-coffee-50 rounded-md transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
