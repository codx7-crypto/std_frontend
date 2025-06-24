import React from 'react';
import Layout from '../Components/Layout';
import turkeyImage from '../photos/start_turkey.jpg';
import '../pages_css/start_turkey.css';
import study_in_turkey from "../photos/Study-in-Turkey.jpg"

const StartInTurkey = () => {
  return (
    <Layout>
      <div className="start-container">

          {/* صورة وفاصل بصري */}
          <div className="start-image">
          <img src={turkeyImage} alt="الدراسة في تركيا" />
        </div>

        {/* المقدمة */}
        <div className="start-header">
          <h1>ابدأ رحلتك الدراسية في تركيا</h1>
          <p>
            تعتبر تركيا واحدة من الوجهات الدراسية الأكثر شعبية في العالم العربي، لما توفره من تعليم عالي الجودة وتكاليف مناسبة ومعيشة مريحة في بيئة ثقافية متنوعة.
          </p>
        </div>

        {/* الخطوات الأساسية */}
        <div className="start-steps">
          <h4 className="start-section-title">الخطوات الأساسية</h4>
          <div className="start-highlight-box">
            <h5 className="start-subtitle">مراحل التقديم:</h5>
            <ul className="start-checklist">
              <li>تحديد التخصص والبرنامج (بكالوريوس، ماجستير، دكتوراه)</li>
              <li>اختيار الجامعات المناسبة بناءً على التخصص واللغة</li>
              <li>تجهيز الوثائق المطلوبة (شهادة الثانوية/الجامعية، جواز السفر، صور، سيرة ذاتية)</li>
              <li>التقديم على الجامعات من خلال موقعها أو عبر مكتب استشارات</li>
              <li>الانتظار للحصول على القبول</li>
              <li>التقديم على التأشيرة الدراسية</li>
              <li>الاستعداد للسفر والإقامة في تركيا</li>
            </ul>
          </div>
        </div>

        {/* الفرق بين الجامعات */}
        <div className="start-steps">
          <h4 className="start-section-title">أنواع الجامعات في تركيا</h4>
          <div className="start-highlight-box">
            <h5 className="start-subtitle">1. الجامعات الحكومية:</h5>
            <p>تتميز برسوم دراسية منخفضة، لكنها تحتاج إلى معدل عالٍ ونجاح في اختبار YÖS أو SAT.</p>

            <h5 className="start-subtitle">2. الجامعات الخاصة:</h5>
            <p>لا تطلب اختبارات قبول عادة، تقبل بالشهادة الثانوية مباشرة، وتقدّم برامج باللغة الإنجليزية أو التركية.</p>
          </div>
        </div>

        {/* المنح الدراسية */}
        <div className="start-steps">
          <h4 className="start-section-title">المنح الدراسية المتاحة</h4>
          <div className="start-highlight-box">
            <p>المنحة التركية الحكومية هي الأكثر شهرة، وتشمل الرسوم الدراسية، السكن، التأمين الصحي، وراتب شهري.</p>
            <ul className="start-checklist">
              <li>المنحة التركية (Türkiye Bursları)</li>
              <li>منح الجامعات الخاصة (خصومات حتى 75%)</li>
              <li>منح التوأمة مع الدول العربية</li>
            </ul>
          </div>
        </div>
  {/* صورة وفاصل بصري */}
  <div className="start-image">
          <img src={study_in_turkey} alt="الدراسة في تركيا" />
        </div>
        {/* التكاليف */}
        <div className="start-steps">
          <h4 className="start-section-title">تكاليف الدراسة والمعيشة</h4>
          <div className="start-highlight-box">
            <ul className="start-checklist">
              <li>الرسوم السنوية في الجامعات الخاصة: بين 2000$ - 8000$ حسب التخصص</li>
              <li>السكن الطلابي: من 100$ إلى 300$ شهريًا</li>
              <li>المواصلات: مخفضة للطلاب (كرت المواصلات)</li>
              <li>الطعام والاحتياجات: 150$ - 250$ شهريًا</li>
            </ul>
          </div>
        </div>

        {/* الأوراق المطلوبة */}
        <div className="start-steps">
          <h4 className="start-section-title">الوثائق المطلوبة</h4>
          <div className="start-highlight-box">
            <ul className="start-checklist">
              <li>صورة شخصية خلفية بيضاء</li>
              <li>شهادة الثانوية العامة (مترجمة)</li>
              <li>جواز سفر ساري المفعول</li>
              <li>كشف درجات</li>
              <li>سيرة ذاتية (لبرامج الدراسات العليا)</li>
              <li>خطاب نية (Motivation Letter)(اختياري)</li>
              <li>عنوان البريد الالكتروني</li>
            </ul>
          </div>
        </div>

        {/* روابط مفيدة */}
        <div className="start-steps">
          <h4 className="start-section-title">روابط مهمة</h4>
          <div className="start-highlight-box">
            <ul className="start-checklist">
              <li><a href="https://turkiyeburslari.gov.tr/" target="_blank" rel="noreferrer">رابط التقديم على المنحة التركية</a></li>
              <li><a href="https://www.studyinturkey.gov.tr/" target="_blank" rel="noreferrer">موقع الدراسة في تركيا الرسمي</a></li>
            </ul>
          </div>
        </div>

      

        {/* زر التقديم */}

        {/* <div className="start-cta">
          <button>قدّم الآن</button>
        </div> */}
      </div>
    </Layout>
  );
};

export default StartInTurkey;
