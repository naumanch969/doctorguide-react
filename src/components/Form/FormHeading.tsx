export default function FormHeading({
  className,
  children,
}: {
  className?: string;
  children: any;
}) {
  return (
    <div className={`self-start font-semibold text-sm mb-3  ${className}`}>
      {children}
    </div>
  );
}
