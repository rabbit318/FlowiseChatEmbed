import { FileUpload, IAction } from '@/components/Bot';
import { sendRequest } from '@/utils/index';

// PING: this is an important file that guides you how to communicate with the Flowise API when developing your own use cases
export type IncomingInput = {
  question: string;
  uploads?: FileUpload[];
  overrideConfig?: Record<string, unknown>;
  socketIOClientId?: string;
  chatId?: string;
  fileName?: string; // Only for assistant
  leadEmail?: string;
  action?: IAction;
};

type BaseRequest = {
  apiHost?: string;
  onRequest?: (request: RequestInit) => Promise<void>;
};

export type MessageRequest = BaseRequest & {
  chatflowid?: string;
  body?: IncomingInput;
};

// PING: SEE THE DOCUMENTATION FOR THE FEEDBACK API
// THE CORRESPONDANCE BETWEEN THE FEEDBACK CURL COMMAND AND THE TYPE DEFINITIONS ARE:
// API HOST IS OFFERED IN THE BASEREQUEST
// SOME SYSTEM ASSGINED BODY PARAMS ARE NOT MANDATORY (PING'S GUESSING): ID AND CREATED DATE
// CHATFLOWID IS OFFERED IN THE CREATEFEEDBACKREQUEST SEPARATELY FROM THE BODY EVEN THOUGH IT IS PART THE BODY ACCORDING TO THE DOCUMENTATION
// THE REST OF THE BODY PARAMS ARE IN THE FEEDBACKINPUT TYPE DEFINITION: CHATID, MESSAGEID, RATING, CONTENT
export type FeedbackRatingType = 'THUMBS_UP' | 'THUMBS_DOWN';

export type FeedbackInput = {
  chatId: string;
  messageId: string;
  rating: FeedbackRatingType;
  content?: string;
};

export type CreateFeedbackRequest = BaseRequest & {
  chatflowid?: string;
  body?: FeedbackInput;
};

export type UpdateFeedbackRequest = BaseRequest & {
  id: string;
  body?: Partial<FeedbackInput>;
};

export type UpsertRequest = BaseRequest & {
  chatflowid: string;
  apiHost?: string;
  formData: FormData;
};

export type LeadCaptureInput = {
  chatflowid: string;
  chatId: string;
  name?: string;
  email?: string;
  phone?: string;
};

export type LeadCaptureRequest = BaseRequest & {
  body: Partial<LeadCaptureInput>;
};

export const sendFeedbackQuery = ({ chatflowid, apiHost = 'http://localhost:3000', body, onRequest }: CreateFeedbackRequest) =>
  sendRequest({
    method: 'POST',
    url: `${apiHost}/api/v1/feedback/${chatflowid}`,
    body,
    onRequest: onRequest,
  });

export const updateFeedbackQuery = ({ id, apiHost = 'http://localhost:3000', body, onRequest }: UpdateFeedbackRequest) =>
  sendRequest({
    method: 'PUT',
    url: `${apiHost}/api/v1/feedback/${id}`,
    body,
    onRequest: onRequest,
  });

// PING: this is the main query that sends messages to the Flowise API?
// PING: I still think this is the most relevant one.
export const sendMessageQuery = ({ chatflowid, apiHost = 'http://localhost:3000', body, onRequest }: MessageRequest) =>
  sendRequest<any>({
    method: 'POST',
    url: `${apiHost}/api/v1/prediction/${chatflowid}`,
    body,
    onRequest: onRequest,
  });

export const createAttachmentWithFormData = ({ chatflowid, apiHost = 'http://localhost:3000', formData, onRequest }: UpsertRequest) =>
  sendRequest({
    method: 'POST',
    url: `${apiHost}/api/v1/attachments/${chatflowid}/${formData.get('chatId')}`,
    formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onRequest: onRequest,
  });

export const upsertVectorStoreWithFormData = ({ chatflowid, apiHost = 'http://localhost:3000', formData, onRequest }: UpsertRequest) =>
  sendRequest({
    method: 'POST',
    url: `${apiHost}/api/v1/vector/upsert/${chatflowid}`,
    formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onRequest: onRequest,
  });

export const getChatbotConfig = ({ chatflowid, apiHost = 'http://localhost:3000', onRequest }: MessageRequest) =>
  sendRequest<any>({
    method: 'GET',
    url: `${apiHost}/api/v1/public-chatbotConfig/${chatflowid}`,
    onRequest: onRequest,
  });

