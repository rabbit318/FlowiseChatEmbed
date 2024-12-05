import type { BubbleProps } from './features/bubble';

// PING: CORRESPONDES TO THE ARGUMENTS/PROPERTIES IN CHATBOT.INIT IN THE PUBLIC/INDEX.HTML
export const defaultBotProps: BubbleProps = {
  chatflowid: '',
  apiHost: undefined,
  onRequest: undefined,
  chatflowConfig: undefined,
  theme: undefined,
  observersConfig: undefined,
};
