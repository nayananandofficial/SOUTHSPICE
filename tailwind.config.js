/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F5',
          100: '#FED7D7',
          500: '#FF4B2B',
          600: '#E53E3E',
          700: '#C53030',
        },
        secondary: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#28A745',
          600: '#16A34A',
          700: '#15803D',
        },
        accent: {
          50: '#FEFCE8',
          100: '#FEF3C7',
          500: '#FFD700',
          600: '#D69E2E',
          700: '#B7791F',
        },
        warm: {
          50: '#FFFAF0',
          100: '#FEF5E7',
          900: '#1A202C',
        }
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'accent': ['Playfair Display', 'serif'],
        // Custom logo fonts
        'logo': ['Poppins', 'sans-serif'],
        'tagline': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-gentle': 'pulseGentle 2s infinite',
        'pulse-mic': 'pulseMic 1.5s ease-in-out infinite',
        'recording-pulse': 'recordingPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        pulseMic: {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)'
          },
        },
        recordingPulse: {
          '0%, 100%': { 
            backgroundColor: 'rgb(239, 68, 68)',
            transform: 'scale(1)'
          },
          '50%': { 
            backgroundColor: 'rgb(220, 38, 38)',
            transform: 'scale(1.1)'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      letterSpacing: {
        'widest': '0.2em',
      },
    },
  },
  plugins: [],
};