public class TranscriptEntry
{
    public double Start { get; set; }
    public double Duration { get; set; }
    public string Text { get; set; }
}

public class TranscriptResponse
{
    public List<TranscriptEntry> Transcript { get; set; }
}
