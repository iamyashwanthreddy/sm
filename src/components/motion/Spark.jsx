/** Four-point star centred on (x, y). Used for constellation points and focal stars. */
export default function Spark({ x, y, r = 4, className = '' }) {
  const k = r * 0.16;
  const d = `M${x} ${y - r}Q${x + k} ${y - k} ${x + r} ${y}Q${x + k} ${y + k} ${x} ${y + r}Q${x - k} ${y + k} ${x - r} ${y}Q${x - k} ${y - k} ${x} ${y - r}Z`;
  return <path className={`mo-spark ${className}`} d={d} />;
}
