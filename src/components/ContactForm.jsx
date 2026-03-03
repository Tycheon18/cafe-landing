import React, { useState, useEffect, useRef } from 'react';
import { Mail, User, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';

const ContactForm = ({ title = '예약 및 문의', submitButtonText = '문의 보내기', showPhone = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const formRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true); }); }, { threshold: 0.1 });
    if (formRef.current) observer.observe(formRef.current);
    return () => { if (formRef.current) observer.unobserve(formRef.current); };
  }, []);
  const validate = () => {
    const e = {};
    if (!formData.name.trim() || formData.name.length < 2) e.name = '이름을 2자 이상 입력해주세요';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = '올바른 이메일 형식을 입력해주세요';
    if (showPhone && formData.phone && !/^[0-9-]+$/.test(formData.phone)) e.phone = '숫자와 하이픈(-)만 입력 가능합니다';
    if (!formData.message.trim() || formData.message.length < 10) e.message = '문의 내용을 10자 이상 입력해주세요';
    return e;
  };
  const handleChange = (field) => (e) => { setFormData((prev) => ({ ...prev, [field]: e.target.value })); if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' })); };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false); setIsSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setIsSuccess(false), 3000);
  };
  const inputCls = (field) => `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all text-coffee-800 placeholder:text-coffee-300 ${errors[field] ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-coffee-200 focus:ring-coffee-300 bg-white'}`;
  return (
    <div ref={formRef} className={`w-full max-w-2xl mx-auto transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      {title && <h2 className="text-3xl md:text-4xl font-bold text-center text-coffee-800 mb-8">{title}</h2>}
      {isSuccess && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-600" /><p className="text-green-800 font-medium">문의가 성공적으로 접수되었습니다!</p></div>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-5">
        <div><label className="block text-sm font-semibold text-coffee-700 mb-2">이름 <span className="text-red-500">*</span></label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" /><input type="text" value={formData.name} onChange={handleChange('name')} placeholder="홍길동" className={inputCls('name')} /></div>{errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}</div>
        <div><label className="block text-sm font-semibold text-coffee-700 mb-2">이메일 <span className="text-red-500">*</span></label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" /><input type="email" value={formData.email} onChange={handleChange('email')} placeholder="example@email.com" className={inputCls('email')} /></div>{errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}</div>
        {showPhone && <div><label className="block text-sm font-semibold text-coffee-700 mb-2">전화번호 <span className="text-coffee-400 font-normal text-xs">(선택)</span></label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" /><input type="tel" value={formData.phone} onChange={handleChange('phone')} placeholder="010-1234-5678" className={inputCls('phone')} /></div>{errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}</div>}
        <div><label className="block text-sm font-semibold text-coffee-700 mb-2">문의 내용 <span className="text-red-500">*</span></label><div className="relative"><MessageSquare className="absolute left-3 top-3 w-5 h-5 text-coffee-400" /><textarea rows={5} value={formData.message} onChange={handleChange('message')} placeholder="예약 날짜, 인원, 문의 내용을 입력해주세요..." className={`${inputCls('message')} resize-none`} /></div>{errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}</div>
        <button type="submit" disabled={isSubmitting || isSuccess} className={`w-full py-3 px-6 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 ${isSubmitting || isSuccess ? 'bg-coffee-300 cursor-not-allowed' : 'bg-coffee-600 hover:bg-coffee-700 hover:scale-[1.01]'}`}>
          {isSubmitting ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>전송 중...</span></> : isSuccess ? <><CheckCircle className="w-5 h-5" /><span>전송 완료!</span></> : <><Send className="w-5 h-5" /><span>{submitButtonText}</span></>}
        </button>
      </form>
    </div>
  );
};
export default ContactForm;
