'use client';

import { useState } from 'react';
import styles from '../team.module.css';

const members = [
  ['01', 'Strategy & Planning', 'Creates the positioning, priorities and decision path that align the crew before execution begins.'],
  ['02', 'Creative Direction', 'Turns the useful problem into a distinctive idea and keeps every expression connected to it.'],
  ['03', 'Production', 'Brings sound, image, motion and the operational details together from first take to delivery.'],
  ['04', 'Brand Systems', 'Builds identities that remain coherent across people, platforms, campaigns and everyday use.'],
  ['05', 'Product Design', 'Makes complex digital journeys feel clear, useful and resilient for the people using them.'],
  ['06', 'Engineering', 'Builds maintainable platforms and integrations that survive real traffic and real operations.'],
  ['07', 'Growth', 'Connects creative work to measurable audience behaviour and keeps improving the learning loop.'],
  ['08', 'Experience', 'Shapes the room, run sheet and production details around what people should feel and remember.'],
  ['09', 'Operations', 'Keeps ownership, timing and delivery visible across a brief with several moving parts.'],
  ['10', 'Agentic Systems', 'Introduces practical automation with visible controls, auditability and humans still accountable.'],
];

const positions = ['8% 30%', '28% 28%', '51% 27%', '75% 27%', '12% 65%', '35% 63%', '58% 62%', '82% 60%', '25% 90%', '55% 88%'];

export function TeamSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const member = selected === null ? null : members[selected];

  return (
    <section className={styles.section} id="team" aria-labelledby="team-title">
      <div className={styles.roster} aria-label="DGTL 360 team disciplines">
        {members.map(([number, role], index) => (
          <button
            className={`${styles.portrait} ${selected === index ? styles.selected : ''}`}
            key={number}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
            aria-label={`Open profile ${number}: ${role}`}
          >
            {/* Native image avoids a Vinext client-bundle React duplication issue. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/reference/team-collective.png"
              alt=""
              loading={index < 4 ? 'eager' : 'lazy'}
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: positions[index],
              }}
            />
            <span>{number}</span>
          </button>
        ))}
      </div>

      <div className={styles.profile} aria-live="polite">
        {member ? (
          <>
            <button className={styles.back} onClick={() => setSelected(null)}>← ALL PEOPLE</button>
            <div className={styles.profileImage}>
              {/* Native image avoids a Vinext client-bundle React duplication issue. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/reference/team-profile.png"
                alt="DGTL 360 team member editorial profile study"
                decoding="async"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: positions[selected ?? 0],
                }}
              />
            </div>
            <div className={styles.profileCopy}>
              <p>PROFILE {member[0]}</p>
              <h3>{member[1]}</h3>
              <span>{member[2]}</span>
            </div>
          </>
        ) : (
          <div className={styles.intro}>
            <p>DGTL 360 / THE CREW</p>
            <h2 id="team-title">The people<br />making it<br />happen</h2>
            <span>Select any portrait to open their story.</span>
          </div>
        )}
      </div>
    </section>
  );
}
