import styles from '../identity.module.css';

const columns = Array.from({ length: 40 }, (_, index) => ({
  id: index,
  text: ['අකගතනමයරල', 'தமிழ்மொழி', 'AGENTIC360', 'अआइकगचत', 'ابتثجحخ', 'ΑΒΓΔΘΛΣΩ', '01{}[]<>'][index % 7],
  delay: `${(index % 11) * -0.47}s`,
  duration: `${7 + (index % 9) * 0.7}s`,
}));

export function DgtlFieldSection() {
  return (
    <section className={styles.section} id="dgtl-field" aria-label="DGTL 360 identity">
      <div className={styles.rain} aria-hidden="true">
        {columns.map((column) => (
          <span
            key={column.id}
            style={{
              left: `${(column.id / columns.length) * 100}%`,
              animationDelay: column.delay,
              animationDuration: column.duration,
            }}
          >
            {`${column.text}\n${column.text}\n${column.text}`}
          </span>
        ))}
      </div>
      <p className={styles.wordmark}>DGTL</p>
    </section>
  );
}
