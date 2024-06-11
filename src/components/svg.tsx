type Props = {
  icon: React.ReactNode;
  fill?: string;
  viewBox?: string;
  width?: number;
  height?: number;
  className?: string;
};
export default function Svg({
  icon,
  fill,
  viewBox,
  width,
  height,
  className,
}: Props) {
  return (
    <svg
      className={className}
      viewBox={viewBox || "0 0 24 24"}
      width={width || 100}
      height={height || 100}
      fill={fill || "#000"}
    >
      {icon}
    </svg>
  );
}
