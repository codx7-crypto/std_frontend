import "./contact.css"
import React, { useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import univirstycampus from "../photos/premium_photo-1682974406944-099e0b2a7ace.jpeg"
import Select from 'react-select';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const formRef = useRef();
  const [phone, setPhone] = useState('');
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const countryOptions = [
    // 🟢 الدول العربية أولاً
    { value: 'saudi', label: 'السعودية'  },
    { value: 'uae', label: 'الإمارات' },
    { value: 'egypt', label: 'مصر' },
    { value: 'jordan', label: 'الأردن' },
    { value: 'lebanon', label: 'لبنان' },
    { value: 'iraq', label: 'العراق' },
    { value: 'yemen', label: 'اليمن' },
    { value: 'palestine', label: 'فلسطين' },
    { value: 'syria', label: 'سوريا' },
    { value: 'kuwait', label: 'الكويت' },
    { value: 'bahrain', label: 'البحرين' },
    { value: 'qatar', label: 'قطر' },
    { value: 'oman', label: 'عمان' },
    { value: 'libya', label: 'ليبيا' },
    { value: 'tunisia', label: 'تونس' },
    { value: 'algeria', label: 'الجزائر' },
    { value: 'morocco', label: 'المغرب' },
    { value: 'sudan', label: 'السودان' },
    { value: 'somalia', label: 'الصومال' },
    { value: 'djibouti', label: 'جيبوتي' },
    { value: 'comoros', label: 'جزر القمر' },
    { value: 'mauritania', label: 'موريتانيا' },
    // 🔵 باقي الدول
    { value: 'turkey', label: 'تركيا' },
    { value: 'pakistan', label: 'باكستان' },
    { value: 'afghanistan', label: 'أفغانستان' },
    { value: 'iran', label: 'إيران' },
    { value: 'malaysia', label: 'ماليزيا' },
    { value: 'indonesia', label: 'إندونيسيا' },
    { value: 'bangladesh', label: 'بنغلاديش' },
    { value: 'brunei', label: 'بروناي' },
    { value: 'maldives', label: 'جزر المالديف' }
  ];
  
  const universityOptions = [
    { value: 'public_uni', label: 'نحن نبحث عن جامعة حكومية' },
    { value: 'private_uni', label: 'نحن نبحث عن جامعة خاصة (بمعدل جيد)' },
    { value: 'medical_uni', label: 'نحن نبحث عن جامعة لدراسة الطب البشري' },
    { value: 'dental_uni', label: 'نحن نبحث عن جامعة لدراسة طب الأسنان' },
    { value: 'pharmacy_uni', label: 'نحن نبحث عن جامعة لدراسة الصيدلة' },
    { value: 'turkey_only', label: 'نبحث عن جامعة داخل تركيا فقط' },
    { value: 'outside_turkey', label: 'نبحث عن جامعة خارج تركيا' },
    { value: 'scholarship', label: 'نبحث عن منحة دراسية' },
    { value: 'affordable', label: 'نبحث عن جامعة بأسعار مناسبة' },
    { value: 'english_program', label: 'نبحث عن برنامج باللغة الإنجليزية' },
    { value: 'arabic_program', label: 'نبحث عن برنامج باللغة العربية' },
    { value: 'turkish_program', label: 'نبحث عن برنامج باللغة التركية' },
    { value: 'engineering', label: 'نبحث عن كلية هندسة' },
    { value: 'computer_engineering', label: 'نبحث عن كلية هندسة حاسوب' },
    { value: 'mechanical_engineering', label: 'نبحث عن كلية هندسة ميكانيكية' },
    { value: 'electrical_engineering', label: 'نبحث عن كلية هندسة كهربائية' },
    { value: 'business', label: 'نبحث عن كلية إدارة أعمال' },
    { value: 'science', label: 'نبحث عن كلية علوم' },
    { value: 'arts', label: 'نبحث عن كلية فنون' },
    { value: 'law', label: 'نبحث عن كلية حقوق' },
    { value: 'education', label: 'نبحث عن كلية تربية' },
    { value: 'psychology', label: 'نبحث عن كلية علم النفس' },
    { value: 'architecture', label: 'نبحث عن كلية عمارة' },
    { value: 'media', label: 'نبحث عن كلية إعلام' },
    { value: 'languages', label: 'نبحث عن كلية لغات' },
    { value: 'other', label: 'اخر' }
  ];

  // Helper: Check if phone is valid (at least 8 digits, can be improved)
  const isPhoneValid = (phone) => {
    // Remove non-digit chars, check length
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phone || !isPhoneValid(phone)) {
      setShowPhoneError(true);
      return;
    } else {
      setShowPhoneError(false);
    }

    const formData = new FormData(e.target.form || formRef.current);
    const name = formData.get('name');
    const surname = formData.get('surname');
    const email = formData.get('email');
    const phoneNumber = phone;
    const message = formData.get('message');

    const templateParams = {
      name,
      surname,
      email,
      phone: phoneNumber,
      country: selectedCountry?.label || "لم يتم التحديد",
      university: selectedUniversity?.label || "لم يتم التحديد",
      message,
    };

    emailjs.send(
      'service_iaqxmhn',         // Service ID
      'template_7ml3i4d',        // 🔁 استبدله بـ Template ID الحقيقي
      templateParams,
      '9wsM2YYK-iLSpIAB3'     // 🔁 استبدله بـ Public Key من حسابك
    ).then((res) => {
      toast.success('✅ تم إرسال رسالتك بنجاح!');
      console.log('SUCCESS', res.status, res.text);
    }).catch((err) => {
      toast.error('❌ حدث خطأ أثناء إرسال الرسالة');
      console.error('FAILED', err);
    });
  };

  return (
    <section className="contact-new-shape" id="contact" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${univirstycampus})`
    }}>
      <div className="contact-container">
      <div className="contact-diagonal-bg"></div>
      <div className="contact-glass-card animated-fade-in" style={{
        '@media (max-width: 768px)': {
          width: '90%',
          margin: '0 auto',
          padding: '1.5em 1em'
        }
      }}>
        <h2 className="contact-title">دعنا نتواصل معك</h2>
        <form className="contact-form" ref={formRef}>
          <div className="contact-row" style={{
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              gap: '0.8em'
            }
          }}>
            <input type="text" name="name" placeholder="الاسم" required style={{ direction: 'rtl' }} />
            <input type="text" name="surname" placeholder="اللقب أو الكنية" required style={{ direction: 'rtl' }} />
          </div>
          <div className="contact-row" style={{
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              gap: '0.8em'
            }
          }}>
            <div className="contact-gender" style={{ direction: 'rtl' }}>
              <label>الجنس:</label>
              <label><input type="radio" name="gender" value="ذكر" /> ذكر</label>
              <label><input type="radio" name="gender" value="أنثى" /> أنثى</label>
            </div>
            <Select
              options={countryOptions}
              name="country"
              placeholder="اختر الدولة"
              className="react-select-container"
              classNamePrefix="react-select"
              isSearchable={true}
              maxMenuHeight={200}
              menuPlacement="auto"
              onChange={setSelectedCountry}
              styles={{
                container: (base) => ({
                  ...base,
                  width: '100%',
                  height: '2.5em', 
                  borderRadius: '1em',
                  transition: 'all 0.3s ease'
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  '&::-webkit-scrollbar': {
                    width: '8px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.1)'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '4px'
                  }
                })
              }}
            />
          </div>
          <div className="contact-row">
            <PhoneInput  
              country={'tr'}
              value={phone}
              onChange={value => {
                setPhone(value);
                if (showPhoneError) setShowPhoneError(false);
              }}
              inputProps={{
                name: 'phone',
                required: true,
                placeholder: 'رقم الهاتف',
                style: { width: '100%', borderRadius: '1em', fontSize: '1em', direction: 'ltr' }
              }}
              containerStyle={{ width: '100%' }}
              inputStyle={{
                width: '100%',
                borderRadius: '1em',
                fontSize: '1em',
                direction: 'ltr',
                border: showPhoneError ? '2px solid #e53e3e' : undefined,
                background: showPhoneError ? '#fff5f5' : undefined
              }}
              buttonStyle={{ borderRadius: '1em 0 0 1em' }}
            />
            {showPhoneError && (
              <div style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: '0.5em', textAlign: 'right', width: '100%' }}>
                رقم الهاتف مطلوب
              </div>
            )}
          </div>
          <div className="contact-row">
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني (اختياري)"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '1em',
                fontSize: '1em',
                direction: 'rtl',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                transition: 'all 0.3s ease'
              }}
            />
            <small style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85em',
              marginTop: '0.5em',
              textAlign: 'right',
              width: '100%'
            }}>
              لا تقلق إذا لم يكن لديك بريد إلكتروني، يمكننا التواصل معك عبر الهاتف
            </small>
          </div>
          <div className="contact-row">
            <Select
              options={universityOptions}
              name="university"
              placeholder="ما الذي تبحث عنه؟"
              className="react-select-container"
              classNamePrefix="react-select"
              isSearchable={true}
              maxMenuHeight={200}
              menuPlacement="auto"
              onChange={setSelectedUniversity}
              styles={{
                container: (base) => ({
                  ...base,
                  width: '100%',
                  height: '2.5em',
                  borderRadius: '1em',
                  transition: 'all 0.3s ease'
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  '&::-webkit-scrollbar': {
                    width: '8px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.1)'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '4px'
                  }
                }),
                menuList: (base) => ({
                  ...base,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '8px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.1)'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '4px'
                  }
                }),
                control: (base) => ({
                  ...base,
                  minHeight: '2.5em',
                  backgroundColor: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }
                }),
                option: (base) => ({
                  ...base,
                  padding: '0.75rem 1rem'
                })
              }}
            />
          </div>
          <div className="contact-row" style={{ direction: 'rtl' }}>
            <textarea name="message" placeholder="كيف يمكننا مساعدتك؟" rows={3} required></textarea>
          </div>
          <button
            type="submit"
            className="contact-submit"
            onClick={handleSubmit}
          >
            إرسال
          </button>
        </form>
      </div>
      <div className="contact-glass-card animated-fade-in" style={{
        '@media (max-width: 768px)': {
          width: '90%',
          margin: '1em auto',
          padding: '1.5em 1em',
          order: 2 // Add order property to move below form on mobile
        }
      }}>
      <div className="contact-info animated-fade-in" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5em',
          padding: '1em',
          '@media (max-width: 768px)': {
            padding: '0.5em',
            gap: '1em'
          }
        }}>
          <h2 className="contact-title">معلومات التواصل</h2>
          <p style={{
            textAlign: 'center',
            color: 'white',
            fontSize: '1.1em',
            lineHeight: '1.6',
            marginBottom: '1.5em',
            zIndex: '-20',
            '@media (max-width: 768px)': {
              fontSize: '1em',
              marginBottom: '1em'
            }
          }}>
            يكفيك الاستعانة بأحد أعضاء فريقنا لتبدأ مشوارك الأكاديمي بنجاح، مهما كان استفسارك تأكد من أننا سنقدم لك الاستشارة مجاناً!
          </p>
          <div className="contact-details" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2em',
            width: '100%',
            '@media (max-width: 768px)': {
              gap: '0.8em'
            }
          }}>
            <div className="contact-item" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1em',
              padding: '0.8em',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '0.8em',
              transition: 'all 0.3s ease',
              '@media (max-width: 768px)': {
                padding: '0.6em',
                fontSize: '0.9em'
              }
            }}>
              <i className="fas fa-envelope" style={{color: '#2563eb', fontSize: '1.2em'}}></i>
              <a href="mailto:info@unitededucation.com.tr" 
                style={{
                  color: '#1e293b',
                  textDecoration: 'none',
                  fontSize: '1.1em',
                  transition: 'color 0.3s ease',
                  '@media (max-width: 768px)': {
                    fontSize: '1em'
                  }
                }}
                onMouseOver={(e) => e.target.style.color = '#2563eb'}
                onMouseOut={(e) => e.target.style.color = '#1e293b'}
              >
                alnawras.turkey@gmail.com
              </a>
            </div>
            <div className="contact-item" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1em',
              padding: '0.8em',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '0.8em',
              transition: 'all 0.3s ease',
              '@media (max-width: 768px)': {
                padding: '0.6em',
                fontSize: '0.9em'
              }
            }}>
              <i className="fas fa-phone" style={{color: '#2563eb', fontSize: '1.2em'}}></i>
              <a href="tel:00902129123999"
                style={{
                  color: '#1e293b',
                  textDecoration: 'none',
                  fontSize: '1.1em',
                  transition: 'color 0.3s ease',
                  '@media (max-width: 768px)': {
                    fontSize: '1em'
                  }
                }}
                onMouseOver={(e) => e.target.style.color = '#2563eb'}
                onMouseOut={(e) => e.target.style.color = '#1e293b'}
              >
                0090212912399
              </a>
            </div>
            <div className="contact-item" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1em',
              padding: '0.8em',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '0.8em',
              transition: 'all 0.3s ease',
              '@media (max-width: 768px)': {
                padding: '0.6em',
                fontSize: '0.9em'
              }
            }}>
              <i className="fas fa-map-marker-alt" style={{color: '#2563eb', fontSize: '1.2em'}}></i>
              <span style={{color: '#1e293b', fontSize: '1.1em'}}>تركيا، اسطنبول</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer position="top-center" />
    </section>
  );
};

export default Contact;
