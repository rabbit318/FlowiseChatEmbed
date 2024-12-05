import { customElement } from 'solid-element';
import { defaultBotProps } from './constants';
import { Bubble } from './features/bubble';
import { Full } from './features/full';
import { ExpertPage } from './features/expert-page';
// PING: THIS IS WHERE THE "FULL" and "BUBBLE" WEB COMPONENTS ARE REGISTERED
export const registerWebComponents = () => {
  if (typeof window === 'undefined') return;
  // @ts-expect-error element incorect type
  customElement('flowise-fullchatbot', defaultBotProps, Full);
  customElement('flowise-chatbot', defaultBotProps, Bubble);
  customElement('flowise-expertpage', defaultBotProps, ExpertPage);
};

// customElement usage in Flowise:
// customElement(
//   'flowise-chatbot',      // Custom element name
//   defaultBotProps,        // Props definition
//   Bubble                  // SolidJS component
// )