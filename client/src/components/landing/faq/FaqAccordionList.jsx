import React, { useState } from "react";
import FaqItem from "./FaqItem.jsx";

export default function FaqAccordionList({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [helpfulFeedback, setHelpfulFeedback] = useState({});

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleHelpful = (index, value) => {
    setHelpfulFeedback((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <div className="space-y-2">
      {faqs.map((faq, index) => (
        <FaqItem
          key={index}
          faq={faq}
          index={index}
          isOpen={openIndex === index}
          toggleAccordion={toggleAccordion}
          feedback={helpfulFeedback[index]}
          handleHelpful={handleHelpful}
        />
      ))}
    </div>
  );
}
