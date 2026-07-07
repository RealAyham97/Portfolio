import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMeta({
  title: "الأسئلة الشائعة",
  description:
    "إجابات عن الأسئلة الشائعة حول العمل مع أيهم الرواشدة: تصميم المواقع، لوحات معلومات Power BI، تحليل البيانات، والتسويق الرقمي في الأردن والمنطقة العربية.",
  path: "/ar/faq",
  locale: "ar_JO",
  languages: { en: "/faq", ar: "/ar/faq", "x-default": "/faq" },
});

const faqs = [
  {
    q: "ما الخدمات التي تقدمها؟",
    a: "أعمل في مجالين رئيسيين: خدمات تقنية (تصميم وبرمجة المواقع، تحليل البيانات، تحليل الأعمال، وذكاء الأعمال عبر Power BI) والتسويق الرقمي (الإعلانات الممولة وتحسين محركات البحث والتحليلات). كلا المجالين قائم على البيانات ومبني حول نتائج قابلة للقياس.",
  },
  {
    q: "هل تبني لوحات معلومات Power BI كمستقل؟",
    a: "نعم، هذه من أكثر خدماتي طلباً. أبني لوحات معلومات تفاعلية تجمع بياناتك من Excel وقواعد البيانات وGoogle Analytics في مكان واحد، مع تدريب لفريقك ودعم مستمر عند الحاجة.",
  },
  {
    q: "هل يمكنك بناء موقعي والتسويق له أيضاً؟",
    a: "نعم، وهذا ما يميز عملي: أبني المواقع مهيأة لمحركات البحث من اليوم الأول، ثم أدير الإعلانات والسيو والتحليلات بعد الإطلاق، فيكون البناء والتسويق منظومة واحدة متصلة بدل جهتين منفصلتين.",
  },
  {
    q: "مع من تعمل عادة؟",
    a: "مؤسسون في مراحل مبكرة يحتاجون استراتيجية نمو، وشركات متوسطة تريد استخراج رؤى تشغيلية من بياناتها. عملت في قطاعات السيارات والطيران والاستشارات والإعلام.",
  },
  {
    q: "أين مقرك؟ وهل تعمل عن بُعد؟",
    a: "مقري في عمّان، الأردن، وأعمل مع العملاء عن بُعد وحضورياً في السعودية والإمارات وسائر المنطقة العربية.",
  },
  {
    q: "كيف أبدأ العمل معك؟",
    a: "أسهل طريقة هي عبر صفحة التواصل. أرسل رسالة تصف باختصار ما تحاول حله وسأرد عليك خلال 24 ساعة.",
  },
  {
    q: "هل أنت متاح لمشاريع مستقلة أو استشارات؟",
    a: "نعم. أنا متاح للمشاريع المستقلة والاستشارات والأدوار طويلة الأمد، قصيرة كانت أو طويلة بحسب النطاق والتوافق.",
  },
  {
    q: "كيف يبدو المشروع النموذجي؟",
    a: "يبدأ عادة بجلسة تعارف لفهم المشكلة، يليها عرض محدد النطاق والسعر. بعدها يعتمد الأمر على طبيعة العمل: لوحات المعلومات والأتمتة تستغرق عادة من أسبوعين إلى ستة أسابيع، أما الحملات التسويقية فمستمرة.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "ar",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ArabicFAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteNav />
      <div lang="ar" dir="rtl">
        <main>
          <section className="mx-auto max-w-6xl px-6 pt-32 pb-4 md:pt-40 md:pb-8">
            <Reveal>
              <h1
                className="font-display italic text-text/80 leading-none"
                style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
              >
                الأسئلة الشائعة
              </h1>
            </Reveal>
            <Reveal>
              <Link
                href="/faq"
                className="mt-4 inline-block font-mono text-xs uppercase tracking-wider text-text-muted underline underline-offset-4 transition hover:text-text"
              >
                Read this page in English
              </Link>
            </Reveal>
          </section>

          <section className="mx-auto max-w-3xl px-6 py-12 md:py-16">
            <dl className="divide-y divide-border border-t border-border">
              {faqs.map((item) => (
                <Reveal key={item.q}>
                  <div className="py-6">
                    <dt className="text-base font-medium text-text">{item.q}</dt>
                    <dd className="mt-2 text-text-muted leading-relaxed">{item.a}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </section>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
