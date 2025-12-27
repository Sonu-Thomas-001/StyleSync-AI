import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-6 md:px-12 py-12 animate-fade-in-up min-h-screen">
      <div className="mb-16 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Legal</span>
        <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Privacy Policy</h2>
        <p className="text-stone-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      <div className="space-y-12 text-stone-600 font-light leading-relaxed">
        <section>
          <h3 className="font-serif text-2xl text-stone-900 mb-4">1. Introduction</h3>
          <p>
            Welcome to StyleSync AI. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section>
          <h3 className="font-serif text-2xl text-stone-900 mb-4">2. The Data We Collect</h3>
          <p className="mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-5 space-y-2 marker:text-stone-400">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
            <li><strong>Uploaded Content:</strong> images of clothing items you upload for analysis.</li>
          </ul>
        </section>

        <section>
          <h3 className="font-serif text-2xl text-stone-900 mb-4">3. How We Use Your Data</h3>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-stone-400">
            <li>To provide the AI styling services you request.</li>
            <li>To manage our relationship with you.</li>
            <li>To improve our website, products/services, marketing, customer relationships, and experiences.</li>
            <li>To process and analyze images using Google Gemini AI models.</li>
          </ul>
        </section>

        <section>
          <h3 className="font-serif text-2xl text-stone-900 mb-4">4. AI Image Processing</h3>
          <p>
            Images you upload are processed by artificial intelligence models (Google Gemini) to generate outfit recommendations. These images are processed transiently for the purpose of generating your requested content. We do not use your personal photos to train public AI models without your explicit consent.
          </p>
        </section>

        <section>
          <h3 className="font-serif text-2xl text-stone-900 mb-4">5. Contact Us</h3>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at support@stylesync.ai.
          </p>
        </section>
      </div>
    </div>
  );
};