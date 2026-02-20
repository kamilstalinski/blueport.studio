import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/styles/**/*.css"
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1.5rem',
  			md: '2rem'
  		},
  		screens: {
  			'2xl': '1280px'
  		}
  	},
  	extend: {
  		colors: {
  			bg: 'var(--color-bg)',
  			surface: 'var(--color-surface)',
  			'surface-alt': 'var(--color-surface-alt)',
  			border: 'var(--color-border)',
  			primary: {
  				DEFAULT: 'var(--color-primary)',
  				foreground: 'var(--color-on-primary)'
  			},
  			'primary-hover': 'var(--color-primary-hover)',
  			'primary-subtle': 'var(--color-primary-subtle)',
  			accent: {
  				DEFAULT: 'var(--color-accent)',
  				foreground: 'var(--color-on-primary)'
  			},
  			'accent-2': 'var(--color-accent-2)',
  			'accent-orange': {
  				DEFAULT: 'var(--color-accent-orange)',
  				hover: 'var(--color-accent-orange-hover)',
  				subtle: 'var(--color-accent-orange-subtle)',
  				foreground: '#ffffff'
  			},
  			'ring-offset': 'var(--color-ring-offset)',
  			text: {
  				primary: 'var(--color-text-primary)',
  				secondary: 'var(--color-text-secondary)'
  			},
  			background: 'var(--color-bg)',
  			foreground: 'var(--color-text-primary)',
  			'muted-foreground': 'var(--color-text-secondary)',
  			'surface-soft': 'var(--color-surface-alt)',
  			'section-gray': 'var(--color-section-gray)',
			'section-tone-primary': 'var(--section-tone-primary)',
			'section-tone-lighter': 'var(--section-tone-lighter)',
			'section-tone-deepest': 'var(--section-tone-deepest)',
  			'neutral-light': '#d9d9d9',
  			'neutral-mid': '#bfbfbf',
  			card: {
  				DEFAULT: 'var(--color-surface)',
  				foreground: 'var(--color-text-primary)'
  			},
  			popover: {
  				DEFAULT: 'var(--color-surface)',
  				foreground: 'var(--color-text-primary)'
  			},
  			secondary: {
  				DEFAULT: 'var(--color-surface-alt)',
  				foreground: 'var(--color-text-primary)'
  			},
  			muted: {
  				DEFAULT: 'var(--color-surface-alt)',
  				foreground: 'var(--color-text-secondary)'
  			},
  			destructive: {
  				DEFAULT: 'var(--color-accent)',
  				foreground: '#ffffff'
  			},
  			input: 'var(--color-border)',
  			ring: 'var(--color-primary)',
  			chart: {
  				'1': 'var(--color-primary)',
  				'2': 'var(--color-accent-2)',
  				'3': '#3b82f6',
  				'4': '#00b8d9',
  				'5': '#010A2B'
  			}
  		},
  		fontFamily: {
  			sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
  			body: ['var(--font-body)', 'system-ui', 'sans-serif'],
  			display: ['var(--font-heading)', 'var(--font-body)', 'sans-serif'],
  			heading: ['var(--font-heading)', 'var(--font-body)', 'sans-serif'],
  		},
  		fontSize: {
  			'h1': [
  				'clamp(2.25rem, 4vw, 3.5rem)',
  				{ lineHeight: '1.1', letterSpacing: '-0.5px', fontWeight: '700' }
  			],
  			'h2': [
  				'clamp(1.75rem, 3vw, 2.5rem)',
  				{ lineHeight: '1.2', letterSpacing: '-0.3px', fontWeight: '600' }
  			],
  			'h3': [
  				'clamp(1.375rem, 1.5vw, 1.625rem)',
  				{ lineHeight: '1.3', fontWeight: '600' }
  			],
  			'lead': [
  				'1.125rem',
  				{ lineHeight: '1.6', fontWeight: '400' }
  			],
  			'body': [
  				'1rem',
  				{ lineHeight: '1.6', fontWeight: '400' }
  			],
  			'small': [
  				'0.875rem',
  				{ lineHeight: '1.5', letterSpacing: '0.2px', fontWeight: '500' }
  			],
  		},
  		letterSpacing: {
  			tight: '-0.025em',
  			'tightest': '-0.04em',
  			'heading': '-0.015em',
  			headline: '-0.02em'
  		},
  		borderRadius: {
  			'button': '0.75rem',
  			'card': '1rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			'card': '0 1px 3px rgba(0, 0, 0, 0.04)',
  			'card-hover': '0 4px 12px rgba(0, 0, 0, 0.06)'
  		},
  		spacing: {
  			'section': 'var(--section-padding-y)',
  			'section-md': 'var(--section-padding-y)'
  		},
  		keyframes: {
  			'float-subtle': {
  				'0%, 100%': { transform: 'scale(1)' },
  				'50%': { transform: 'scale(1.03)' }
  			}
  		},
  		animation: {
  			'float-subtle': 'float-subtle 4s ease-in-out 2'
  		},
  		transitionDuration: {
  			'250': '250ms'
  		},
  		transitionTimingFunction: {
  			'out-back': 'cubic-bezier(.5,.85,.25,1.1)',
  			'out-back-strong': 'cubic-bezier(.5,.85,.25,1.8)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
