import os
from googleapiclient.discovery import build
from dotenv import load_dotenv

load_dotenv()

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

def get_exercise_video(exercise_name: str):
    if not YOUTUBE_API_KEY:
        return {"error": "YouTube API key not configured."}
        
    try:
        youtube_client = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)
        request = youtube_client.search().list(
            part="snippet",
            maxResults=1,
            q=f"{exercise_name} exercise tutorial proper form",
            type="video"
        )
        response = request.execute()
        
        if "items" in response and len(response["items"]) > 0:
            video_id = response["items"][0]["id"]["videoId"]
            return {"video_url": f"https://www.youtube.com/watch?v={video_id}", "video_id": video_id}
        
        return {"error": "No video found"}
    except Exception as e:
        return {"error": str(e)}
