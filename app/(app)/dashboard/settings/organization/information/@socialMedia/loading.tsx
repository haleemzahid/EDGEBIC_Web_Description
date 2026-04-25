import * as React from 'react';

import { SocialMediaSkeletonCard } from '@/components/dashboard/settings/organization/information/social-media-skeleton-card';
import { AnnotatedSection } from '@/components/ui/annotated';

export default function SocialMediaLoading(): React.JSX.Element {
  return (
    <AnnotatedSection
      title="YouTube Video"
      description="Set the YouTube video that will be displayed on your homepage and admin dashboard. This video will be visible to all visitors."
    >
      <SocialMediaSkeletonCard />
    </AnnotatedSection>
  );
}