export const isStreamAvailableQuery = ({ chatflowid, apiHost = 'http://localhost:3000', onRequest }: MessageRequest) =>
  sendRequest<any>({
    method: 'GET',
    url: `${apiHost}/api/v1/chatflows-streaming/${chatflowid}`,
    onRequest: onRequest,
  });

export const sendFileDownloadQuery = ({ apiHost = 'http://localhost:3000', body, onRequest }: MessageRequest) =>
  sendRequest<any>({
    method: 'POST',
    url: `${apiHost}/api/v1/openai-assistants-file/download`,
    body,
    type: 'blob',
    onRequest: onRequest,
  });

export const addLeadQuery = ({ apiHost = 'http://localhost:3000', body, onRequest }: LeadCaptureRequest) =>
  sendRequest<any>({
    method: 'POST',
    url: `${apiHost}/api/v1/leads/`,
    body,
    onRequest: onRequest,
  });

// PING: TODO: add apis you want to call here and their corresponding type definitions
// Let's look at how CreateFeedbackRequest type maps to the function parameters:
/*
// First, BaseRequest type (parent type)
type BaseRequest = {
  apiHost?: string;          // Maps to apiHost parameter
  onRequest?: (request: RequestInit) => Promise<void>;  // Maps to onRequest parameter
};

// FeedbackInput type (used in body)
export type FeedbackInput = {
  chatId: string;
  messageId: string;
  rating: FeedbackRatingType;
  content?: string;
};

// CreateFeedbackRequest type (combines BaseRequest with feedback-specific fields)
export type CreateFeedbackRequest = BaseRequest & {
  chatflowid?: string;      // Maps to chatflowid parameter
  body?: FeedbackInput;     // Maps to body parameter
};

// The function parameters match CreateFeedbackRequest type
export const sendFeedbackQuery = ({ 
  chatflowid,    // from CreateFeedbackRequest
  apiHost,       // from BaseRequest
  body,          // from CreateFeedbackRequest (type FeedbackInput)
  onRequest      // from BaseRequest
}: CreateFeedbackRequest) => // ...

*/

// The TypeScript type system uses property matching to find information from CreateFeedbackRequest. Here's how it works:
/*
// When you define CreateFeedbackRequest
export type CreateFeedbackRequest = BaseRequest & {
  chatflowid?: string;
  body?: FeedbackInput;
};

// When you destructure in the function parameters
export const sendFeedbackQuery = ({ 
  chatflowid,    // TypeScript looks for 'chatflowid' property in CreateFeedbackRequest
  apiHost,       // TypeScript looks for 'apiHost' property in BaseRequest (inherited)
  body,          // TypeScript looks for 'body' property in CreateFeedbackRequest
  onRequest      // TypeScript looks for 'onRequest' property in BaseRequest (inherited)
}: CreateFeedbackRequest) => // ...
*/

/*

The destructuring { } syntax tells TypeScript to:
Look at the type CreateFeedbackRequest
Match each destructured parameter name with a property in the type
Ensure the types match
For example:

// When you call the function
sendFeedbackQuery({
  chatflowid: "abc123",     // Must match chatflowid?: string
  apiHost: "http://...",    // Must match apiHost?: string
  body: {                   // Must match body?: FeedbackInput
    chatId: "chat123",
    messageId: "msg456",
    rating: "THUMBS_UP"
  },
  onRequest: async (req) => {} // Must match onRequest?: (request: RequestInit) => Promise<void>
});

The curly braces { } in the parameter list perform object destructuring, extracting values from the passed object based on matching property names defined in CreateFeedbackRequest.

*/

// 2. Input Types - Define the status enum
export type DocumentStoreStatus = 
  | 'EMPTY' 
  | 'SYNC' 
  | 'SYNCING' 
  | 'STALE' 
  | 'NEW' 
  | 'UPSERTING' 
  | 'UPSERTED';

// Define the response type
export type DocumentStore = {
  id: string;
  name: string;
  description: string;
  loaders: string;
  whereUsed: string;
  status: DocumentStoreStatus;
  vectorStoreConfig: string;
  embeddingConfig: string;
  recordManagerConfig: string;
  createdDate: string;
  updatedDate: string;
};

// 3. Request Types
export type GetDocumentStoreRequest = BaseRequest & {
  id: string;  // Document store ID
};

// 4. Function
export const getDocumentStoreQuery = ({ 
  id, 
  apiHost = 'http://localhost:3000', 
  onRequest 
}: GetDocumentStoreRequest) =>
  sendRequest<DocumentStore>({
    method: 'GET',
    url: `${apiHost}/api/v1/document-store/store/${id}`,
    onRequest: onRequest,
  });