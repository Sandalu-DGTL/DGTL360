'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { teamMembers, type TeamMember } from '../../../content/local/team';
import styles from '../team.module.css';

function Portrait({ member, large = false }: { member: TeamMember; large?: boolean }) {
  return member.image ? (
    <Image src={member.image} alt={`Temporary sample portrait for ${member.name}`} fill sizes={large ? '(max-width: 900px) 90vw, 45vw' : '(max-width: 680px) 28vw, 15vw'} style={{ objectFit: 'cover' }} />
  ) : (
    <div className={styles.placeholder} aria-label={`Portrait pending for ${member.name}`} role="img">
      <strong aria-hidden="true">{member.name.split(' ').map(part => part[0]).join('')}</strong>
    </div>
  );
}

export function TeamSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const member = selected === null ? null : teamMembers[selected];

  return (
    <section className={`${styles.section} ${member ? styles.hasSelection : ''}`} id="team" aria-label="Meet the DGTL 360 team">
      <div className={styles.roster} aria-label="Team members">
        {teamMembers.map((person, index) => (
          <button className={`${styles.portrait} ${selected === index ? styles.selected : ''}`} key={person.name}
            onClick={() => { setSelected(index); profileRef.current?.focus({ preventScroll: true }); }}
            aria-pressed={selected === index} aria-controls="team-profile" aria-label={`View ${person.name}'s profile`}>
            <Portrait member={person} />
            <span>{person.name}</span>
          </button>
        ))}
      </div>
      <div className={styles.profile} id="team-profile" ref={profileRef} tabIndex={-1} aria-live="polite">
        {member ? (
          <>
            <button className={styles.back} onClick={() => setSelected(null)}>← ALL PEOPLE</button>
            <div className={styles.profileImage} key={member.name}><Portrait member={member} large /></div>
            <div className={styles.profileCopy}>
              <p>{member.role}</p>
              <h3>{member.name}</h3>
              {member.bio && <span>{member.bio}</span>}
              <a className={styles.linkedin} href={member.linkedin} target="_blank" rel="noopener noreferrer">VIEW LINKEDIN PROFILE ↗</a>
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
