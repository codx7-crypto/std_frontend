import mountainCover from './photos/mountain1.jpg';
import mountain1 from './photos/mountain1.jpg';
import mountain2 from './photos/mountain2.jpg';
import mountain3 from './photos/mountain3.jpg';
import mountain4 from './photos/mountain2.jpg';

import beachCover from './photos/beach1.jpg';
import beach1 from './photos/beach1.jpg';
import beach2 from './photos/beach2.jpg';
import beach3 from './photos/beach3.jpg';
import beach4 from './photos/beach2.jpg';

export const categories = [
  { name: "القسم الأكاديمي", count: 2 },
  { name: "القسم الخدمي", count: 2 },
  { name: "القسم الثقافي", count: 2 },
  { name: "القسم الإجتماعي", count: 1 }
];

const blogs = [
  {
    id: 0,
    title: "استكشاف الجبال",
    coverImage: mountainCover,
    sammury: "وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق التي تحتوي على مقاطع من لوريم إيبسوم،",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    gallery: [mountain1, mountain2, mountain3, mountain4],
    category: "القسم الثقافي",
    important: true,
    date: "مايو 31 2023"
  },
  {
    id: 1,
    title: "أجواء الشاطئ وغروب الشمس",
    coverImage: beachCover,
    sammury: "وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق التي تحتوي على مقاطع من لوريم إيبسوم،",
    text: "لوريم إيبسوم هو ببساطة نص شكلي (أي شكل غير واضح) يُستخدم في صناعة الطباعة والتنضيد. ظل لوريم إيبسوم النص الشكلي القياسي في هذه الصناعة منذ القرن السادس عشر، عندما قام طابع مجهول بنسخ نسخة من الطباعة وخلطها لإنشاء كتاب نماذج طباعة. وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق Letraset التي تحتوي على مقاطع من لوريم إيبسوم، ومؤخرًا مع برامج النشر المكتبي مثل Aldus PageMaker التي تتضمن إصدارات من لوريم إيبسوم.",
    gallery: [beach1, beach2, beach3, beach4],
    category: "القسم الثقافي",
    important: false,
    date: "مايو 19 2023"
  },
  {
    id: 2,
    title: "أهم 10 تخصصات جامعية مستقبلية لعام 2030",
    coverImage: mountainCover,
    sammury: "وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق التي تحتوي على مقاطع من لوريم إيبسوم،",
    text: "لوريم إيبسوم هو ببساطة نص شكلي (أي شكل غير واضح) يُستخدم في صناعة الطباعة والتنضيد. ظل لوريم إيبسوم النص الشكلي القياسي في هذه الصناعة منذ القرن السادس عشر، عندما قام طابع مجهول بنسخ نسخة من الطباعة وخلطها لإنشاء كتاب نماذج طباعة. وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق Letraset التي تحتوي على مقاطع من لوريم إيبسوم، ومؤخرًا مع برامج النشر المكتبي مثل Aldus PageMaker التي تتضمن إصدارات من لوريم إيبسوم.",
    gallery: [mountain1, mountain2, mountain3, mountain4],
    category: "القسم الأكاديمي",
    important: true,
    date: "يونيو 15 2023"
  },
  {
    id: 3,
    title: "أفضل 5 مواقع لتعلم اللغة الإنجليزية",
    coverImage: beachCover,
    sammury: "وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق التي تحتوي على مقاطع من لوريم إيبسوم،",
    text: "لوريم إيبسوم هو ببساطة نص شكلي (أي شكل غير واضح) يُستخدم في صناعة الطباعة والتنضيد. ظل لوريم إيبسوم النص الشكلي القياسي في هذه الصناعة منذ القرن السادس عشر، عندما قام طابع مجهول بنسخ نسخة من الطباعة وخلطها لإنشاء كتاب نماذج طباعة. وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق Letraset التي تحتوي على مقاطع من لوريم إيبسوم، ومؤخرًا مع برامج النشر المكتبي مثل Aldus PageMaker التي تتضمن إصدارات من لوريم إيبسوم.",
    gallery: [beach1, beach2, beach3, beach4],
    category: "القسم الخدمي",
    important: true,
    date: "يوليو 02 2023"
  },
  {
    id: 4,
    title: "استكشاف الجبال",
    coverImage: mountainCover,
    sammury: "وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق التي تحتوي على مقاطع من لوريم إيبسوم،",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    gallery: [mountain1, mountain2, mountain3, mountain4],
    category: "القسم الثقافي",
    important: true,
    date: "مايو 31 2023"
  },
  {
    id: 5,
    title: "أجواء الشاطئ وغروب الشمس",
    coverImage: beachCover,
    sammury: "وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق التي تحتوي على مقاطع من لوريم إيبسوم،",
    text: "لوريم إيبسوم هو ببساطة نص شكلي (أي شكل غير واضح) يُستخدم في صناعة الطباعة والتنضيد. ظل لوريم إيبسوم النص الشكلي القياسي في هذه الصناعة منذ القرن السادس عشر، عندما قام طابع مجهول بنسخ نسخة من الطباعة وخلطها لإنشاء كتاب نماذج طباعة. وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق Letraset التي تحتوي على مقاطع من لوريم إيبسوم، ومؤخرًا مع برامج النشر المكتبي مثل Aldus PageMaker التي تتضمن إصدارات من لوريم إيبسوم.",
    gallery: [beach1, beach2, beach3, beach4],
    category: "القسم الثقافي",
    important: false,
    date: "مايو 19 2023"
  },
  {
    id: 6,
    title: "أهم 10 تخصصات جامعية مستقبلية لعام 2030",
    coverImage: mountainCover,
    sammury: "وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق التي تحتوي على مقاطع من لوريم إيبسوم،",
    text: "لوريم إيبسوم هو ببساطة نص شكلي (أي شكل غير واضح) يُستخدم في صناعة الطباعة والتنضيد. ظل لوريم إيبسوم النص الشكلي القياسي في هذه الصناعة منذ القرن السادس عشر، عندما قام طابع مجهول بنسخ نسخة من الطباعة وخلطها لإنشاء كتاب نماذج طباعة. وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق Letraset التي تحتوي على مقاطع من لوريم إيبسوم، ومؤخرًا مع برامج النشر المكتبي مثل Aldus PageMaker التي تتضمن إصدارات من لوريم إيبسوم.",
    gallery: [mountain1, mountain2, mountain3, mountain4],
    category: "القسم الأكاديمي",
    important: true,
    date: "يونيو 15 2023"
  },
  {
    id: 7,
    title: "أفضل 5 مواقع لتعلم اللغة الإنجليزية",
    coverImage: beachCover,
    sammury: "وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق التي تحتوي على مقاطع من لوريم إيبسوم،",
    text: "لوريم إيبسوم هو ببساطة نص شكلي (أي شكل غير واضح) يُستخدم في صناعة الطباعة والتنضيد. ظل لوريم إيبسوم النص الشكلي القياسي في هذه الصناعة منذ القرن السادس عشر، عندما قام طابع مجهول بنسخ نسخة من الطباعة وخلطها لإنشاء كتاب نماذج طباعة. وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا بعد قفزة التنضيد الإلكتروني، وبقي على حاله دون تغيير يُذكر. انتشر في ستينيات القرن الماضي مع إصدار أوراق Letraset التي تحتوي على مقاطع من لوريم إيبسوم، ومؤخرًا مع برامج النشر المكتبي مثل Aldus PageMaker التي تتضمن إصدارات من لوريم إيبسوم.",
    gallery: [beach1, beach2, beach3, beach4],
    category: "القسم الخدمي",
    important: true,
    date: "يوليو 02 2023"
  },
];

export default blogs;
