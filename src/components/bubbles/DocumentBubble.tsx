import { Component, For, Show } from 'solid-js';
import { Avatar } from '../avatars/Avatar';

interface DocumentBubbleProps {
  chunks: any[];
  showAvatar?: boolean;
  avatarSrc?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  sourceDocsTitle?: string;
}

const defaultBackgroundColor = '#f7f8ff';
const defaultTextColor = '#303235';
const defaultFontSize = 16;
const chunkNumberColor = '#3B81F6'; // Blue color for chunk numbers

export const DocumentBubble: Component<DocumentBubbleProps> = (props) => {
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .filter(line => line.trim())
      .map(para => `<p class="doc-paragraph">${para}</p>`)
      .join('');
  };

  return (
    <div class="flex flex-col gap-4 mb-4">
      <Show when={props.sourceDocsTitle}>
        <span class="px-2 py-[10px] font-semibold">{props.sourceDocsTitle}</span>
      </Show>

      <For each={props.chunks}>
        {(chunk, index) => (
          <div class="flex flex-row justify-start items-start">
            <Show when={props.showAvatar}>
              <Avatar initialAvatarSrc={props.avatarSrc} />
            </Show>
            
            <div class="flex flex-col w-full">
              {/* Chunk number header */}
              <div 
                class="px-4 mb-1 font-semibold"
                style={{ color: chunkNumberColor }}
              >
                Chunk {index() + 1}
              </div>
              
              {/* Chunk content */}
              <div 
                class="px-4 py-2 ml-2 prose document-chunk"
                style={{
                  'background-color': props.backgroundColor ?? defaultBackgroundColor,
                  color: props.textColor ?? defaultTextColor,
                  'border-radius': '6px',
                  'font-size': props.fontSize ? `${props.fontSize}px` : `${defaultFontSize}px`,
                  'max-width': '100%'
                }}
                innerHTML={formatContent(chunk.pageContent)}
              />
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

// Add styles
const styles = `
  .document-chunk {
    width: 100%;
    margin-bottom: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  .doc-paragraph {
    margin: 0.75rem 0;
    line-height: 1.6;
  }

  .document-chunk:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 