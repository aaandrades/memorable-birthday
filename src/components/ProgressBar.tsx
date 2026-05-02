interface Props {
  current: number; // 0-based index
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const pct = total > 0 ? ((current + 1) / total) * 100 : 0;
  return (
    <div
      style={{
        width: '100%',
        height: '6px',
        background: 'var(--rose-light)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: 'var(--rose-mid)',
          transition: 'width 0.5s ease',
          borderRadius: '3px',
        }}
      />
    </div>
  );
}
