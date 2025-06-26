import React from 'react';
import Image from 'next/image';
import { componentTokens, createStyleFromTokens } from '@/lib/design-tokens';

export interface FactionButtonProps {
  emoji?: string;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  description: string;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

export function FactionButton({
  emoji,
  imageSrc,
  imageAlt,
  title,
  description,
  onClick,
  ariaLabel,
  className = '',
}: FactionButtonProps) {
  const baseStyle = createStyleFromTokens(componentTokens.factionButton.base);
  const contentStyle = createStyleFromTokens(componentTokens.factionButton.content);
  const emojiStyle = createStyleFromTokens(componentTokens.factionButton.emoji);
  const titleStyle = createStyleFromTokens(componentTokens.factionButton.title);
  const descriptionStyle = createStyleFromTokens(componentTokens.factionButton.description);

  return (
    <button
      type='button'
      onClick={onClick}
      aria-label={ariaLabel}
      className={`faction-button ${className} sm:px-6 sm:py-4 px-4 py-3`}
      style={{ ...baseStyle, padding: undefined }}
    >
      <div style={contentStyle}>
        {imageSrc ? (
          <div style={emojiStyle}>
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              width={0}
              height={0}
              style={{ height: '40px', width: 'auto' }}
              className='object-contain flex-shrink-0'
            />
          </div>
        ) : (
          <span style={emojiStyle}>{emoji}</span>
        )}
        <span style={titleStyle}>{title}</span>
      </div>
      <div style={descriptionStyle}>{description}</div>
    </button>
  );
}

export default React.memo(FactionButton);
