import SecretManager from 'aws-sdk/clients/secretsmanager';

const region = 'us-east-1';

const secretsManager = new SecretManager({
  region
});

const getSecret = async (secretName: string): Promise<string | undefined> => {
  console.log('Getting secret');
  const secret = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

  return secret.SecretString;
};

export default getSecret;
