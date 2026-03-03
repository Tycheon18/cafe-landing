import React from 'react';
import { Github, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

const FooterWithLinks = ({ companyName, description, links = [], socialLinks = [], copyright }) => {
  const socialIcons = { github: Github, twitter: Twitter, linkedin: Linkedin, instagram: Instagram, facebook: Facebook };
  return (
    <footer className="bg-coffee-900 text-coffee-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1"><h3 className="text-white text-xl font-bold mb-4">{companyName}</h3>{description && <p className="text-sm text-coffee-400 leading-relaxed whitespace-pre-line">{description}</p>}</div>
          {links.map((group, i) => (<div key={i}><h4 className="text-white font-semibold mb-4">{group.title}</h4><ul className="space-y-2">{group.items.map((item, j) => <li key={j}><a href={item.href} className="text-sm text-coffee-400 hover:text-white transition-colors">{item.label}</a></li>)}</ul></div>))}
        </div>
      </div>
      <div className="border-t border-coffee-700">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-coffee-500">{copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`}</p>
          {socialLinks.length > 0 && <div className="flex items-center gap-4">{socialLinks.map((social, i) => { const Icon = socialIcons[social.platform.toLowerCase()]; return Icon ? <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-coffee-400 hover:text-white transition-colors"><Icon className="w-5 h-5" /></a> : null; })}</div>}
        </div>
      </div>
    </footer>
  );
};
export default FooterWithLinks;
