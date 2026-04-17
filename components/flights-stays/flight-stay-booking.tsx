"use client"

import { useState } from "react"
import { Plane, Hotel } from "lucide-react"

const FLIGHT = "flight"
const HOTEL = "hotel"

const widgetData = {
  [FLIGHT]: {
    title: "Flight Search",
    description:
      "Search for flights with our partner Trip.com. Find the best deals for your next adventure!",
    desktopSrc:
      "https://www.trip.com/partners/ad/S14632431?Allianceid=8008134&SID=302822066&trip_sub1=", 
    mobileSrc:
      "https://www.trip.com/partners/ad/S14632389?Allianceid=8008134&SID=302822066&trip_sub1=",
    desktopId: "S14632431",
    mobileId: "S14632389",
    icon: Plane,
  },
  [HOTEL]: {
    title: "Hotel Search",
    description:
      "Search for hotels and accommodations with our partner Trip.com. Find the perfect stay for your journey!",
    desktopSrc:
      "https://www.trip.com/partners/ad/S14632480?Allianceid=8008134&SID=302822066&trip_sub1=",
    mobileSrc:
      "https://www.trip.com/partners/ad/S14632438?Allianceid=8008134&SID=302822066&trip_sub1=",
    desktopId: "S14632480",
    mobileId: "S14632438",
    icon: Hotel,
  },
}

export function FlightStayBooking() {
  const [selected, setSelected] = useState<typeof FLIGHT | typeof HOTEL>(FLIGHT)
  const { title, description, desktopSrc, mobileSrc, desktopId, mobileId, icon: Icon } =
    widgetData[selected as keyof typeof widgetData]

  return (
    <div className="w-full bg-white/80 py-8">
      {/* Sub Navbar */}
      <div className="flex justify-center mb-8">
        <div
          className="flex rounded-xl shadow-lg backdrop-blur-md bg-white/40 border border-gray-200 overflow-hidden"
          style={{
            boxShadow:
              "0 4px 24px 0 rgba(30, 41, 59, 0.08), 0 1.5px 4px 0 rgba(30, 41, 59, 0.04)",
          }}
        >
          <button
            className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold transition-colors duration-200 focus:outline-none ${
              selected === FLIGHT
                ? "bg-white/70 text-[#3E5F44] shadow-inner"
                : "bg-transparent text-gray-500 hover:bg-white/50"
            }`}
            onClick={() => setSelected(FLIGHT)}
            aria-selected={selected === FLIGHT}
            tabIndex={0}
            type="button"
          >
            <Plane className="w-5 h-5" />
            Flights
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold transition-colors duration-200 focus:outline-none ${
              selected === HOTEL
                ? "bg-white/70 text-[#3E5F44] shadow-inner"
                : "bg-transparent text-gray-500 hover:bg-white/50"
            }`}
            onClick={() => setSelected(HOTEL)}
            aria-selected={selected === HOTEL}
            tabIndex={0}
            type="button"
          >
            <Hotel className="w-5 h-5" />
            Hotels
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Icon className="w-7 h-7 text-[#3E5F44]" />
          {title}
        </h1>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      {/* Widget Iframe */}
      <div className="w-full flex justify-center items-center">
        {/* Desktop iframe */}
        <iframe
          src={desktopSrc}
          style={{ width: 914, height: 250, border: "none" }}
          frameBorder={0}
          scrolling="no"
          id={desktopId}
          className="hidden sm:block "
          title={title + " Desktop Widget"}
        ></iframe>
        {/* Mobile iframe */}
        <iframe
          src={mobileSrc}
          style={{ width: 320, height: 320, border: "none" }}
          frameBorder={0}
          scrolling="no"
          id={mobileId}
          className="block sm:hidden "
          title={title + " Mobile Widget"}
        ></iframe>
      </div>
    </div>
  )
}