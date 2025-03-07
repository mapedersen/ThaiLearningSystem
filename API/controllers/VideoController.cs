using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[Route("api/video")]
[ApiController]
public class VideoController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public VideoController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet("{videoId}/transcript")]
    public async Task<IActionResult> GetTranscript(string videoId)
    {
        try
        {
            string pythonServiceUrl = $"http://localhost:5001/transcript/{videoId}";
            var response = await _httpClient.GetStringAsync(pythonServiceUrl);

            // Deserialize the JSON response into C# objects
            var transcriptData = JsonConvert.DeserializeObject<TranscriptResponse>(response);

            if (transcriptData == null || transcriptData.Transcript.Count == 0)
            {
                return NotFound("No transcript data found.");
            }

            return Ok(transcriptData);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }


}
