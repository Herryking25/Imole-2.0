import { useContext } from 'react';
import { ParentContext, type ParentContextType } from '../context/ParentContextObject';

export const useParent = (): ParentContextType => {
  const context = useContext(ParentContext);
  if (!context) {
    throw new Error('useParent must be used within a ParentProvider');
  }
  return context;
};

export default useParent;
