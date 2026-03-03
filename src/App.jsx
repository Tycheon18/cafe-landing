import React, { useState, useEffect } from 'react';
import { Coffee, Heart, Clock, MapPin, Phone, Mail } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroWithImage from './components/HeroWithImage';
import ContactForm from './components/ContactForm';
import FooterWithLinks from './components/FooterWithLinks';

const NAV_LINKS = [
  { label: '소개',   href: '#about' },
  { label: '메뉴',   href: '#menu' },
  { label: '오시는 길', href: '#location' },
  { label: '문의',   href: '#contact' },
];

const menuItems = [
  { id: 1,  name: '아메리카노',     price: '4,500원', image: '/images/menu/americano.jpg',         description: '깊고 진한 에스프레소의 맛' },
  { id: 2,  name: '카페라떼',       price: '5,000원', image: '/images/menu/latte.jpg',             description: '부드러운 우유와 에스프레소의 조화' },
  { id: 3,  name: '카푸치노',       price: '5,000원', image: '/images/menu/cappuccino.jpg',        description: '풍부한 우유 거품의 매력' },
  { id: 4,  name: '바닐라라떼',     price: '5,500원', image: '/images/menu/vanilla-latte.jpg',    description: '달콤한 바닐라 향의 라떼' },
  { id: 5,  name: '카라멜마끼아또', price: '5,800원', image: '/images/menu/caramel-macchiato.jpg', description: '달콤한 카라멜 시럽의 풍미' },
  { id: 6,  name: '아인슈페너',     price: '6,000원', image: '/images/menu/einspanner.jpg',        description: '진한 에스프레소와 달콤한 크림' },
  { id: 7,  name: '녹차라떼',       price: '5,500원', image: '/images/menu/green-tea-latte.jpg',  description: '은은한 녹차 향의 라떼' },
  { id: 8,  name: '초코라떼',       price: '5,500원', image: '/images/menu/chocolate-latte.jpg',  description: '진한 초콜릿의 달콤함' },
  { id: 9,  name: '딸기라떼',       price: '6,000원', image: '/images/menu/strawberry-latte.jpg', description: '상큼한 딸기의 달콤함' },
];

const features = [
  { icon: Coffee, title: '신선한 원두',      description: '매일 로스팅하는 신선한 스페셜티 원두만을 사용합니다' },
  { icon: Heart,  title: '정성스런 핸드드립', description: '바리스타가 한 잔 한 잔 정성껏 내려드립니다' },
  { icon: Clock,  title: '편안한 공간',       description: '여유로운 시간을 보낼 수 있는 아늑한 공간' },
];

const footerLinks = [
  { title: '메뉴', items: [{ label: '커피', href: '#menu' }, { label: '논커피', href: '#menu' }, { label: '시즌 메뉴', href: '#menu' }] },
  { title: '안내', items: [{ label: '오시는 길', href: '#location' }, { label: '영업시간', href: '#location' }, { label: '예약 및 문의', href: '#contact' }] },
];

const useScrollVisible = (id) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [id]);
  return visible;
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex justify-center mb-4"><Icon className="w-12 h-12 text-coffee-600" /></div>
    <div className="flex-grow text-center">
      <h3 className="text-xl font-bold text-coffee-800 mb-3">{title}</h3>
      <p className="text-coffee-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const MenuCard = ({ name, price, image, description }) => (
  <div className="flex flex-col bg-coffee-50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
    <div className="relative h-64 overflow-hidden flex-shrink-0">
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="flex flex-col flex-grow p-6">
      <h3 className="text-2xl font-bold text-coffee-800 mb-1">{name}</h3>
      <p className="text-coffee-600 text-sm flex-grow">{description}</p>
      <p className="text-coffee-700 font-bold text-xl mt-3">{price}</p>
    </div>
  </div>
);

function App() {
  const aboutVisible    = useScrollVisible('about');
  const menuVisible     = useScrollVisible('menu');
  const locationVisible = useScrollVisible('location');
  const contactVisible  = useScrollVisible('contact');

  return (
    <div className="min-h-screen bg-coffee-50">
      <Navbar logo="Cozy Café" links={NAV_LINKS} sticky={true} transparent={true} />
      <HeroWithImage title="Cozy Café" subtitle="따뜻한 커피 한 잔의 여유" buttonText="메뉴 보기" buttonLink="#menu" backgroundImage="/images/hero-bg.jpg" overlayOpacity={0.55} textAlign="center" height="screen" />
      <section id="about" className={`py-20 px-4 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-coffee-800 mb-4">우리의 이야기</h2>
          <p className="text-lg text-center text-coffee-600 mb-14 max-w-3xl mx-auto leading-relaxed">Cozy Café는 2020년부터 신선하고 품질 좋은 커피를 제공해왔습니다.</p>
          <div className="grid md:grid-cols-3 gap-8">{features.map((f, i) => <FeatureCard key={i} {...f} />)}</div>
        </div>
      </section>
      <section id="menu" className={`py-20 px-4 bg-white transition-all duration-1000 ${menuVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-coffee-800 mb-3">메뉴</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{menuItems.map((item) => <MenuCard key={item.id} {...item} />)}</div>
        </div>
      </section>
      <section id="location" className={`py-20 px-4 transition-all duration-1000 ${locationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-coffee-800 mb-12">오시는 길</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-coffee-800 mb-6 flex items-center gap-3"><MapPin className="w-6 h-6 text-coffee-600" />찾아오시는 길</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-coffee-500 mt-1" /><div><p className="font-semibold text-coffee-800">주소</p><p className="text-coffee-600 text-sm">서울시 OO구 OO로 123</p></div></div>
                <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-coffee-500 mt-1" /><div><p className="font-semibold text-coffee-800">영업시간</p><p className="text-coffee-600 text-sm">평일: 08:00 – 22:00 / 주말: 10:00 – 22:00</p></div></div>
                <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-coffee-500 mt-1" /><div><p className="font-semibold text-coffee-800">연락처</p><p className="text-coffee-600 text-sm">02-XXXX-XXXX</p></div></div>
                <div className="flex items-start gap-3"><Mail className="w-5 h-5 text-coffee-500 mt-1" /><div><p className="font-semibold text-coffee-800">이메일</p><p className="text-coffee-600 text-sm">contact@cozycafe.kr</p></div></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-coffee-100 to-coffee-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center px-8"><MapPin className="w-20 h-20 text-coffee-500 mx-auto mb-4" /><p className="text-xl font-bold text-coffee-800">위치 지도</p><p className="text-coffee-600 text-sm">실제 배포 시 Google Maps 또는 카카오맵 연동</p></div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className={`py-20 px-4 bg-white transition-all duration-1000 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <ContactForm title="예약 및 문의" submitButtonText="문의 보내기" showPhone={true} />
        </div>
      </section>
      <FooterWithLinks companyName="Cozy Café" description={`따뜻한 커피 한 잔의 여유\n2020년부터 신선한 스페셜티 원두로\n최고의 커피를 선사합니다.`} links={footerLinks} socialLinks={[{ platform: 'instagram', href: '#' }, { platform: 'facebook', href: '#' }]} copyright="© 2026 Cozy Café. All rights reserved." />
    </div>
  );
}

export default App;
