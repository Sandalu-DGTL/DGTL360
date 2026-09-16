'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { teamMembers, type TeamMember } from '../../../content/local/team';
import styles from '../team.module.css';

function Portrait({ member, large = false }: { member: TeamMember; large?: boolean }) {
  return member.image ? (
    <Image src={member.image} alt={`Temporary sample portrait for ${member.name}`} fill sizes={large ? '(max-width: 900px) 90vw, 45vw' : '(max-width: 680px) 45vw, 15vw'} style={{ objectFit: 'cover' }} />
  ) : (
    <div className={styles.placeholder} aria-label={`Portrait pending for ${member.name}`} role="img">
      <strong aria-hidden="true">{member.name.split(' ').map(part => part[0]).join('')}</strong>
    </div>
  );
}

export function TeamSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const selectedButtonRef = useRef<HTMLButtonElement | null>(null);
  const member = selected === null ? null : teamMembers[selected];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEntered(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selected === null) {
      selectedButtonRef.current?.focus();
      return;
    }
    profileRef.current?.focus({ preventScroll: true });
    profileRef.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [selected]);

  return (
    <section ref={sectionRef} className={`${styles.section} ${entered ? styles.entered : ''} ${member ? styles.hasSelection : ''}`} id="team" aria-label="Meet the DGTL 360 team">
      <div className={styles.roster} aria-label="Team members">
        {teamMembers.map((person, index) => (
          <button className={`${styles.portrait} ${selected === index ? styles.selected : ''}`} key={person.name}
            style={{ animationDelay: `${index * 65}ms` }}
            onClick={(event) => {
              selectedButtonRef.current = event.currentTarget;
              setSelected(index);
            }}
            aria-pressed={selected === index} aria-controls="team-profile" aria-label={`View ${person.name}'s profile`}>
            <div className={styles.cubeScene}>
              <div className={styles.cube} style={{ animationDelay: `${Math.floor(index / 3) * 160 + (index % 3) * 65}ms` }}>
                <div className={styles.cubeFront}><Portrait member={person} /></div>
                <div className={styles.cubeSide} aria-hidden="true"><Portrait member={person} /></div>
              </div>
            </div>
            <span>{person.name}</span>
          </button>
        ))}
      </div>
      <div className={styles.profile} id="team-profile" ref={profileRef} tabIndex={-1} aria-live="polite">
        {member ? (
          <>
            <button className={styles.back} onClick={() => setSelected(null)}>← ALL PEOPLE</button>
            <div className={styles.profileImage} key={member.name}><Portrait member={member} large /></div>
            <div className={styles.profileCopy} key={`${member.name}-copy`} tabIndex={0} role="region" aria-label={`${member.name}'s biography`}>
              <p>{member.role}</p>
              <h3>{member.name}</h3>
              {member.bio && <span>{member.bio}</span>}
              {member.linkedin && <a className={styles.linkedin} href={member.linkedin} target="_blank" rel="noopener noreferrer">VIEW LINKEDIN PROFILE ↗</a>}
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
