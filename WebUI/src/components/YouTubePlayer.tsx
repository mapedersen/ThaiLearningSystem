import { useEffect, useState } from "react";

interface TranscriptEntry {
  start: number;
  duration: number;
  text: string;
}

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoId) {
      fetchTranscript(videoId);
    }
  }, [videoId]);

  const fetchTranscript = async (videoId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/video/${videoId}/transcript`);
      if (!response.ok) {
        throw new Error("Failed to fetch transcript");
      }
      const data: { transcript: TranscriptEntry[] } = await response.json();
      setTranscript(data.transcript);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  };

  return (
    <div>
      <h2>YouTube Player</h2>
      <div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <h3>Transcript</h3>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <ul>
            {transcript.map((entry, index) => (
              <li key={index}>{entry.text}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default YouTubePlayer;
