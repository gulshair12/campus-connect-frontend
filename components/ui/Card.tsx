export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
