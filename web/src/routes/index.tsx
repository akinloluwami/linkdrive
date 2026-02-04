import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Folder03Icon,
  LabelImportantIcon,
  Search01Icon,
  StarIcon,
  Globe02Icon,
  Add01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  ArrowDown01Icon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-accent/20 selection:text-accent-hover">
      <Header />
      <main>
        <Hero />
        <Features />
        <BrowserSupport />
        <Testimonials />
        <FAQ />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-accent text-white p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <HugeiconsIcon icon={Folder03Icon} className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            LinkDrive<span className="text-accent">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 bg-gray-50/80 px-6 py-2 rounded-full border border-gray-100 backdrop-blur-sm">
          {["Features", "Testimonials", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-600 hover:text-accent transition-colors relative group"
            >
              {item}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/app/bookmarks"
            className="hidden md:flex text-sm font-semibold text-gray-700 hover:text-accent transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/app/bookmarks"
            className="text-sm font-semibold bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-accent hover:shadow-lg hover:shadow-accent/25 transition-all active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-[800px] -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50/50 via-white to-white" />
      
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 shadow-sm mb-8 hover:border-accent/50 transition-colors cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            v2.0 is now live
            <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 text-gray-400" />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Unbelievably good
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-600 relative">
              bookmark manager
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
            .
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
            LinkDrive is the bookmark manager that feels like magic. 
            Organize your digital life with beautiful collections, smart tags, 
            and instant search.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              to="/app/bookmarks"
              className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Start for free
              <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2">
              <HugeiconsIcon icon={PlayIcon} className="w-5 h-5" />
              Watch demo
            </button>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
           <div className="relative z-10 bg-white rounded-t-[2rem] shadow-2xl shadow-gray-200/50 border-x border-t border-gray-200 p-2 pb-0">
              <div className="bg-gray-50 rounded-t-3xl overflow-hidden border-x border-t border-gray-100 min-h-[400px] md:min-h-[500px] relative">
                  {/* Browser Bar */}
                  <div className="h-10 bg-white border-b border-gray-100 flex items-center px-4 gap-2 absolute top-0 inset-x-0 z-20">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <div className="flex-1 text-center -ml-16">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-md text-xs text-gray-400 font-mono">
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-3 h-3 text-green-500" />
                        linkdrive.app
                      </div>
                    </div>
                  </div>

                  {/* UI Content Mockup - Centered */}
                  <div className="pt-20 px-8 pb-8 flex flex-col items-center">
                      {/* Search Bar */}
                      <div className="w-full max-w-lg h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center px-4 gap-3 mb-10">
                        <HugeiconsIcon icon={Search01Icon} className="w-5 h-5 text-gray-400" />
                        <div className="h-2 w-24 bg-gray-100 rounded-full" />
                      </div>

                      {/* Collections Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
                         {[{c:'bg-blue-500', i: Folder03Icon}, {c:'bg-purple-500', i: StarIcon}, {c:'bg-green-500', i:Globe02Icon}, {c:'bg-amber-500', i:LabelImportantIcon}].map((item, i) => (
                           <div key={i} className="aspect-square bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                              <div className={`w-10 h-10 ${item.c} rounded-lg flex items-center justify-center text-white`}>
                                 <HugeiconsIcon icon={item.i} className="w-5 h-5" />
                              </div>
                              <div className="h-2 w-16 bg-gray-100 rounded-full" />
                           </div>
                         ))}
                      </div>
                  </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-32">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Designed for how you work
          </h2>
          <p className="text-xl text-gray-600">
            A complete system for your digital life, not just another list of links.
          </p>
        </div>

        {/* Feature 1: Collections */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
           <div className="flex-1">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <HugeiconsIcon icon={Folder03Icon} className="w-7 h-7" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Collections for everything
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Project research, reading lists, or design inspiration. 
                Create collections that make sense to you and keep your workspace clutter-free.
              </p>
              <ul className="space-y-4">
                {[
                  "Drag and drop organization",
                  "Nested collections (soon)",
                  "Custom icons and colors"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
           </div>
           <div className="flex-1 w-full bg-blue-50 rounded-[2.5rem] p-12 relative overflow-hidden h-[500px] border border-blue-100">
               {/* Abstract decorative cards */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white rounded-3xl shadow-xl shadow-blue-200/50 p-6 rotate-3 hover:rotate-0 transition-transform duration-500">
                 <div className="w-full h-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center relative">
                    <div className="absolute top-4 left-4 w-32 h-8 bg-blue-100 rounded-full opacity-50" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-blue-500 rounded-full opacity-10" />
                    <HugeiconsIcon icon={Folder03Icon} className="w-24 h-24 text-blue-200" />
                 </div>
               </div>
           </div>
        </div>

        {/* Feature 2: Smart Tags (Reversed) */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
           <div className="flex-1">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <HugeiconsIcon icon={LabelImportantIcon} className="w-7 h-7" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Find anything, instantly
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Stop digging through folders. Use smart tags to categorize content 
                across multiple dimensions and find it with our lightning-fast search.
              </p>
              <div className="bg-gray-900 text-white p-6 rounded-2xl font-mono text-sm shadow-xl">
                 <div className="flex gap-2 mb-2 text-gray-400">
                   <span className="text-pink-500">$</span> search "design system"
                 </div>
                 <div className="text-green-400">Found 3 results (0.02s)</div>
              </div>
           </div>
           <div className="flex-1 w-full bg-purple-50 rounded-[2.5rem] p-12 relative overflow-hidden h-[500px] border border-purple-100">
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="flex flex-wrap gap-4 justify-center max-w-xs content-center opacity-80">
                   {["design", "inspiration", "react", "frontend", "marketing", "ux", "tutorial"].map((tag, i) => (
                     <span key={i} className={`px-4 py-2 rounded-full font-medium shadow-sm border ${
                       i === 3 ? "bg-purple-600 text-white border-purple-600 scale-125 z-10" : "bg-white text-gray-600 border-gray-200"
                     }`}>
                       #{tag}
                     </span>
                   ))}
                 </div>
               </div>
           </div>
        </div>

        {/* Feature 3: Quick Save */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
           <div className="flex-1">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <HugeiconsIcon icon={Add01Icon} className="w-7 h-7" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Save from anywhere
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our browser extension sits quietly in your toolbar. 
                One click saves the current page, automagically filling in details.
              </p>
              <button className="text-orange-600 font-bold flex items-center gap-2 hover:gap-3 transition-all text-lg">
                Install Extension <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
              </button>
           </div>
           <div className="flex-1 w-full bg-orange-50 rounded-[2.5rem] p-12 relative overflow-hidden h-[400px] border border-orange-100 flex items-center justify-center">
              <div className="w-64 h-auto bg-white rounded-xl shadow-2xl border border-gray-100 p-4 absolute right-10 top-10 rotate-6">
                 <div className="flex gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-md" />
                    <div className="flex-1 space-y-2">
                       <div className="h-2 w-full bg-gray-100 rounded-full" />
                       <div className="h-2 w-2/3 bg-gray-50 rounded-full" />
                    </div>
                 </div>
                 <div className="w-full h-8 bg-orange-500 rounded-lg" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

function BrowserSupport() {
  return null; // Removing this for cleaner look based on screenshot
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-32 bg-gray-50">
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-bold text-gray-900 mb-6">Loved by productive people</h2>
             <p className="text-xl text-gray-600">Join the thousands using LinkDrive to organize their web.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Column 1 */}
             <div className="space-y-6">
                <TestimonialCard 
                  name="Sarah Chen" 
                  role="Product Manager" 
                  text="I used to have 500 tabs open. Now I have LinkDrive. It's the only bookmark manager that actually makes sense."
                  stars={5}
                />
                 <TestimonialCard 
                  name="Mark Davis" 
                  role="Developer" 
                  text="The structured data export is a lifesaver. I can use my bookmarks in my own scripts."
                  stars={5}
                />
             </div>
             
             {/* Column 2 */}
             <div className="space-y-6">
                <div className="bg-accent text-white p-8 rounded-3xl shadow-xl shadow-accent/20">
                  <div className="text-2xl font-bold mb-4">"It's just... better."</div>
                  <p className="opacity-90 mb-6">I've tried them all. Raindrop, Pocket, Chrome bookmarks. LinkDrive is the first one that stuck.</p>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white/20 rounded-full" />
                     <div className="font-medium">Jessica Lee</div>
                  </div>
                </div>
                <TestimonialCard 
                  name="Tom Wilson" 
                  role="Freelancer" 
                  text="Collections are exactly what I needed to separate client work. Essential tool for my business."
                  stars={4}
                />
             </div>

             {/* Column 3 */}
             <div className="space-y-6">
                <TestimonialCard 
                  name="Emily Watson" 
                  role="Researcher" 
                  text="The search speed is incredible. I can find an article I read 3 months ago in less than a second."
                  stars={5}
                />
                 <TestimonialCard 
                  name="David Kim" 
                  role="Student" 
                  text="Perfect for my thesis research. The tagging system is flexible enough for complex topics."
                  stars={5}
                />
             </div>
          </div>
       </div>
    </section>
  )
}

function TestimonialCard({ name, role, text, stars }: { name: string, role: string, text: string, stars: number }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
       <div className="flex gap-1 text-amber-400 mb-4">
          {[...Array(stars)].map((_, i) => <HugeiconsIcon key={i} icon={StarIcon} className="w-4 h-4 fill-current" />)}
       </div>
       <p className="text-gray-700 font-medium mb-6 leading-relaxed">"{text}"</p>
       <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
             {name[0]}
          </div>
          <div>
             <div className="font-bold text-gray-900 text-sm">{name}</div>
             <div className="text-xs text-gray-500">{role}</div>
          </div>
       </div>
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // ... (keep faqs data)
  const faqs = [
    {
      question: "Is LinkDrive free to use?",
      answer: "Yes! LinkDrive offers a generous free tier that includes up to 500 bookmarks, 10 collections, and unlimited tags."
    },
    {
       question: "How does the browser extension work?",
       answer: "Our browser extension adds a small icon to your toolbar. Click it on any page to instantly save the bookmark."
    },
    {
       question: "Can I import my existing bookmarks?",
       answer: "Absolutely! LinkDrive supports importing bookmarks from Chrome, Firefox, Safari, and any browser that exports to HTML format."
    },
    {
       question: "Is my data secure?",
       answer: "Your privacy is our top priority. All data is encrypted in transit and at rest."
    },
    {
       question: "Do you have a mobile app?",
       answer: "Yes! We have native iOS and Android apps that sync seamlessly with the web version."
    }
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">F.A.Q.</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left hover:text-accent transition-colors"
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <HugeiconsIcon icon={index === openIndex ? ArrowDown01Icon : ArrowRight01Icon} className="w-5 h-5 text-gray-400" />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterCTA() {
  return (
    <section className="py-20 px-6">
       <div className="max-w-5xl mx-auto bg-orange-50 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

          <div className="relative z-10">
             <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
               Try <span className="text-accent">LinkDrive</span>.<br/>
               Subscribe if you love it.
             </h2>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link
                 to="/app/bookmarks"
                 className="px-10 py-5 bg-accent text-white rounded-full font-bold text-xl shadow-lg shadow-accent/20 hover:shadow-xl hover:scale-105 transition-all"
               >
                 Get Started Now
               </Link>
             </div>
             <p className="mt-8 text-gray-500 font-medium">Free forever plan available.</p>
          </div>
       </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xl font-bold text-white">
            LinkDrive<span className="text-accent">.</span>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
          <div className="text-sm text-gray-500">
            © 2026 LinkDrive. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
