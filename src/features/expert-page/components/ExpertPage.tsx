import styles from '../../../assets/index.css';
import { ExpertBot, ExpertBotProps } from '@/components/ExpertBot';
import { BubbleParams } from '@/features/bubble/types';
import { createSignal, onCleanup, onMount, Show } from 'solid-js';
import { Component } from 'solid-js';

const defaultButtonColor = '#3B81F6';
const defaultIconColor = 'white';

export type ExpertPageProps = ExpertBotProps & BubbleParams;

export const ExpertPage: Component<ExpertPageProps> = (props, { element }) => {
  const [isBotDisplayed, setIsBotDisplayed] = createSignal(false);

  const launchBot = () => {
    setIsBotDisplayed(true);
    document.body.style.margin = '0';
    document.documentElement.style.padding = '0';

    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, interactive-widget=resizes-content');
    }
  };

  const botLauncherObserver = new IntersectionObserver((intersections) => {
    if (intersections.some((intersection) => intersection.isIntersecting)) launchBot();
  });

  onMount(() => {
    botLauncherObserver.observe(element);
  });

  onCleanup(() => {
    botLauncherObserver.disconnect();
    document.body.style.margin = '';
    document.documentElement.style.padding = '';

    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
  });

  return (
    <>
      <Show when={props.theme?.customCSS}>
        <style>{props.theme?.customCSS}</style>
      </Show>
      <style>{styles}</style>
      <Show when={isBotDisplayed()}>
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
          {/* <div 
            style={{ 
              flex: 1, 
              backgroundColor: '#f0f0f0',
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              overflow: 'auto',
              padding: '20px'
            }}
          >
            <div style={{ flex: 1 }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#333'
              }}>
                Left Side
              </h2>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.5',
                color: '#666'
              }}>
                This is the left side of the page.
              </p>
            </div>
          </div> */}
                    <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {/* Right half content goes here */}
            <ExpertBot
              badgeBackgroundColor={props.theme?.chatWindow?.backgroundColor}
              bubbleBackgroundColor={props.theme?.button?.backgroundColor ?? defaultButtonColor}
              bubbleTextColor={props.theme?.button?.iconColor ?? defaultIconColor}
              showTitle={props.theme?.chatWindow?.showTitle}
              showAgentMessages={props.theme?.chatWindow?.showAgentMessages}
              title={props.theme?.chatWindow?.title}
              titleAvatarSrc={props.theme?.chatWindow?.titleAvatarSrc}
              welcomeMessage={props.theme?.chatWindow?.welcomeMessage}
              errorMessage={props.theme?.chatWindow?.errorMessage}
              poweredByTextColor={props.theme?.chatWindow?.poweredByTextColor}
              textInput={props.theme?.chatWindow?.textInput}
              botMessage={props.theme?.chatWindow?.botMessage}
              userMessage={props.theme?.chatWindow?.userMessage}
              feedback={props.theme?.chatWindow?.feedback}
              fontSize={props.theme?.chatWindow?.fontSize}
              footer={props.theme?.chatWindow?.footer}
              starterPrompts={props.theme?.chatWindow?.starterPrompts}
              chatflowid={props.chatflowid}
              chatflowConfig={props.chatflowConfig}
              apiHost={props.apiHost}
              onRequest={props.onRequest}
              isFullPage={true}
              observersConfig={props.observersConfig}
              starterPromptFontSize={props.theme?.chatWindow?.starterPromptFontSize}
              clearChatOnReload={props.theme?.chatWindow?.clearChatOnReload}
              disclaimer={props.theme?.disclaimer}
              dateTimeToggle={props.theme?.chatWindow?.dateTimeToggle}
              renderHTML={props.theme?.chatWindow?.renderHTML}
            />
          </div>
          <div 
            style={{ 
              "width": "5px", 
              "height": "100vh", 
              "position": "relative",
              "background-color": "#3B81F6"
            }} 
          />
          <div style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {/* Right half content goes here */}
            <ExpertBot
              badgeBackgroundColor={props.theme?.chatWindow?.backgroundColor}
              bubbleBackgroundColor={props.theme?.button?.backgroundColor ?? defaultButtonColor}
              bubbleTextColor={props.theme?.button?.iconColor ?? defaultIconColor}
              showTitle={props.theme?.chatWindow?.showTitle}
              showAgentMessages={props.theme?.chatWindow?.showAgentMessages}
              title={props.theme?.chatWindow?.title}
              titleAvatarSrc={props.theme?.chatWindow?.titleAvatarSrc}
              welcomeMessage={props.theme?.chatWindow?.welcomeMessage}
              errorMessage={props.theme?.chatWindow?.errorMessage}
              poweredByTextColor={props.theme?.chatWindow?.poweredByTextColor}
              textInput={props.theme?.chatWindow?.textInput}
              botMessage={props.theme?.chatWindow?.botMessage}
              userMessage={props.theme?.chatWindow?.userMessage}
              feedback={props.theme?.chatWindow?.feedback}
              fontSize={props.theme?.chatWindow?.fontSize}
              footer={props.theme?.chatWindow?.footer}
              starterPrompts={props.theme?.chatWindow?.starterPrompts}
              chatflowid={props.chatflowid}
              chatflowConfig={props.chatflowConfig}
              apiHost={props.apiHost}
              onRequest={props.onRequest}
              isFullPage={true}
              observersConfig={props.observersConfig}
              starterPromptFontSize={props.theme?.chatWindow?.starterPromptFontSize}
              clearChatOnReload={props.theme?.chatWindow?.clearChatOnReload}
              disclaimer={props.theme?.disclaimer}
              dateTimeToggle={props.theme?.chatWindow?.dateTimeToggle}
              renderHTML={props.theme?.chatWindow?.renderHTML}
            />
          </div>
        </div>
      </Show>
    </>
  );
};
