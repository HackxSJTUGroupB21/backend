const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const path = require('path');

export async function speech_to_text(audio_name) {
  try {
    const audio = path.join(path.resolve(), `temp/${audio_name}`);
    const speech_to_text = new SpeechToTextV1({
      username: 'abb978b3-70dd-4d0a-bd98-5aac39561f1f',
      password: 'dbYXxO8EPV6y'
    });

    const params = {
      audio: fs.createReadStream(audio),
      model: 'en-US_BroadbandModel', // for English version
    // model: 'zh-CN_BroadbandModel',	 // for Chinese version
      content_type: 'audio/webm',
      max_alternatives: 3,
      word_confidence: false,
      timestamps: false,
      silent: true
    // keywords: ['colorado', 'tornado', 'tornadoes'],
    // 'keywords_threshold': 0.5
    };

    const recognize = () => new Promise((resolve, reject) => {
      speech_to_text.recognize(params, (error, transcript) => {
        if (error) {
          reject(error);
        } else {
          if (!transcript.results
            || transcript.results.length === 0
            || !transcript.results[0].alternatives
            || transcript.results[0].alternatives.length === 0) {
            return resolve('');
          }
          const first_result = transcript.results[0].alternatives[0];
          const ret = first_result.transcript;
          resolve(ret);
        }
      });
    });

    const ret = await recognize();
    return ret;
  } catch (err) {
    console.log(err);
  }
}
