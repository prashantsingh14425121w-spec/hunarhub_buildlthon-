/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeroSection } from './HeroSection';
import { HowItWorksSection } from './HowItWorksSection';
import { ProofShowcaseSection } from './ProofShowcaseSection';
import { WhyNoStarsSection } from './WhyNoStarsSection';
import { FaqSection } from './FaqSection';

interface LandingPageProps {
  onPostRequirement: (samplePrompt?: string) => void;
  onExploreCaseStudy: () => void;
}

export function LandingPage({
  onPostRequirement,
  onExploreCaseStudy,
}: LandingPageProps) {
  return (
    <div className="space-y-0">
      <HeroSection
        onPostRequirement={onPostRequirement}
        onExploreCaseStudy={onExploreCaseStudy}
      />
      <HowItWorksSection onStartClick={() => onPostRequirement()} />
      <ProofShowcaseSection />
      <WhyNoStarsSection />
      <FaqSection />
    </div>
  );
}
