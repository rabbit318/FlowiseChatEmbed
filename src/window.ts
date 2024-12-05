import { observersConfigType } from './components/Bot';
import { BubbleTheme } from './features/bubble/types';

/* eslint-disable solid/reactivity */
type BotProps = {
  chatflowid: string;
  apiHost?: string;
  onRequest?: (request: RequestInit) => Promise<void>;
  chatflowConfig?: Record<string, unknown>;
  observersConfig?: observersConfigType;
  theme?: BubbleTheme;
};

let elementUsed: Element | undefined;

// PING: WINDOW LEVEL; IMPORTANT!
export const initFull = (props: BotProps & { id?: string }) => {
  destroy();
  // PING: THIS IS WHERE THE FULL COMPONENT IS INSTANTIATED
  const fullElement = props.id ? document.getElementById(props.id) : document.querySelector('flowise-fullchatbot');
  if (!fullElement) throw new Error('<flowise-fullchatbot> element not found.');
  Object.assign(fullElement, props);
  elementUsed = fullElement;
};

export const initExpertPage = (props: BotProps & { id?: string }) => {
  destroy();
  // PING: THIS IS WHERE THE FULL COMPONENT IS INSTANTIATED
  const expertPageElement = props.id ? document.getElementById(props.id) : document.querySelector('flowise-expertpage');
  if (!expertPageElement) throw new Error('<flowise-expertpage> element not found.');
  Object.assign(expertPageElement, props);
  elementUsed = expertPageElement;
};

export const init = (props: BotProps) => {
  destroy();
  const element = document.createElement('flowise-chatbot');
  Object.assign(element, props);
  document.body.appendChild(element);
  elementUsed = element;
};

export const destroy = () => {
  elementUsed?.remove();
};

type Chatbot = {
  initFull: typeof initFull;
  init: typeof init;
  destroy: typeof destroy;
};

declare const window:
  | {
      Chatbot: Chatbot | undefined;
    }
  | undefined;

export const parseChatbot = () => ({
  initExpertPage,
  initFull,
  init,
  destroy,
});

export const injectChatbotInWindow = (bot: Chatbot) => {
  if (typeof window === 'undefined') return;
  window.Chatbot = { ...bot };
};
