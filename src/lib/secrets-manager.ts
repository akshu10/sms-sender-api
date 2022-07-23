import { SecretsManager } from 'aws-sdk';

const region = 'us-east-1';

const client = new SecretsManager({
  region
});

const getSecret = async (secretName: string): Promise<string | undefined> => {
  console.log('Getting secret');
  const secret = await client.getSecretValue({ SecretId: secretName }).promise();

  return secret.SecretString;
};

export default getSecret;
