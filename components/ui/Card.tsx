"use client";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
