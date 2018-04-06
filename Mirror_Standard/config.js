var config = {
    // Language for the mirror (currently not implemented)
    language : "ko-KR",
    greeting : ["Talking Mirror"], // An array of greetings to randomly choose from

    geoPosition: {
       latitude: 37.56621,
       longitude: 126.9779
    },

    // forecast.io
    forecast : {
        key : "...", // Your forecast.io api key
        units : "auto", // See forecast.io documentation if you are getting the wrong units
		refreshInterval : 2
    },
    // Calendar (An array of iCals)
    calendar: {
		icals : ["..."],
		maxResults: 9, // Number of calender events to display (Defaults is 9)
		maxDays: 365 // Number of days to display (Default is one year)
    },
    traffic: {
		key : "...", // Bing Maps API Key
		mode : "Transit", // Possibilities: Driving / Transit / Walking
		origin : "Suwon", // Start of your trip. Human readable address.
		destination : "Yangjae", // Destination of your trip. Human readable address.
		name : "THE ZILI", // Name of your destination ex: "work"
		reload_interval : 5 // Number of minutes the information is refreshed
    },
	subway: {
		key:"..."
    },
    youtube: {
		key:"..."
    },
    soundcloud: {
		key:"..."
    }
}
