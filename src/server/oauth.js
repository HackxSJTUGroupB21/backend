import config from 'config';
import rp from 'request-promise';
import { Config } from '../models';

export async function getAccessToken() {
  try {
    const auth = config.auth;
    const { url, client_id, client_secret, kdt_id, grant_type } = auth;
    const options = {
      method: 'POST',
      uri: url,
      form: {
        client_id,
        client_secret,
        grant_type,
        kdt_id,
      },
      json: true
    };
    const result = await rp(options);
    await Config.findOneAndUpdate(
      { name: 'token' },
      { $set: { name: 'token', value: result.access_token } },
      { upsert: true, new: true }
    );
    return result.access_token;
  } catch (err) {
    throw err;
  }
}
