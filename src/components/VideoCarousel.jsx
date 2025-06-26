// import React, { useRef, useState, useEffect } from "react";
// import { hightlightsSlides } from "../constants";
// import { pauseImg, playImg, replayImg } from "../utils";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";

// const VideoCarousel = () => {
//   const videoRef = useRef([]);
//   const videoSpanRef = useRef([]);
//   const videoDivRef = useRef([]);

//   const [video, setVideo] = useState({
//     isEnd: false,
//     startPlay: false,
//     videoId: 0,
//     isLastVideo: false,
//     isPlaying: false,
//   });

//   const [loadedData, setLoadedData] = useState([]);

//   const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

//   useGSAP(() => {
//     gsap.to('#video', ({
//         scrollTrigger:{
//             trigger: '#video',
//             toggleActions: 'restart none none none'
//         },
//         onComplete:() => {
//             setVideo((pre)=>({
//                 ...pre,
//                 startPlay: true,
//                 isPlaying: true,
//             }))
//         }
//     }))
//   }, [isEnd, videoId])

//   useEffect(() => {
//     if (loadedData.length > 3) {
//       if (!isPlaying) {
//         videoRef.current[videoId].pause();
//       } else {
//         startPlay && videoRef.current[videoId].play();
//       }
//     }
//   }, [isPlaying, videoId, startPlay, loadedData]);

//   const handleLoadedMetaData = (i, e) => {
//     setLoadedData((pre) => [...pre, e] )
//   }

//   useEffect(() => {
//     const currentProgress = 0;
//     let span = videoSpanRef.current;
//     if (span[videoId]) {
//       // animate the progress
//       let anime = gsap.to(span[videoId], {
//         onUpdate: () => {},
//         onComplete: () => {},
//       });
//     }
//   }, [videoId, startPlay]);

//   const handleProcess = (type, i ) => {
//     switch (type) {
//         case 'video-end' :
//             setVideo((prev)=>({...prev, isEnd: true, videoId: i+1 }))
//             break;
//         case 'video-last':
//             setVideo((prev)=>({...prev, isLastVideo: true}))
//             break;
//         case 'video-reset':
//             setVideo((prev)=>({...prev, isLastVideo:false, videoId: 0}))
//             break;
//         case 'play':
//             setVideo((prev)=>({...prev, isPlaying: !prev.isPlaying}))
//             break;
//         default:
//             return video;
//     }
//   }

//   return (
//     <>
//       <div className="flex items-center">
//         {hightlightsSlides.map((list, i) => (
//           <div key={list.id} id="slider" className="sm:pr-20 pr-10">
//             <div className="video-carousel_container">
//               <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
//                 <video
//                   id="video"
//                   playsInline={true}
//                   preload="auto"
//                   muted
//                   onPlay={() => {
//                     setVideo((prevVideo) => ({
//                       ...prevVideo,
//                       isPlaying: true,
//                     }));
//                   }}
//                   ref={(el) => (videoRef.current[i] = el)}
//                   onLoadedMetadata={(e)=> handleLoadedMetaData(i,e)}
//                 >
//                   {" "}
//                   <source src={list.video} type="video/mp4" />
//                 </video>
//               </div>
//               <div className="absolute top-12 left-[5%] z-10">
//                 {list.textLists.map((text) => (
//                   <p key={text} className="md:text-2xl text-xl font-medium">
//                     {text}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="relative flex-center mt-10 ">
//         <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
//           {videoRef.current.map((_, i) => (
//             <span
//               key={i}
//               ref={(el) => {
//                 videoDivRef.current[i] = el;
//               }}
//               className="mx-2 w-2 h-2 bg-gray-200 rounded-full relative cursor-pointer "
//             >
//               <span
//                 className="absolute h-full w-full rounded-full"
//                 ref={(el) => (videoRef.current[i] = el)}
//               />
//             </span>
//           ))}
//         </div>
//         <button className="control-btn">
//           <img
//             src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
//             alt={isLastVideo ? "replay" : isPlaying ? "play" : "pause"}
//             width={15}
//             onClick={isLastVideo ? () => handleProcess('video-reset'): !isPlaying
//                 ? () => handleProcess('play'): () => handleProcess('pause')
//             }
//           />
//         </button>
//       </div>
//     </>
//   );
// };

// export default VideoCarousel;

import React, { useRef, useState, useEffect } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3 && videoRef.current[videoId]) {
      if (!isPlaying && typeof videoRef.current[videoId].pause === "function") {
        videoRef.current[videoId].pause();
      } else if (
        startPlay &&
        typeof videoRef.current[videoId].play === "function"
      ) {
        videoRef.current[videoId].play();
      }
    }
  }, [isPlaying, videoId, startPlay, loadedData]);

  const handleLoadedMetaData = (i, e) => {
    setLoadedData((prev) => {
      if (!prev.includes(i)) {
        return [...prev, i];
      }
      return prev;
    });
  };

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;
    if (span[videoId]) {
      // Animate the progress
      let anime = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anime.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw"
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor:'white'
            })
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(span[videoId], {
              width: '12px'
            })
            gsap.to(span[videoId], {backgroundColor: '#afafaf'})
          }
        },
      });
      if(videoId === 0 ){
        anime.restart();
      }
      const animeUpdate = () => {
        anime.progress (videoRef.current[videoId] / hightlightsSlides[videoId].videoDuration)
      }
      if(isPlaying){
        gsap.ticker.add(animeUpdate)
      }else{
        gsap.ticker.remove(animeUpdate)
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: false }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  ref={(el) => (videoRef.current[i] = el)}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="flex flex-col absolute top-12 left-[5%] z-10 ">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10 ">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                videoDivRef.current[i] = el;
              }}
              className="mx-2 w-2 h-2 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span className="absolute h-full w-full rounded-full" />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : isPlaying ? "play" : "pause"}
            width={15}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
