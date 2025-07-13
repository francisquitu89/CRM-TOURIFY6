import React, { useState, useEffect } from 'react';
import { X, Star, Trophy, Target, Zap } from 'lucide-react';

interface MotivationalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'motivation' | 'achievement';
}

export const MotivationalPopup: React.FC<MotivationalPopupProps> = ({
  isOpen,
  onClose,
  message,
  type
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 'achievement':
        return <Star className="w-8 h-8 text-purple-500" />;
      case 'motivation':
        return <Zap className="w-8 h-8 text-blue-500" />;
      default:
        return <Target className="w-8 h-8 text-green-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'from-yellow-400 to-orange-500';
      case 'achievement':
        return 'from-purple-400 to-pink-500';
      case 'motivation':
        return 'from-blue-400 to-indigo-500';
      default:
        return 'from-green-400 to-teal-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-gradient-to-r ${getBackgroundColor()} rounded-2xl shadow-2xl p-8 max-w-md w-full text-white transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <h3 className="text-xl font-bold">
              {type === 'success' && '¡Excelente Trabajo!'}
              {type === 'achievement' && '¡Logro Desbloqueado!'}
              {type === 'motivation' && '¡Sigue Así!'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg leading-relaxed">{message}</p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleClose}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ¡Genial!
          </button>
        </div>
      </div>
    </div>
  );
};

// Hook para mostrar popups motivacionales automáticamente
export const useMotivationalPopups = () => {
  const [popup, setPopup] = useState<{
    isOpen: boolean;
    message: string;
    type: 'success' | 'motivation' | 'achievement';
  }>({
    isOpen: false,
    message: '',
    type: 'motivation'
  });

  const showPopup = (message: string, type: 'success' | 'motivation' | 'achievement' = 'motivation') => {
    setPopup({ isOpen: true, message, type });
  };

  const closePopup = () => {
    setPopup(prev => ({ ...prev, isOpen: false }));
  };

  // Mostrar popup motivacional aleatorio cada 10 minutos
  useEffect(() => {
    const motivationalMessages = [
      "¡Cada prospecto es una oportunidad de oro! 🌟",
      "¡Tu persistencia está construyendo el futuro! 💪",
      "¡La realidad virtual está en tus manos! 🚀",
      "¡Cada llamada te acerca más a la meta! 📞",
      "¡Tu energía positiva es contagiosa! ⚡",
      "¡Los grandes resultados vienen de pequeñas acciones! 🎯",
      "¡Hoy es el día perfecto para brillar! ✨"
    ];

    const interval = setInterval(() => {
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      showPopup(randomMessage, 'motivation');
    }, 600000); // 10 minutos

    return () => clearInterval(interval);
  }, []);

  return { popup, showPopup, closePopup };
};