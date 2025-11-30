// Fix: Import React to resolve 'Cannot find namespace React' error
import React from 'react';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ScentNote {
  name: string;
  description: string;
  icon: React.ReactNode;
}