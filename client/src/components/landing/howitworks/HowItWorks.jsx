import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { prosumerSteps, consumerSteps } from "./HowItWorksStepsData.js";
import HowItWorksHeader from "./HowItWorksHeader.jsx";
import HowItWorksStepList from "./HowItWorksStepList.jsx";
import HowItWorksSpecBox from "./HowItWorksSpecBox.jsx";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("prosumer");
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const { theme } = useTheme();

  const steps = activeTab === "prosumer" ? prosumerSteps : consumerSteps;
  const currentStep = steps[selectedStepIndex] || steps[0];

  const handleNextStep = () => {
    setSelectedStepIndex((prev) => (prev + 1) % steps.length);
  };

  return (
    <section id="how-it-works" className={`relative overflow-hidden py-2 sm:py-3 h-[calc(100vh-73px)] max-h-[calc(100vh-73px)] flex flex-col justify-center border-t border-b scroll-mt-[72px] transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-900 text-white border-slate-800" : "bg-white text-slate-900 border-slate-200"
    }`}>
      <div className={`absolute top-1/4 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
        theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-100/60"
      }`} />
      <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
        theme === "dark" ? "bg-teal-500/10" : "bg-teal-100/60"
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <HowItWorksHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSelectedStepIndex={setSelectedStepIndex}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-center">
          <HowItWorksStepList
            steps={steps}
            selectedStepIndex={selectedStepIndex}
            setSelectedStepIndex={setSelectedStepIndex}
          />
          <div className="lg:col-span-5">
            <HowItWorksSpecBox currentStep={currentStep} onNextStep={handleNextStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
