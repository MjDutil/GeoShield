/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { Menu, Search, User, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MapView from "@/components/MapView";
import ProfileSidebar from "@/components/ProfileSidebar";

interface SearchSuggestion {
  id: string;
  place_name: string;
  center: [number, number];
}

const MAPBOX_TOKEN = "pk.eyJ1IjoidGVsbGVzLWxlb25hcmRvIiwiYSI6ImNtaDJib3dueDEwd2pic285aDgwNGFzeTkifQ.JoVj1cLVsyJHUwxxYNpv_A";

const Map = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const mapRef = useRef<any>(null);

  // Fetch location suggestions from Mapbox Geocoding API
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${MAPBOX_TOKEN}&proximity=-47.4582,-23.5015&bbox=-47.6,-23.6,-47.3,-23.4&limit=5`
        );
        const data = await response.json();
        setSuggestions(data.features || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.place_name);
    setShowSuggestions(false);
    setSuggestions([]);

    // Move map to selected location
    if (mapRef.current) {
      mapRef.current.flyTo(suggestion.center, 15);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Map */}
      <MapView ref={mapRef} />

      {/* Top Controls */}
      <div className="absolute top-6 left-6 z-30 flex items-center gap-4">

        {/* Search and Title Card */}
        <div className="bg-background rounded-2xl shadow-lg p-4 min-w-[300px]">
          <div className="flex justify-start items-center gap-2 mb-3">
              <Menu width={20} onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-foreground cursor-pointer hover:bg-accent rounded-lg box-content p-1"
              />
            <h2 className="text-lg font-semibold text-foreground">Let's explore</h2>
          </div>

          <div className="relative mb-3">
            <Input
              type="text"
              placeholder="Pick a place to check"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              className="pl-4 pr-10 py-2 rounded-lg border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-start gap-2 border-b border-border last:border-b-0"
                  >
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{suggestion.place_name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-center text-muted-foreground mb-2">or</p>

          <Button
            className="w-full py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
          >
            Use your location
          </Button>
        </div>
      </div>

      {/* Profile Sidebar */}
      <ProfileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

export default Map;
