'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { teamMembers, type TeamMember } from '../../../content/local/team';
import styles from '../team.module.css';

function Portrait({ member, large = false, active = false }: { member: TeamMember; large?: boolean; active?: boolean }) {
  return member.image ? (
    <Image
      src={active ? member.selectedImage ?? member.image : member.image}
      alt={member.image.includes('/placeholders/') ? `Temporary sample portrait for ${member.name}` : `Portrait of ${member.name}`}
      fill
      sizes={large ? '(max-width: 900px) 90vw, 50vw' : '(max-width: 600px) 30vw, (max-width: 900px) 30vw, 15vw'}
      style={{ objectFit: 'cover' }}
    />
  ) : (
    <div className={styles.placeholder} aria-label={`Portrait pending for ${member.name}`} role="img">
      <strong aria-hidden="true">{member.name.split(' ').map(part => part[0]).join('')}</strong>
    </div>
  );
}

export function TeamSection() {
  const [selected, setSelected] = useState<number | null>(0);
  const hasInteracted = useRef(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const selectedButtonRef = useRef<HTMLButtonElement | null>(null);
  const member = selected === null ? null : teamMembers[selected];

  useEffect(() => {
    if (!hasInteracted.current) return;
    if (selected === null) {
      selectedButtonRef.current?.focus();
      return;
    }
    profileRef.current?.focus({ preventScroll: true });
    if (window.matchMedia('(max-width: 900px)').matches) {
      profileRef.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  }, [selected]);

  return (
    <section className={`${styles.section} ${member ? styles.hasSelection : ''}`} id="team" aria-label="Meet the DGTL 360 team">
      <div className={styles.roster} aria-label="Team members">
        {teamMembers.map((person, index) => (
          <button className={`${styles.portrait} ${selected === index ? styles.selected : ''}`} key={person.name}
            onClick={(event) => {
              hasInteracted.current = true;
              selectedButtonRef.current = event.currentTarget;
              setSelected(index);
            }}
            aria-pressed={selected === index} aria-controls="team-profile" aria-label={`View ${person.name}'s profile`}>
            <Portrait member={person} active={selected === index} />
          </button>
        ))}
      </div>
      <div className={styles.profile} id="team-profile" ref={profileRef} tabIndex={-1} aria-live="polite">
        {member ? (
          <>
            <button className={styles.back} onClick={() => { hasInteracted.current = true; setSelected(null); }}>← ALL PEOPLE</button>
            <div className={styles.profileImage} key={member.name}><Portrait member={member} large active /></div>
            <div className={styles.profileCopy} key={`${member.name}-copy`} tabIndex={0} role="region" aria-label={`${member.name}'s biography`}>
              <p className={styles.role}>{member.role}</p>
              <h3>{member.name}</h3>
              {member.bio && <p className={styles.bio}>{member.bio}</p>}
            </div>
          </>
        ) : (
          <div className={styles.intro}>
            <p>DGTL 360 / THE CREW</p>
            <h2>The people<br />making it<br />happen</h2>
            <span>Select a team member to learn more.</span>
          </div>
        )}
      </div>
    </section>
  );
}
