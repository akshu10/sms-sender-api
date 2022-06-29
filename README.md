# sms-sender-api

SMS Sender API

## Build

```
yarn install
yarn build
```

## Run API Locally

```
yarn start
```

## Twilio Example Response

```
{
body: 'Hello world!',
numSegments: '0',
direction: 'outbound-api',
from: null,
to: 'XXXXXXXXXXX',
dateUpdated: 2022-06-29T00:17:07.000Z,
price: null,
errorMessage: null,
uri: '/2010-04-01/Accounts/ACb4add74993c2be56b8d7fa81e5d7804e/Messages/SM52763ab706e94889ad05a8eaa662d7f9.json',
accountSid: 'XXXXXXXXX',
numMedia: '0',
status: 'accepted',
messagingServiceSid: 'XXXXXXXXXXXXXX',
sid: 'SM52763ab706e94889ad05a8eaa662d7f9',
dateSent: null,
dateCreated: 2022-06-29T00:17:07.000Z,
errorCode: null,
priceUnit: null,
apiVersion: '2010-04-01',
subresourceUris: {
media: '/2010-04-01/Accounts/ACb4add74993c2be56b8d7fa81e5d7804e/Messages/SM52763ab706e94889ad05a8eaa662d7f9/Media.json'
}
}
```
