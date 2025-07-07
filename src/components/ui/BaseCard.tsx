import { designTokens, componentTokens, createStyleFromTokens } from '@/lib/design-tokens';

type BaseCardProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'character' | 'item' | 'details';
  // Accessibility props
  role?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  'aria-label'?: string;
};

export default function BaseCard({
  children,
  onClick,
  className = '',
  variant = 'character',
  role,
  tabIndex,
  onKeyDown,
  'aria-label': ariaLabel,
}: BaseCardProps) {
  const isClickable = !!onClick;

  const getVariantStyles = () => {
    const baseCardStyle = createStyleFromTokens(componentTokens.card.base);
    const finalBaseStyle = {
      ...baseCardStyle,
      ...(isClickable && { cursor: 'pointer' }),
    };

    switch (variant) {
      case 'character':
        return {
          ...finalBaseStyle,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          padding: 0,
          overflow: 'hidden',
          transition: designTokens.transitions.hover,
        };
      case 'item':
        return {
          ...finalBaseStyle,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          position: 'relative' as const,
          overflow: 'hidden',
          padding: 0,
        };
      case 'details':
        return {
          ...finalBaseStyle,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          height: '100%',
          overflow: 'hidden',
        };
      default:
        return finalBaseStyle;
    }
  };

  const cardStyle = getVariantStyles();

  const cardProps = isClickable
    ? {
        onClick,
        onKeyDown,
        role,
        tabIndex,
        'aria-label': ariaLabel,
        style: cardStyle,
      }
    : {
        style: cardStyle,
      };
  return (
    <div className={`[&_img]:select-none ${className}`} {...cardProps}>
      {children}
    </div>
  );
}
