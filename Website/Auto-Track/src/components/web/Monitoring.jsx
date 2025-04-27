import React, { useState, useRef, useEffect } from 'react';
import { Grid, Video, Loader, Monitor, Camera, Search, ZoomIn, ZoomOut, Play, Pause, SkipForward, SkipBack, Maximize2, Minimize2, Settings, ChevronRight, Menu, X, Clock, Eye, LayoutGrid, Bell, Database, RefreshCw, AlertTriangle } from 'lucide-react';
import {videoData} from '../../data/videoData'; // Import video data
// Mock video data categorized as real-time and processed


const VideoMonitoringSystem = () => {
  const [gridSize, setGridSize] = useState(4);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTab, setSelectedTab] = useState("realTime");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeCategory, setActiveCategory] = useState("realTime");
  const videoRefs = useRef({});
  const selectedVideoContainerRef = useRef(null);

  // Check for mobile view on initial render and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    
    // Set initial state
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);

  }, []);

  // Filter videos based on search query and active category
  const filteredVideos = videoData[activeCategory].filter(video =>
    video.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Videos to display based on selected video or grid size
  const displayedVideos = selectedVideo ? [selectedVideo] : filteredVideos.slice(0, gridSize);

  // Update grid size based on screen size
  useEffect(() => {
    const updateGridSize = () => {
      if (window.innerWidth < 640) { // Small mobile
        setGridSize(Math.min(gridSize, 2));
      } else if (window.innerWidth < 768) { // Mobile
        setGridSize(Math.min(gridSize, 4));
      } else if (window.innerWidth < 1024) { // Tablet
        setGridSize(Math.min(gridSize, 6));
      }
    };
    
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    
    return () => window.removeEventListener('resize', updateGridSize);
  }, [gridSize]);

  // Update page title based on active category
  useEffect(() => {
    document.title = activeCategory === "realTime" ? "Live Video Feed" : "Processed Video Feed";
  }, [activeCategory]);

  const handleGridChange = (size) => {
    setGridSize(size);
    setSelectedVideo(null);
    setZoomLevel(1);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setZoomLevel(1);
    setIsPlaying(true);
    // Close sidebar on mobile when viewing a video
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleBackToGrid = () => {
    setSelectedVideo(null);
    setZoomLevel(1);
    // Reset all video states when going back to grid
    Object.values(videoRefs.current).forEach(ref => {
      if (ref) {
        ref.currentTime = 0;
     
        ref.play();
        
      }
    });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedVideo(null);
    setSearchQuery('');
    // Reset zoom level when changing categories
    setZoomLevel(1);
    // Close sidebar on mobile after selection
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 5));

    // Adjust scroll position after zooming
    if (selectedVideoContainerRef.current) {
      const container = selectedVideoContainerRef.current;
      container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
    }
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 1));

    // Adjust scroll position after zooming
    if (selectedVideoContainerRef.current) {
      const container = selectedVideoContainerRef.current;
      container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
    }
  };

  const handlePlayPause = () => {
    if (selectedVideo && videoRefs.current[selectedVideo.id]) {
      const videoRef = videoRefs.current[selectedVideo.id];
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkipForward = () => {
    if (selectedVideo && videoRefs.current[selectedVideo.id]) {
      videoRefs.current[selectedVideo.id].currentTime += 10;
    }
  };

  const handleSkipBack = () => {
    if (selectedVideo && videoRefs.current[selectedVideo.id]) {
      videoRefs.current[selectedVideo.id].currentTime -= 10;
    }
  };

  const getGridColumns = (size) => {
    if (window.innerWidth < 640) { // Small mobile
      return 1; // Single column for smallest screens
    } else if (window.innerWidth < 768) { // Mobile
      return 2;
    } else if (window.innerWidth < 1024) { // Tablet
      return Math.min(3, getBaseGridColumns(size));
    } else {
      return getBaseGridColumns(size);
    }
  };

  const getBaseGridColumns = (size) => {
    switch (size) {
      case 2: return 2;
      case 4: return 2;
      case 6: return 3;
      case 9: return 3;
      case 16: return 4;
      case 25: return 5;
      case 100: return 7;
      default: return 2;
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br  from-blue-50 via-white to-blue-100 mt-20">
      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-3">
          <Camera className="h-6 w-6" />
          Video Monitor
        </h2>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-blue-400 bg-opacity-20 hover:bg-opacity-40 transition-all"
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Menu className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      {/* Sidebar - Responsive */}
      <div 
        className={`${isSidebarOpen ? 'block' : 'hidden'} md:block bg-white border-r border-gray-200 h-full md:h-screen w-full md:w-80 lg:w-80 flex-shrink-0 transition-all duration-300 overflow-auto  z-20 ${isMobile ? 'absolute inset-0' : ''}`}
      >
        {/* Header with gradient background - Hidden on mobile */}
        <div className="hidden md:flex bg-gradient-to-r from-blue-600 to-blue-500 p-5 items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-3">
            <Camera className="h-6 w-6" />
            Video Monitor
          </h2>
          
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Category Selection */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Video className="h-5 w-5 text-blue-600" />
              Video Category
            </h3>
            
            <div className="flex gap-4">
              <button
                onClick={() => handleCategoryChange("realTime")}
                className={`flex-1 p-3 rounded-lg transition-all duration-200 flex flex-col items-center ${
                  activeCategory === "realTime"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <Monitor className="h-6 w-6 mb-1" />
                <span className="font-medium">Real-Time</span>
              </button>
              <button
                onClick={() => handleCategoryChange("processed")}
                className={`flex-1 p-3 rounded-lg transition-all duration-200 flex flex-col items-center ${
                  activeCategory === "processed"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <Clock className="h-6 w-6 mb-1" />
                <span className="font-medium">Processed</span>
              </button>
            </div>
          </div>

          {/* Grid Selection - Hidden on mobile */}
          <div className="hidden md:block bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Grid className="h-5 w-5 text-blue-600" />
              Grid Layout
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {[2, 4, 6, 9,16,25,100].map((size) => (
                <button
                  key={size}
                  onClick={() => handleGridChange(size)}
                  className={`p-3 rounded-lg transition-all duration-200 flex flex-col items-center ${
                    gridSize === size
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-1 mb-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-sm ${gridSize === size ? "bg-blue-200" : "bg-gray-300"}`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs font-medium">{size}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Filter */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Find Cameras
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Camera List */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              {activeCategory === "realTime" ? (
                <>
                  <Monitor className="h-5 w-5 text-blue-600" />
                  Available Cameras
                </>
              ) : (
                <>
                  <Clock className="h-5 w-5 text-blue-600" />
                  Processed Videos
                </>
              )}
            </h3>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {videoData[activeCategory].map((video) => (
                <div 
                  key={video.id}
                  className="bg-white p-3 rounded-lg border border-gray-100 hover:border-blue-200 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition-all"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="flex items-center gap-3">
                    {activeCategory === "realTime" ? (
                      <div className={`w-2 h-2 rounded-full ${video.status === "Active" ? "bg-green-500" : "bg-gray-300"}`}></div>
                    ) : (
                      video.status === "Processing" ? (
                        <Loader className="h-4 w-4 text-orange-500 animate-spin" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      )
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{video.name}</p>
                      <p className="text-xs text-gray-500">
                        {activeCategory === "realTime" ? `Status: ${video.status}` : `Processed: ${video.processedDate || 'N/A'}`}
                      </p>
                    </div>
                  </div>
                  <button className="p-1 rounded hover:bg-gray-100">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 md:p-5 overflow-auto unhide-scrollbar">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
            {activeCategory === "realTime" ? (
              <>
                <Monitor className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <span className="sm:inline">Live Video Feed</span>
              </>
            ) : (
              <>
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <span className="sm:inline">Processed Video Feed</span>
              </>
            )}
          </h1>
          
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredVideos.length} videos
            </div>
            {activeCategory === "realTime" && (
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Live
              </div>
            )}
            {/* Mobile-only menu button */}
            <button 
              onClick={toggleSidebar}
              className="md:hidden ml-auto bg-blue-500 text-white p-2 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {selectedVideo ? (
          <div className="h-[82%] align-middle  flex flex-col ">
            <div
              ref={selectedVideoContainerRef}
              className="relative flex-1 bg-black self-center w-[90%] rounded-lg overflow-auto"
              style={{
                overscrollBehavior: 'contain',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.3) transparent',
                minHeight: '60vh'
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  minWidth: '80%',
                  minHeight: '80%',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transition: 'transform 0.3s ease-out',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <video
                    ref={el => videoRefs.current[selectedVideo.id] = el}
                    src={selectedVideo.url} 
                    className="max-w-full max-h-full"
                    autoPlay={activeCategory === "realTime"}
                    controls={activeCategory === "processed"}
                    loop={activeCategory === "realTime"}
                    playsInline // Better mobile experience
                  ><source src={selectedVideo.url} type="video/mp4" />Your browser does not support the video tag.</video>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                {activeCategory === "realTime" ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-medium">{selectedVideo.name}</span>
                    <span className="text-xs bg-blue-500 bg-opacity-30 px-2 py-0.5 rounded">LIVE</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{selectedVideo.name}</span>
                    <span className="text-xs bg-blue-500 bg-opacity-30 px-2 py-0.5 rounded">
                      {selectedVideo.status}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center w-[80%] self-center justify-center gap-3  sm:gap-6 bg-white p-3 sm:p-4 rounded-lg shadow-md">
              <button 
                onClick={handleZoomOut} 
                className="p-2 sm:p-3 rounded-full hover:bg-blue-50 text-blue-600 transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button 
                onClick={handleZoomIn} 
                className="p-2 sm:p-3 rounded-full hover:bg-blue-50 text-blue-600 transition-all"
                title="Zoom In"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button 
                onClick={handlePlayPause} 
                className="p-2 sm:p-3 rounded-full hover:bg-blue-50 text-blue-600 transition-all"
                title="Play/Pause"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button 
                onClick={handleSkipBack} 
                className="p-2 sm:p-3 rounded-full hover:bg-blue-50 text-blue-600 transition-all"
                title="Skip Back 10s"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              <button 
                onClick={handleSkipForward} 
                className="p-2 sm:p-3 rounded-full hover:bg-blue-50 text-blue-600 transition-all"
                title="Skip Forward 10s"
              >
                <SkipForward className="h-5 w-5" />
              </button>
              <button 
                onClick={handleBackToGrid} 
                className="p-2 sm:p-3 rounded-full hover:bg-blue-50 text-blue-600 transition-all"
                title="Back to Grid View"
              >
                <Minimize2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {filteredVideos.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
                <Search className="h-12 w-12 sm:h-16 sm:w-16 mb-4 text-gray-300" />
                <p className="text-lg sm:text-xl text-center">No videos found matching your search</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div
                className="grid gap-3 sm:gap-4 min-h-[60vh]"
                style={{
                  gridTemplateColumns: `repeat(${getGridColumns(gridSize)}, 1fr)`,
                  gridAutoRows: 'minmax(200px, 1fr)'
                }}
              >
                {displayedVideos.map(video => (
                  <div
                    key={video.id}
                    className="relative cursor-pointer group rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl min-h-[200px]"
                    onClick={() => handleVideoClick(video)}
                  >
                    <video
                      ref={el => videoRefs.current[video.id] = el}
                      src={video.url}
                      className="w-full h-full object-cover"
                      autoPlay={activeCategory === "realTime" || video.status === "Processing"}
                      muted
                      loop={activeCategory === "realTime" || activeCategory === "processed"}
                      playsInline // Better mobile experience
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white bg-opacity-20 p-3 rounded-full backdrop-blur-sm">
                        <Maximize2 className="text-white h-6 w-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center gap-2 mb-1">
                        {activeCategory === "realTime" ? (
                          <>
                            <div className={`w-2 h-2 rounded-full ${video.status === "Active" ? "bg-green-500" : "bg-gray-300"}`}></div>
                            <span className="text-white text-xs font-medium">{video.status}</span>
                          </>
                        ) : (
                          <>
                            {video.status === "Processing" ? (
                              <Loader className="h-3 w-3 text-orange-500 animate-spin" />
                            ) : (
                              <Clock className="h-3 w-3 text-blue-300" />
                            )}
                            <span className="text-white text-xs font-medium">{video.status}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-white font-bold">{video.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoMonitoringSystem;