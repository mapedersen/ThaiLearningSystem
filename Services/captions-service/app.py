from flask import Flask, jsonify
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)

@app.route('/transcript/<video_id>', methods=['GET'])
def get_transcript(video_id):
    try:
        # Fetch Thai subtitles explicitly
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=["th"])
        
        # Format the response to include timestamps
        transcript_data = [
            {
                "text": entry["text"],
                "start": entry["start"],        # Start time in seconds
                "duration": entry["duration"]   # Duration in seconds
            }
            for entry in transcript
        ]

        return jsonify({"transcript": transcript_data})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
