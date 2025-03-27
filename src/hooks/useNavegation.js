// src/hooks/useNavigation.js
import { useNavigate } from 'react-router-dom';

/**
 * Hook para navegação genérica.
 * @param {string} path - Caminho para onde deve ir (ex: '/home', '/feed').
 */
export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path); // Navega para o caminho fornecido
  };

  return { navigateTo };
};
