declare module 'twilio' {
  export interface TwilioConfig {
    accountSid: string;
    authToken: string;
  }

  export interface SendMessageRequest {
    body: string;
    to: string;
    from?: string;
    statusCallback?: string;
  }

  interface SubresourceURI {
    media?: string;
  }

  export interface SendMessageResponse {
    account_sid: string;
    api_version: string;
    body: string;
    date_created: string;
    date_sent: string;
    date_updated: string;
    direction: string;
    error_code?: string;
    error_message?: number;
    from: string;
    messaging_service_sid?: string;
    num_media?: string;
    num_segments?: string;
    price?: string;
    price_unit?: string;
    sid: string;
    status: string;
    subresource_uris: SubresourceURI;
    to: string;
    uri: string;
  }

  export default class Twilio {
    constructor(config: TwilioConfig);
    sendMessage(request: SendMessageRequest): Promise<SendMessageResponse>;
  }
}
