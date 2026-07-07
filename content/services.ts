export type ServiceFaq = { q: string; a: string };

export type ServiceLocaleContent = {
  /** Title-tag text, without the site-name suffix. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  offeringsTitle: string;
  offerings: string[];
  processTitle: string;
  process: string[];
  faqTitle: string;
  faqs: ServiceFaq[];
  cta: string;
  /** Used for the Service structured data. */
  serviceType: string;
};

export type Service = {
  slug: string;
  /** Short label for footers / internal links. */
  label: { en: string; ar: string };
  en: ServiceLocaleContent;
  ar: ServiceLocaleContent;
};

export const services: Service[] = [
  {
    slug: "dashboards",
    label: { en: "Power BI Dashboards", ar: "لوحات معلومات Power BI" },
    en: {
      metaTitle: "Freelance Power BI Dashboard Developer & BI Consultant",
      metaDescription:
        "Freelance Power BI dashboards and business intelligence from Amman, Jordan. KPI dashboards, automated reporting, and BI consulting for teams across MENA, remote worldwide.",
      h1: "Power BI Dashboards & Business Intelligence",
      intro: [
        'I\'m a freelance Power BI developer and business intelligence consultant. I turn scattered spreadsheets and disconnected systems into a single dashboard that answers "how is the business doing?" at a glance, with numbers everyone trusts.',
        "Six years of analytics work across aviation, Big Four consulting, automotive, and media taught me which metrics actually drive decisions. I'm based in Amman, Jordan, and work remotely with clients across Saudi Arabia, the UAE, the wider MENA region, and worldwide.",
      ],
      offeringsTitle: "What you get",
      offerings: [
        "KPI dashboards in Power BI: sales, operations, marketing, and finance views your team checks daily.",
        "Data modeling and DAX measures built to stay correct as your data grows.",
        "Automated reporting that replaces hours of manual Excel work every week.",
        "Data cleanup and integration from Excel, SQL databases, Google Analytics, and your business systems.",
        "Training and documentation so your team can use and extend the dashboards without me.",
      ],
      processTitle: "How it works",
      process: [
        "Free discovery call: we define the questions the dashboard must answer and the KPIs that matter.",
        "Data audit: I review your sources, clean what needs cleaning, and build the data model.",
        "Build and iterate: you see working dashboards weekly and steer the direction.",
        "Handover: training, documentation, and optional ongoing support.",
      ],
      faqTitle: "Common questions",
      faqs: [
        {
          q: "How much does a Power BI dashboard cost?",
          a: "It depends on how many data sources need connecting and how much cleanup they need. A typical single-purpose dashboard takes 2 to 6 weeks. After a free discovery call you get a fixed-scope proposal, so there are no surprises.",
        },
        {
          q: "Can you work with our existing data in Excel, SQL, or Google Analytics?",
          a: "Yes. Most projects start from a mix of Excel files, a database, and web or marketing analytics. Connecting, cleaning, and modeling those sources into one reliable view is the core of the work.",
        },
        {
          q: "Do you provide support after delivery?",
          a: "Yes. Every project ends with training and documentation, and I offer monthly retainers for updates, new report pages, and data questions as your business changes.",
        },
      ],
      cta: "Start a dashboard project",
      serviceType: "Power BI dashboard development and business intelligence",
    },
    ar: {
      metaTitle: "محلل بيانات Power BI مستقل | تصميم لوحات معلومات وتقارير تفاعلية",
      metaDescription:
        "خدمات Power BI مستقلة من عمّان: تصميم لوحات معلومات (داشبورد) تفاعلية وتقارير آلية تساعدك على متابعة أداء عملك واتخاذ قرارات أسرع. أعمل عن بُعد مع عملاء في السعودية والإمارات وكل المنطقة العربية.",
      h1: "لوحات معلومات Power BI وذكاء الأعمال",
      intro: [
        "أعمل كمحلل بيانات مستقل متخصص في Power BI. أحوّل ملفات الإكسل المتناثرة والأنظمة المنفصلة إلى لوحة معلومات واحدة تجيب عن سؤال «كيف يسير العمل؟» بنظرة واحدة، بأرقام يثق بها الجميع.",
        "ست سنوات من العمل في تحليل البيانات عبر قطاعات الطيران والاستشارات والسيارات والإعلام علّمتني أي المؤشرات تصنع القرار فعلاً. أعمل من عمّان في الأردن، وأخدم عملائي عن بُعد في السعودية والإمارات وسائر الدول العربية.",
      ],
      offeringsTitle: "ماذا ستحصل عليه",
      offerings: [
        "لوحات معلومات (داشبورد) لمؤشرات الأداء الرئيسية: المبيعات والعمليات والتسويق والمالية في مكان واحد.",
        "نمذجة البيانات وكتابة معادلات DAX بطريقة تبقى دقيقة مع نمو بياناتك.",
        "تقارير آلية توفّر ساعات من العمل اليدوي على الإكسل كل أسبوع.",
        "تنظيف البيانات وربط المصادر المختلفة: Excel وقواعد البيانات SQL و Google Analytics وأنظمة عملك.",
        "تدريب فريقك وتوثيق كامل حتى تتمكنوا من استخدام اللوحات وتطويرها بأنفسكم.",
      ],
      processTitle: "كيف نعمل معاً",
      process: [
        "مكالمة تعارف مجانية: نحدد الأسئلة التي يجب أن تجيب عنها اللوحة والمؤشرات الأهم لعملك.",
        "مراجعة البيانات: أفحص المصادر وأنظّف ما يحتاج تنظيفاً وأبني نموذج البيانات.",
        "البناء والتطوير: ترى لوحات تعمل فعلياً كل أسبوع وتوجّه المسار بملاحظاتك.",
        "التسليم: تدريب وتوثيق ودعم مستمر عند الحاجة.",
      ],
      faqTitle: "أسئلة شائعة",
      faqs: [
        {
          q: "كم تكلفة لوحة معلومات Power BI؟",
          a: "تعتمد التكلفة على عدد مصادر البيانات ومدى حاجتها إلى تنظيف. المشروع النموذجي يستغرق من أسبوعين إلى ستة أسابيع، وبعد مكالمة التعارف المجانية تحصل على عرض سعر ثابت وواضح دون مفاجآت.",
        },
        {
          q: "هل تعمل مع بياناتنا الحالية في Excel أو SQL أو Google Analytics؟",
          a: "نعم. معظم المشاريع تبدأ من مزيج من ملفات إكسل وقاعدة بيانات وتحليلات تسويقية. ربط هذه المصادر وتنظيفها ونمذجتها في عرض واحد موثوق هو جوهر عملي.",
        },
        {
          q: "هل تقدم دعماً بعد التسليم؟",
          a: "نعم. كل مشروع ينتهي بتدريب وتوثيق، وأقدم عقود دعم شهرية للتحديثات وصفحات التقارير الجديدة وأي أسئلة تتعلق بالبيانات مع تطور عملك.",
        },
      ],
      cta: "ابدأ مشروع لوحة المعلومات",
      serviceType: "تطوير لوحات معلومات Power BI وذكاء الأعمال",
    },
  },
  {
    slug: "data-analysis",
    label: { en: "Data & Business Analysis", ar: "تحليل البيانات والأعمال" },
    en: {
      metaTitle: "Freelance Data Analyst & Business Analyst",
      metaDescription:
        "Freelance data analysis and business analysis from Amman, Jordan. KPI frameworks, ad-hoc analysis, and clear recommendations that turn your numbers into decisions. Remote across MENA.",
      h1: "Data Analysis & Business Analysis",
      intro: [
        "I'm a freelance data analyst and business analyst. Before I built dashboards or ran campaigns, analysis was the job: finding where a business bleeds value, defining the metrics that expose it, and turning messy numbers into a decision someone can act on.",
        "That training came from six years in demanding environments: IT risk and controls at Deloitte, crew operations analytics for Republic Airways, and growth analytics for automotive retail in Dubai. I work remotely from Amman, Jordan with clients across the MENA region and worldwide.",
      ],
      offeringsTitle: "What you get",
      offerings: [
        "KPI frameworks and measurement plans: agreeing what success looks like before anyone builds anything.",
        "Ad-hoc analysis in Excel, SQL, and Python: pricing, churn, funnel, and operations questions answered with evidence.",
        "Business analysis: requirements gathering, process mapping, and the documentation your developers or vendors need.",
        "A/B test design and honest readouts, so you know what actually moved the number.",
        "Recurring reporting with commentary: not just charts, but what changed and what to do about it.",
      ],
      processTitle: "How it works",
      process: [
        "Free discovery call: we frame the question and the decision it feeds.",
        "Data collection and cleanup: I gather what exists and flag what's missing.",
        "Analysis: I dig in, pressure-test the findings, and quantify the options.",
        "Recommendation: a short written readout plus a walkthrough call, in plain language.",
      ],
      faqTitle: "Common questions",
      faqs: [
        {
          q: "What's the difference between data analysis and business analysis?",
          a: "Data analysis answers questions with your numbers: why sales dipped, which channel converts, where costs leak. Business analysis defines what a process or system should do: requirements, process maps, and acceptance criteria. Most real projects need both, which is why I offer them together.",
        },
        {
          q: "What tools do you work with?",
          a: "Excel and Google Sheets, SQL, Python, Power BI, and Google Analytics. I match the tool to the problem and to what your team can maintain afterwards.",
        },
        {
          q: "Is my business too small for a data analyst?",
          a: "No. Small businesses often get the fastest wins because nobody has ever looked at the numbers properly. A one-week analysis of sales or marketing data is a common starting engagement.",
        },
      ],
      cta: "Start an analysis project",
      serviceType: "Data analysis and business analysis consulting",
    },
    ar: {
      metaTitle: "محلل بيانات وأعمال مستقل | تحليل البيانات لقرارات أفضل",
      metaDescription:
        "خدمات تحليل بيانات وتحليل أعمال مستقلة من عمّان: تحديد مؤشرات الأداء، تحليل المبيعات والتسويق والعمليات، وتوصيات واضحة تحوّل أرقامك إلى قرارات. أعمل عن بُعد في كل المنطقة العربية.",
      h1: "تحليل البيانات وتحليل الأعمال",
      intro: [
        "أعمل كمحلل بيانات ومحلل أعمال مستقل. قبل أن أبني لوحات المعلومات أو أدير الحملات، كان التحليل هو مهنتي الأساسية: اكتشاف أين يخسر العمل قيمته، وتحديد المؤشرات التي تكشف ذلك، وتحويل الأرقام المبعثرة إلى قرار يمكن تنفيذه.",
        "اكتسبت هذه الخبرة من ست سنوات في بيئات عمل صارمة: تدقيق أنظمة المعلومات في ديلويت، وتحليلات عمليات الطواقم لشركة طيران أمريكية، وتحليلات النمو لقطاع السيارات في دبي. أعمل عن بُعد من عمّان مع عملاء في كل المنطقة العربية.",
      ],
      offeringsTitle: "ماذا ستحصل عليه",
      offerings: [
        "بناء منظومة مؤشرات أداء رئيسية: نتفق على شكل النجاح قبل أن يبني أحد أي شيء.",
        "تحليلات مخصصة باستخدام Excel و SQL و Python: أسئلة التسعير والتسرب ومسار التحويل والعمليات مجابة بالأدلة.",
        "تحليل أعمال: جمع المتطلبات ورسم العمليات وإعداد الوثائق التي يحتاجها المطورون أو الموردون.",
        "تصميم اختبارات A/B وقراءة نتائجها بصدق، لتعرف ما الذي حرّك الرقم فعلاً.",
        "تقارير دورية مع تعليق تحليلي: ليس رسوماً بيانية فقط، بل ما الذي تغيّر وما الذي يجب فعله.",
      ],
      processTitle: "كيف نعمل معاً",
      process: [
        "مكالمة تعارف مجانية: نصيغ السؤال والقرار المرتبط به.",
        "جمع البيانات وتنظيفها: أجمع الموجود وأحدد الناقص.",
        "التحليل: أتعمق في الأرقام وأختبر النتائج وأقيس الخيارات.",
        "التوصية: تقرير مكتوب مختصر مع مكالمة شرح بلغة واضحة.",
      ],
      faqTitle: "أسئلة شائعة",
      faqs: [
        {
          q: "ما الفرق بين تحليل البيانات وتحليل الأعمال؟",
          a: "تحليل البيانات يجيب عن الأسئلة من أرقامك: لماذا انخفضت المبيعات، وأي قناة تسويقية تحقق التحويل، وأين تتسرب التكاليف. أما تحليل الأعمال فيحدد ما يجب أن تفعله عملية أو نظام ما: المتطلبات وخرائط العمليات ومعايير القبول. معظم المشاريع الحقيقية تحتاج الاثنين معاً، ولهذا أقدمهما معاً.",
        },
        {
          q: "ما الأدوات التي تستخدمها؟",
          a: "Excel و Google Sheets و SQL و Python و Power BI و Google Analytics. أختار الأداة المناسبة للمشكلة ولقدرة فريقك على الاستمرار بها لاحقاً.",
        },
        {
          q: "هل عملي صغير على توظيف محلل بيانات؟",
          a: "لا. الشركات الصغيرة غالباً ما تحقق أسرع المكاسب لأن أحداً لم ينظر إلى أرقامها بعمق من قبل. تحليل لمدة أسبوع واحد لبيانات المبيعات أو التسويق هو نقطة بداية شائعة.",
        },
      ],
      cta: "ابدأ مشروع تحليل",
      serviceType: "استشارات تحليل البيانات وتحليل الأعمال",
    },
  },
  {
    slug: "web-development",
    label: { en: "Web Development", ar: "تصميم وبرمجة المواقع" },
    en: {
      metaTitle: "Freelance Web Developer for Websites & Web Apps",
      metaDescription:
        "Freelance web development from Amman, Jordan: fast, SEO-ready websites and web apps built with Next.js and React. Fixed-scope builds for startups and small businesses across MENA.",
      h1: "Website & Web App Development",
      intro: [
        "I'm a freelance web developer building websites and web applications that load fast, rank well, and are easy to maintain. I work with a modern stack (Next.js, React, TypeScript, and Tailwind), and every build ships SEO-ready: clean structure, metadata, sitemaps, and performance budgets from day one.",
        "The site you're reading is my own work, and my background includes internal web applications for airline crew operations, so I'm comfortable with both marketing sites and tools people rely on daily. Based in Amman, Jordan; working remotely across MENA and worldwide.",
      ],
      offeringsTitle: "What you get",
      offerings: [
        "Marketing websites and portfolios: designed, built, and launched end to end.",
        "Web applications and internal tools: dashboards, booking flows, and admin panels.",
        "Performance and technical SEO built in: fast Core Web Vitals, structured data, and clean URLs.",
        "Analytics wired from launch, so you know what visitors do from day one.",
        "Maintenance and iteration after launch, on retainer or per request.",
      ],
      processTitle: "How it works",
      process: [
        "Scope: a free call to define pages, features, and a fixed price.",
        "Design and build: you get a working preview link and weekly updates.",
        "Launch: deployed on fast, reliable hosting with analytics and SEO checks done.",
        "Handover: you own the code, the domain, and the content workflow.",
      ],
      faqTitle: "Common questions",
      faqs: [
        {
          q: "How long does a website take, and what does it cost?",
          a: "A focused marketing site typically takes 2 to 4 weeks; web apps depend on features. Every project starts with a free scoping call and a fixed-scope quote, so the price is agreed before work begins.",
        },
        {
          q: "Do you handle design as well as development?",
          a: "Yes for most business sites: layout, typography, and responsive design are part of the build. For complex brand work I collaborate with your designer or recommend one.",
        },
        {
          q: "Will my website rank on Google?",
          a: "I build every site technically SEO-ready: speed, structure, metadata, and sitemaps. Honest caveat: ranking also depends on your content and links over time. I offer SEO and content support as a separate ongoing service if you want help with that side too.",
        },
      ],
      cta: "Start a website project",
      serviceType: "Website and web application development",
    },
    ar: {
      metaTitle: "تصميم وبرمجة مواقع | مطور ويب مستقل",
      metaDescription:
        "خدمات تصميم وبرمجة مواقع مستقلة من عمّان: مواقع سريعة وجاهزة لمحركات البحث وتطبيقات ويب مبنية بأحدث التقنيات (Next.js و React) وبسعر ثابت متفق عليه. أعمل عن بُعد في كل المنطقة العربية.",
      h1: "تصميم وبرمجة المواقع وتطبيقات الويب",
      intro: [
        "أعمل كمطور ويب مستقل، أبني مواقع وتطبيقات ويب سريعة التحميل وسهلة الصيانة وجاهزة للظهور في نتائج البحث. أستخدم أحدث التقنيات مثل Next.js و React و TypeScript، وكل موقع أسلّمه يكون مجهزاً لتحسين محركات البحث (SEO) من اليوم الأول: بنية نظيفة وبيانات وصفية وخرائط موقع وأداء عالٍ.",
        "الموقع الذي تتصفحه الآن من تصميمي وبرمجتي، وتشمل خبرتي بناء تطبيقات داخلية لعمليات طواقم شركات الطيران، لذا أتقن المواقع التسويقية والأدوات التي يعتمد عليها الناس يومياً. أعمل من عمّان، الأردن، وعن بُعد مع عملاء في كل الدول العربية.",
      ],
      offeringsTitle: "ماذا ستحصل عليه",
      offerings: [
        "مواقع تسويقية ومواقع شخصية واحترافية: تصميم وبناء وإطلاق من البداية إلى النهاية.",
        "تطبيقات ويب وأدوات داخلية: لوحات تحكم وأنظمة حجز وصفحات إدارة.",
        "أداء عالٍ وتهيئة تقنية لمحركات البحث: سرعة تحميل ممتازة وبيانات منظمة وروابط نظيفة.",
        "ربط التحليلات منذ الإطلاق، لتعرف ماذا يفعل زوارك من اليوم الأول.",
        "صيانة وتطوير مستمر بعد الإطلاق، بعقد شهري أو عند الطلب.",
      ],
      processTitle: "كيف نعمل معاً",
      process: [
        "تحديد النطاق: مكالمة مجانية نحدد فيها الصفحات والمزايا وسعراً ثابتاً.",
        "التصميم والبناء: تحصل على رابط معاينة يعمل فعلياً وتحديثات أسبوعية.",
        "الإطلاق: نشر على استضافة سريعة وموثوقة مع فحوصات SEO والتحليلات.",
        "التسليم: تملك الكود والنطاق وطريقة تحديث المحتوى بالكامل.",
      ],
      faqTitle: "أسئلة شائعة",
      faqs: [
        {
          q: "كم يستغرق بناء الموقع وكم يكلف؟",
          a: "الموقع التسويقي المركّز يستغرق عادة من أسبوعين إلى أربعة أسابيع، أما تطبيقات الويب فتعتمد على المزايا المطلوبة. كل مشروع يبدأ بمكالمة مجانية لتحديد النطاق وعرض سعر ثابت يُتفق عليه قبل بدء العمل.",
        },
        {
          q: "هل تقوم بالتصميم إضافة إلى البرمجة؟",
          a: "نعم لمعظم مواقع الأعمال: التخطيط والخطوط والتجاوب مع الشاشات جزء من العمل. وللهويات البصرية المعقدة أتعاون مع مصممك أو أرشح لك مصمماً.",
        },
        {
          q: "هل سيظهر موقعي في نتائج بحث جوجل؟",
          a: "أبني كل موقع مهيأً تقنياً لمحركات البحث: السرعة والبنية والبيانات الوصفية وخرائط الموقع. وبصراحة: الترتيب يعتمد أيضاً على المحتوى والروابط مع الوقت، وأقدم خدمة SEO ومحتوى مستمرة إذا أردت المساعدة في هذا الجانب أيضاً.",
        },
      ],
      cta: "ابدأ مشروع موقعك",
      serviceType: "تصميم وتطوير المواقع وتطبيقات الويب",
    },
  },
  {
    slug: "digital-marketing",
    label: { en: "Digital Marketing & SEO", ar: "التسويق الرقمي و SEO" },
    en: {
      metaTitle: "Freelance Digital Marketing: SEO, Paid Ads & Analytics",
      metaDescription:
        "Freelance digital marketing from Amman, Jordan: SEO, Google and Meta ads, and analytics that tie every dirham of spend to results. Bilingual Arabic-English campaigns across MENA.",
      h1: "SEO, Paid Ads & Marketing Analytics",
      intro: [
        "I'm a freelance digital marketer who runs marketing like an analyst: every campaign, post, and keyword gets wired to analytics, so spend traces to outcomes instead of impressions. Paid acquisition on Google, Meta, and Snapchat; SEO that wins the searches your customers actually type; and reporting a founder can read in five minutes.",
        "I've run growth for automotive retail in Dubai and marketing for brands in Amman, in both Arabic and English. Based in Jordan, working remotely across Saudi Arabia, the UAE, and the wider MENA region.",
      ],
      offeringsTitle: "What you get",
      offerings: [
        "Paid campaigns on Google Ads, Facebook, Instagram, and Snapchat: strategy, creative direction, targeting, and optimization.",
        "SEO: technical audits, keyword strategy, and content plans, in Arabic and English.",
        "Analytics setup with GA4 and dashboards that tie spend and content to revenue.",
        "Social media management: content calendars and community across the platforms that matter to you.",
        "Landing pages and conversion optimization, so traffic you pay for actually converts.",
      ],
      processTitle: "How it works",
      process: [
        "Audit: a free review of your current funnel, ads, and search presence.",
        "Strategy and setup: channels, budgets, tracking, and targets agreed up front.",
        "Run and optimize: weekly iteration on creative, keywords, and bids.",
        "Report: monthly readouts in plain language, tied to revenue, not vanity metrics.",
      ],
      faqTitle: "Common questions",
      faqs: [
        {
          q: "Do you run campaigns in Arabic and English?",
          a: "Yes, natively in both. That includes Arabic keyword research, ad copy, and landing pages, which matters in MENA where most search happens in Arabic while much of the competition only invests in English.",
        },
        {
          q: "What ad budgets do you work with?",
          a: "From small test budgets for early-stage brands to established monthly spends. What matters is that tracking is in place first, so whatever you spend is measured and accountable.",
        },
        {
          q: "How do you report results?",
          a: "A monthly dashboard and short written summary: what we spent, what it returned, what we're changing next. You'll never get a screenshot of impressions and be told it went well.",
        },
      ],
      cta: "Start a marketing engagement",
      serviceType: "Digital marketing, SEO, and paid advertising",
    },
    ar: {
      metaTitle: "خدمات التسويق الرقمي | سيو، إعلانات ممولة، وتحليلات",
      metaDescription:
        "مسوّق رقمي مستقل من عمّان: تحسين محركات البحث (سيو)، إدارة الإعلانات الممولة على جوجل وميتا وسناب شات، وتحليلات تربط كل ما تنفقه بالنتائج. حملات بالعربية والإنجليزية في كل المنطقة.",
      h1: "التسويق الرقمي: سيو وإعلانات ممولة وتحليلات",
      intro: [
        "أعمل كمسوّق رقمي مستقل أدير التسويق بعقلية المحلل: كل حملة ومنشور وكلمة مفتاحية تُربط بالتحليلات، ليصبح الإنفاق مرتبطاً بالنتائج لا بعدد المشاهدات. إعلانات ممولة على جوجل وميتا وسناب شات، وتحسين محركات البحث (SEO) للكلمات التي يكتبها عملاؤك فعلاً، وتقارير يفهمها صاحب العمل في خمس دقائق.",
        "أدرت النمو الرقمي لقطاع السيارات في دبي والتسويق لعلامات تجارية في عمّان، بالعربية والإنجليزية. أعمل من الأردن وعن بُعد مع عملاء في السعودية والإمارات وكل المنطقة العربية.",
      ],
      offeringsTitle: "ماذا ستحصل عليه",
      offerings: [
        "حملات ممولة على Google Ads وفيسبوك وإنستغرام وسناب شات: استراتيجية وإبداع واستهداف وتحسين مستمر.",
        "تحسين محركات البحث (سيو): تدقيق تقني واستراتيجية كلمات مفتاحية وخطط محتوى بالعربية والإنجليزية.",
        "إعداد التحليلات عبر GA4 ولوحات معلومات تربط الإنفاق والمحتوى بالإيرادات.",
        "إدارة حسابات التواصل الاجتماعي: تقويم محتوى وتفاعل على المنصات المهمة لعملك.",
        "صفحات هبوط وتحسين معدل التحويل، ليتحول الزائر الذي دفعت ثمنه إلى عميل.",
      ],
      processTitle: "كيف نعمل معاً",
      process: [
        "التدقيق: مراجعة مجانية لمسار التحويل الحالي وإعلاناتك وحضورك في نتائج البحث.",
        "الاستراتيجية والإعداد: نتفق على القنوات والميزانيات والتتبع والأهداف مسبقاً.",
        "التشغيل والتحسين: تطوير أسبوعي للإعلانات والكلمات المفتاحية والعروض.",
        "التقارير: ملخص شهري بلغة واضحة مرتبط بالإيرادات لا بمقاييس شكلية.",
      ],
      faqTitle: "أسئلة شائعة",
      faqs: [
        {
          q: "هل تدير حملات بالعربية والإنجليزية؟",
          a: "نعم، باللغتين وبطلاقة. يشمل ذلك بحث الكلمات المفتاحية العربية وكتابة الإعلانات وصفحات الهبوط، وهو ما يصنع الفرق في منطقتنا حيث تتم أغلب عمليات البحث بالعربية بينما يستثمر معظم المنافسين بالإنجليزية فقط.",
        },
        {
          q: "ما حجم الميزانيات الإعلانية التي تعمل معها؟",
          a: "من ميزانيات تجريبية صغيرة للعلامات الناشئة إلى إنفاق شهري مستقر للشركات القائمة. الأهم أن يكون التتبع جاهزاً أولاً، ليكون كل ما تنفقه مقاساً وخاضعاً للمساءلة.",
        },
        {
          q: "كيف تقدم تقارير النتائج؟",
          a: "لوحة معلومات شهرية وملخص مكتوب قصير: ماذا أنفقنا، وماذا حقق، وماذا سنغيّر لاحقاً. لن تصلك أبداً لقطة شاشة لعدد المشاهدات مع عبارة «الحملة ناجحة».",
        },
      ],
      cta: "ابدأ العمل على تسويقك",
      serviceType: "التسويق الرقمي وتحسين محركات البحث والإعلانات الممولة",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
