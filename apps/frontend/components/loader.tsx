import * as React from 'react';
import { Loader } from 'lucide-react';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'primary';
}

const LoaderComponent = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = 'default', variant = 'default', ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      default: 'w-6 h-6',
      lg: 'w-8 h-8',
    };

    const variantClasses = {
      default: 'text-muted-foreground animate-spin',
      primary: 'text-primary animate-spin',
    };

    const combinedClasses = `flex items-center justify-center ${className || ''}`;
    const iconClasses = `${sizeClasses[size]} ${variantClasses[variant]}`;

    return (
      <div className={combinedClasses} ref={ref} {...props}>
        <Loader className={iconClasses} />
      </div>
    );
  }
);
LoaderComponent.displayName = 'Loader';

export { LoaderComponent as Loader };
