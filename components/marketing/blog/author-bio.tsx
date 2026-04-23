import Image from 'next/image';
import { Linkedin } from 'lucide-react';

import { cn, getInitials } from '@/lib/utils';

type AuthorBioProps = {
  name: string;
  avatar: string;
  role?: string;
  bio?: string;
  linkedin?: string;
};

export function AuthorBio({
  name,
  avatar,
  role,
  bio,
  linkedin
}: AuthorBioProps): React.JSX.Element {
  const initials = getInitials(name);

  return (
    <section className="border-t border-slate-200 py-8">
      <div className="flex items-start gap-4">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className={cn(
              'flex size-16 shrink-0 items-center justify-center rounded-full',
              'bg-slate-200 text-lg font-semibold text-slate-600'
            )}
          >
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on LinkedIn`}
                className="text-slate-400 transition-colors hover:text-cyan-600"
              >
                <Linkedin className="size-4" />
              </a>
            )}
          </div>
          {role && <p className="text-sm text-slate-500">{role}</p>}
          {bio && (
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {bio}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
