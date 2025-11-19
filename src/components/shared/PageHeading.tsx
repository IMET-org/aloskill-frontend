import { CheckCircle2 } from "lucide-react";

// Reusable Hero Component
export const PageHeading = ({
  badge = "Terms and conditions",
  title = "Best selling courses in ALOSKILL",
  subtitle = "Together, we can make a real impact in communities around the world. Help us bring hope and support",
}) => {
  return (
    <section className='relative w-full min-h-[250px] flex items-center justify-center px-4 py-6  md:py-10  overflow-hidden'>
      <div className='absolute inset-0 bg-transparent opacity-80 animate-gradient-shift' />
      <div className='absolute top-10 left-10 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-pink-200 rounded-full blur-3xl opacity-40 animate-float' />
      <div className='absolute bottom-10 right-10 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 bg-purple-200 rounded-full blur-3xl opacity-40 animate-float-delayed' />
      <div className='absolute top-1/2 right-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200 rounded-full blur-2xl opacity-30 animate-pulse-slow' />
      <div className='absolute bottom-1/3 left-1/4 w-20 h-20 sm:w-28 sm:h-28 bg-pink-300 rounded-full blur-2xl opacity-30 animate-pulse-slower' />
      <div className='relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up'>
        <div className='inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 mb-6 sm:mb-8 bg-white/80 backdrop-blur-sm rounded-full shadow-sm animate-fade-in transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group'>
          <div className='w-6 h-6 sm:w-6 sm:h-6 bg-linear-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shrink-0 animate-pulse-gentle animate-rotate-gradient  mr-2'>
            <CheckCircle2
              className='w-4 h-4 sm:w-3.5 sm:h-3.5 text-white animate-check-pop'
              strokeWidth={3}
            />
          </div>
          <span className='text-sm text-gray-600 font-medium'>{badge}</span>
        </div>
        <h2 className='text-2xl  font-bold text-[#074079] mb-2  leading-tight px-2 animate-fade-in-up-delayed'>
          {title}
        </h2>
        <p className='text-sm  text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 animate-fade-in-up-more-delayed'>
          {subtitle}
        </p>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -20px) scale(1.05);
          }
        }

        @keyframes floatDelayed {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, 20px) scale(1.08);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes pulseSlower {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.15);
          }
        }

        @keyframes pulseGentle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
        }

        @keyframes rotateGradient {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }

        @keyframes checkPop {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes iconSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spinScale {
          0% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.1);
          }
          50% {
            transform: rotate(180deg) scale(1);
          }
          75% {
            transform: rotate(270deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            box-shadow:
              0 0 8px rgba(251, 146, 60, 0.4),
              0 0 16px rgba(251, 146, 60, 0.2);
            transform: scale(1);
          }
          50% {
            box-shadow:
              0 0 16px rgba(251, 146, 60, 0.6),
              0 0 24px rgba(251, 146, 60, 0.4);
            transform: scale(1.05);
          }
        }

        @keyframes bounceRotate {
          0%,
          100% {
            transform: rotate(0deg) translateY(0);
          }
          25% {
            transform: rotate(-15deg) translateY(-4px);
          }
          50% {
            transform: rotate(0deg) translateY(0);
          }
          75% {
            transform: rotate(15deg) translateY(-4px);
          }
        }

        @keyframes gradientShift {
          0% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            opacity: 0.8;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-up-delayed {
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-more-delayed {
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 10s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulseSlower 8s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulseGentle 1s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradientShift 5s ease-in-out infinite;
        }

        .animate-rotate-gradient {
          animation: rotateGradient 2s linear infinite;
        }

        .animate-check-pop {
          animation: checkPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s forwards;
          opacity: 0;
        }

        .animate-icon-spin {
          animation: iconSpin 3s linear infinite;
        }

        .animate-spin-scale {
          animation: spinScale 4s ease-in-out infinite;
        }

        .animate-glow-pulse {
          animation: glowPulse 2s ease-in-out infinite;
        }

        .animate-bounce-rotate {
          animation: bounceRotate 0.6s ease-in-out;
        }
      `}</style>
    </section>
  );
};
