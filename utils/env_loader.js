import { existsSync, readFileSync } from 'fs';

/**
 * Loads the appropriate environment variables based on the current event.
 */
const loadEnvironmentVariables = () => {
  const event = process.env.npm_lifecycle_event || 'dev';
  const filePath = event.includes('test') || event.includes('cover') ? '.env.test' : '.env';

  if (existsSync(filePath)) {
    const fileContents = readFileSync(filePath, 'utf-8').trim().split('\n');

    for (const line of fileContents) {
      const delimiterIndex = line.indexOf('=');
      const variableName = line.substring(0, delimiterIndex);
      const variableValue = line.substring(delimiterIndex + 1);
      process.env[variableName] = variableValue;
    }
  }
};

export default loadEnvironmentVariables;
