'use client';

import { useState, useEffect } from 'react';
import { COLORS, FONTS, TRANSITIONS } from '../constants/design';
import { useTranslation } from '@/i18n';

interface NavigationProps {
  links?: Array<{ label: string; href: string }>;
  className?: string;
}

export default function Navigation({
  links,
  className = '',
}: NavigationProps) {
  const { t } = useTranslation();
  const navLinks = links ?? [
    { label: t.navigation.event, href: '#event' },
    { label: t.navigation.gallery, href: '#gallery' },
    { label: t.navigation.rsvp, href: '#rsvp' },
    { label: t.navigation.guestBook, href: '#guestbook' },
  ];
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={className}
      style={{
        position: isSticky ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: isSticky ? '0' : '2rem',
        backgroundColor: isSticky ? `${COLORS.bgCream}EB` : 'transparent',
        backdropFilter: isSticky ? 'blur(16px)' : 'none',
        boxShadow: isSticky ? '0 1px 12px rgba(0,0,0,0.04)' : 'none',
        transition: `background-color ${TRANSITIONS.normal} ease, box-shadow ${TRANSITIONS.normal} ease, padding ${TRANSITIONS.normal} ease`,
        padding: isSticky ? '0.75rem 0' : '2rem 0 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          fontFamily: FONTS.serif,
          fontWeight: 500,
          fontSize: '0.95rem',
          letterSpacing: '0.08em',
          color: COLORS.textPrimary,
        }}
      >
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            style={{
              color: COLORS.textPrimary,
              textDecoration: 'none',
              transition: `color ${TRANSITIONS.normal} ease, border-color ${TRANSITIONS.normal} ease`,
              cursor: 'pointer',
              borderBottom: '1px solid transparent',
              paddingBottom: '4px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = COLORS.accent;
              e.currentTarget.style.borderBottomColor = COLORS.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = COLORS.textPrimary;
              e.currentTarget.style.borderBottomColor = 'transparent';
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
