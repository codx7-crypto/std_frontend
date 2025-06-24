import { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "كيف يمكنني التقديم للجامعات التركية؟",
      answer: "عملية التقديم للجامعات التركية تتضمن التقديم عبر الإنترنت من خلال موقع الجامعة وتقديم المستندات المطلوبة مثل جواز السفر و شهادة الثانوية العامة. يمكنك أيضًا التقديم من خلال منصتنا التي تسهل عليك هذه العملية."
    },
    {
      question: "ما هي أفضل الجامعات الخاصة في تركيا؟",
      answer: "من أفضل الجامعات الخاصة في تركيا: جامعة كوتش، جامعة سابانجي، جامعة إسطنبول ساباها. هذه الجامعات تتميز ببرامج أكاديمية متميزة ودعم للطلاب الدوليين."
    },
    {
      question: "ما هي تكاليف الدراسة والمعيشة في تركيا؟",
      answer: "الرسوم الدراسية في تركيا تتراوح بين 3000 إلى 15000 دولار أمريكي سنويًا، حسب الجامعة والتخصص. أما تكاليف المعيشة فتعتمد على المدينة ونمط الحياة، ولكن عادةً ما تتراوح بين 200 إلى 600 دولار شهريًا."
    },
    {
      question: "هل أحتاج إلى تأشيرة لدخول تركيا كطالب دولي؟",
      answer: "نعم، تحتاج إلى تأشيرة دراسية لدخول تركيا. يجب عليك التقديم للحصول على التأشيرة من السفارة التركية في بلدك قبل السفر."
    },
    // Continue the rest of your FAQs here ...
 
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="FAQ_container" id="FAQ" style={{
      maxWidth: '1200px',
      margin: '6em auto',
      padding: '3em',
      // background: '#f8fafc',
      // borderRadius: '2em',
      // boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    }}>
      <h1 style={{
        fontSize: '2.5em',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '1.5em',
        color: '#2563eb'
      }}>الأسئلة الشائعة</h1>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto 2em'
      }}>
        <input
          type="text"
          placeholder="🔍 ما الذي تبحث عنه؟"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1em 2em',
            fontSize: '1.1em',
            border: '2px solid #e2e8f0',
            borderRadius: '1em',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
        />
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em'
      }}>
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleFAQ(index)}
            style={{
              background: 'white',
              borderRadius: '1em',
              padding: '1em',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              padding: '1em',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '1.1em',
                fontWeight: '600',
                color: '#1e293b'
              }}>{faq.question}</span>
              <span style={{
                color: '#2563eb',
                transform: activeIndex === index ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.3s ease'
              }}>▼</span>
            </div>
            {activeIndex === index && (
              <div style={{
                padding: '1em',
                color: '#64748b',
                lineHeight: '1.6',
                borderTop: '1px solid #e2e8f0'
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
