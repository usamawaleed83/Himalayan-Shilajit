import React, { useState } from 'react';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: 'What is Himalayan Shilajit?',
      answer: 'Himalayan Shilajit is a natural resin that oozes from rocks in the high mountains of the Himalayas. It is rich in fulvic acid and contains over 84 essential minerals. It has been used in traditional Ayurvedic medicine for thousands of years to promote health, vitality, and longevity.',
    },
    {
      question: 'How do I use Shilajit?',
      answer: 'For the resin form, take a pea-sized amount (200-300mg) once or twice daily. Dissolve it in warm water, milk, or tea. For capsules, take 1-2 capsules daily with water, preferably on an empty stomach. It\'s best to start with a smaller dose and gradually increase as needed.',
    },
    {
      question: 'What are the benefits of Shilajit?',
      answer: 'Shilajit is known to boost energy levels, support immune function, enhance cognitive performance, improve physical endurance, promote healthy aging, and provide essential minerals that may be lacking in modern diets.',
    },
    {
      question: 'Is your Shilajit authentic?',
      answer: 'Yes, we source our Shilajit directly from the Himalayas. All our products are tested for purity and authenticity. We ensure no additives, fillers, or synthetic ingredients are added.',
    },
    {
      question: 'How long until I see results?',
      answer: 'Results vary from person to person. Some people notice increased energy within a few days, while others may take 2-4 weeks to experience the full benefits. Consistent daily use is recommended for optimal results.',
    },
    {
      question: 'Are there any side effects?',
      answer: 'Shilajit is generally safe when taken in recommended doses. However, if you have any medical conditions or are taking medications, we recommend consulting with a healthcare professional before use. Pregnant or nursing women should avoid Shilajit.',
    },
    {
      question: 'How should I store Shilajit?',
      answer: 'Store Shilajit in a cool, dry place away from direct sunlight. Keep the container tightly sealed. The resin form should be kept at room temperature and will remain stable for years if stored properly.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we ship within the United States. We are working on expanding our shipping options. Please check our shipping policy page for the most up-to-date information.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold font-medium tracking-wider uppercase text-sm mb-2 block">Common Questions</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Everything you need to know about Himalayan Shilajit
          </p>

          {/* Search Input */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-full border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold outline-none shadow-sm transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="font-semibold text-primary text-lg">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-primary transition-transform duration-300 ${openIndex === index ? 'transform rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-6 py-4 text-gray-600 leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No matching questions found.</p>
            </div>
          )}
        </div>
      </div>
    </section >
  );
};

export default FAQAccordion;




