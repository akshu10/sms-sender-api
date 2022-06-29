import AWS from 'aws-sdk';

const region = 'us-east-1';

export class SecretsManager {
  client: AWS.SecretsManager;

  constructor(
    client = new AWS.SecretsManager({
      region
    })
  ) {
    this.client = client;
  }

  getSecret = async (secretName: string): Promise<Record<string, string> | undefined> => {
    console.log('Getting secret');
    return new Promise((resolve, reject) => {
      this.client.getSecretValue(
        { SecretId: secretName },
        (err: AWS.AWSError, data: AWS.SecretsManager.GetSecretValueResponse) => {
          if (err) {
            reject(err);
          } else if ('SecretString' in data) {
            resolve(JSON.parse(data.SecretString || '{}'));
          } else {
            reject(new Error('Secret is not a string'));
          }
        }
      );
    });
  };
}

export default new SecretsManager();
