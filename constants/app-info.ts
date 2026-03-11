import type { ObjectValues } from '@/types/object-values';

import packageInfo from '../package.json';

export const AppInfo = {
  APP_NAME: 'RMDB',
  APP_DESCRIPTION:
    'Resource Manager DB (RMDB) is a flexible and affordable production planning, scheduling, and tracking software designed to adapt to your operations. With EDGEBI graphical extension, we deliver complete manufacturing scheduling solutions. Work with whatever data you have to achieve better production scheduling, just easier and quicker than you ever thought possible.',
  APP_VERSION: '1.0.0',
  COMPANY_NAME: 'User Solutions',
  SUPPORT_EMAIL: 'support@edgebi.com',
  CONTACT_EMAIL: 'contact@edgebi.com',
  VERSION: packageInfo.version,
  SOCIAL_LINKS: {
    LINKEDIN: 'https://www.linkedin.com/company/user-solutions-inc',
    FACEBOOK: 'https://www.facebook.com/UserSolutionsInc',
    X: 'https://x.com/UserSolutionsUS',
    YOUTUBE: 'https://www.youtube.com/@UserSolutionsInc'
  }
} as const;

export type AppInfo = ObjectValues<typeof AppInfo>;
