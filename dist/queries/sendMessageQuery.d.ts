import { FileUpload, IAction } from '@/components/Bot';
export type IncomingInput = {
    question: string;
    uploads?: FileUpload[];
    overrideConfig?: Record<string, unknown>;
    socketIOClientId?: string;
    chatId?: string;
    fileName?: string;
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
export declare const sendFeedbackQuery: ({ chatflowid, apiHost, body, onRequest }: CreateFeedbackRequest) => Promise<{
    data?: unknown;
    error?: Error | undefined;
}>;
export declare const updateFeedbackQuery: ({ id, apiHost, body, onRequest }: UpdateFeedbackRequest) => Promise<{
    data?: unknown;
    error?: Error | undefined;
}>;
export declare const sendMessageQuery: ({ chatflowid, apiHost, body, onRequest }: MessageRequest) => Promise<{
    data?: any;
    error?: Error | undefined;
}>;
export declare const createAttachmentWithFormData: ({ chatflowid, apiHost, formData, onRequest }: UpsertRequest) => Promise<{
    data?: unknown;
    error?: Error | undefined;
}>;
export declare const upsertVectorStoreWithFormData: ({ chatflowid, apiHost, formData, onRequest }: UpsertRequest) => Promise<{
    data?: unknown;
    error?: Error | undefined;
}>;
export declare const getChatbotConfig: ({ chatflowid, apiHost, onRequest }: MessageRequest) => Promise<{
    data?: any;
    error?: Error | undefined;
}>;
export declare const isStreamAvailableQuery: ({ chatflowid, apiHost, onRequest }: MessageRequest) => Promise<{
    data?: any;
    error?: Error | undefined;
}>;
export declare const sendFileDownloadQuery: ({ apiHost, body, onRequest }: MessageRequest) => Promise<{
    data?: any;
    error?: Error | undefined;
}>;
export declare const addLeadQuery: ({ apiHost, body, onRequest }: LeadCaptureRequest) => Promise<{
    data?: any;
    error?: Error | undefined;
}>;
export type DocumentStoreStatus = 'EMPTY' | 'SYNC' | 'SYNCING' | 'STALE' | 'NEW' | 'UPSERTING' | 'UPSERTED';
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
export type GetDocumentStoreRequest = BaseRequest & {
    id: string;
};
export declare const getDocumentStoreQuery: ({ id, apiHost, onRequest }: GetDocumentStoreRequest) => Promise<{
    data?: DocumentStore | undefined;
    error?: Error | undefined;
}>;
export type DocumentStoreFileChunk = {
    id: string;
    docId: string;
    storeId: string;
    chunkNo: number;
    pageContent: string;
    metadata: string;
};
export type DocumentFile = {
    id: string;
    name: string;
    mimePrefix: string;
    size: number;
    status: 'EMPTY' | string;
    uploaded: string;
};
export type DocumentStoreLoaderForPreview = {
    id: string;
    loaderId: string;
    loaderName: string;
    splitterId: string;
    splitterName: string;
    totalChunks: number;
    totalChars: number;
    status: 'EMPTY' | string;
    storeId: string;
    files: DocumentFile[];
    source: string;
    credential: string;
    rehydrated: boolean;
    preview: boolean;
    previewChunkCount: number;
};
export type GetDocumentChunksResponse = {
    chunks: DocumentStoreFileChunk[];
    count: number;
    file: DocumentStoreLoaderForPreview;
    currentPage: number;
    storeName: string;
    description: string;
};
export type GetDocumentChunksRequest = BaseRequest & {
    storeId: string;
    loaderId: string;
    pageNo: string;
};
export declare const getDocumentChunksQuery: ({ storeId, loaderId, pageNo, apiHost, onRequest }: GetDocumentChunksRequest) => Promise<{
    data?: GetDocumentChunksResponse | undefined;
    error?: Error | undefined;
}>;
export {};
//# sourceMappingURL=sendMessageQuery.d.ts.map