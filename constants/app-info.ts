import type { ObjectValues } from '@/types/object-values';

import packageInfo from '../package.json';

export const AppInfo = {
  APP_NAME: 'EDGEBI',
  APP_DESCRIPTION:
    'EDGEBI is a flexible and affordable production planning, scheduling, and tracking solution that is designed to adapt to your operations. We can work with whatever data you have to achieve better production scheduling, just easier and quicker than you ever thought possible.',
  APP_VERSION: '1.0.0',
  COMPANY_NAME: 'EDGEBI Solutions',
  SUPPORT_EMAIL: 'support@edgebi.com',
  CONTACT_EMAIL: 'contact@edgebi.com',
  VERSION: packageInfo.version
} as const;

export type AppInfo = ObjectValues<typeof AppInfo>;
