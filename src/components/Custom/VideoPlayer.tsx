import React, { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  onVideoEnd: () => void;
  isMuted: boolean;
  isPlaying: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onVideoEnd,
  isMuted,
  isPlaying,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // observer for video when it scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    const videoElement = videoRef.current;

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  // handle video play/pause based on visibility and playback settings
  useEffect(() => {
    const videoElement = videoRef.current;

    if (isInView && isLoaded && isPlaying) {
      setIsVideoPlaying(true);
    } else {
      setIsVideoPlaying(false);
    }

    if (videoElement) {
      if (isVideoPlaying) {
        videoElement.play().catch((error) => {
          // Handle any play() errors
          console.log(error);
        });
      } else {
        videoElement.pause();
      }
    }
  }, [isInView, isLoaded, isPlaying, isVideoPlaying]);

  // handle video metadata load
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
    };

    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, []);

  // handle video end
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("ended", onVideoEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", onVideoEnd);
      }
    };
  }, []);

  // handle video click to toggle play/pause
  const handleVideoClick = () => {
    setIsVideoPlaying((prevIsVideoPlaying) => !prevIsVideoPlaying);
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={videoUrl}
        muted={isMuted}
        onClick={handleVideoClick}
      />
    </div>
  );
};

export default VideoPlayer;
