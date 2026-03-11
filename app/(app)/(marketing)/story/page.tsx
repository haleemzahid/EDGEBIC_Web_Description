import * as React from 'react';
import { createPageMetadata } from '@/lib/seo/metadata';

import { StoryHero } from '@/components/marketing/sections/story-hero';
import { StoryTeam } from '@/components/marketing/sections/story-team';
import { StoryTimeline } from '@/components/marketing/sections/story-timeline';
import { StoryValues } from '@/components/marketing/sections/story-values';
import { StoryVision } from '@/components/marketing/sections/story-vision';

export const metadata = createPageMetadata({
  title: 'Our Story',
  description:
    'The story of User Solutions and RMDB - over 35 years of helping manufacturers improve production planning and scheduling.',
  path: '/story',
  keywords: 'User Solutions story, RMDB story, manufacturing software history'
});

export default function StoryPage(): React.JSX.Element {
  return (
    <>
      <StoryHero />
      <StoryVision />
      <StoryTeam />
      <StoryTimeline />
      <StoryValues />
    </>
  );
}
