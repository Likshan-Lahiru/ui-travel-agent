'use client'
import {useEffect, useState} from "react";
import ChatInterface from "@/app/components/Chat";
import {CalendarIcon} from "lucide-react";


const defaultParisItinerary = {
    day1: {
        day_id: 'day1',
        timeslots: [
            {
                time: '9:00 AM',
                activity: 'Visit the Eiffel Tower',
            },
            {
                time: '11:00 AM',
                activity: 'Explore The Lou and surrounding areas',
            },
            {
                time: '2:00 PM',
                activity: 'Lunch at a nearby bistro',
            },
            {
                time: '4:00 PM',
                activity: 'River Seine Cruise',
            },
        ],
    },
    day2: {
        day_id: 'day2',
        timeslots: [
            {
                time: '9:30 AM',
                activity: 'Visit The Louvre Museum',
            },
            {
                time: '1:00 PM',
                activity: 'Lunch at a nearby restaurant',
            },
            {
                time: '3:00 PM',
                activity: 'Explore Montmartre',
            },
        ],
    },
    day3: {
        day_id: 'day3',
        timeslots: [
            {
                time: '10:00 AM',
                activity: 'Visit Notre-Dame Cathedral',
            },
            {
                time: '12:00 PM',
                activity: 'Lunch at a nearby café',
            },
            {
                time: '2:00 PM',
                activity: 'Shop at Galeries Lafayette',
            },
        ],
    },
}
const HomePage = () => {
    const [showMap, setShowMap] = useState(false)
    const [showItinerary, setShowItinerary] = useState(false)
    const [itineraryData, setItineraryData] = useState(defaultParisItinerary)
    // Check for travel data in session storage
    useEffect(() => {
        const checkForTravelData = () => {
            const storedData = sessionStorage.getItem('travelData')
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData)
                    if (parsedData.day_wise_itinerary_object) {
                        setItineraryData(parsedData.day_wise_itinerary_object)
                    }
                } catch (error) {
                    console.error('Error parsing travel data:', error)
                }
            }
        }
        // Check initially
        checkForTravelData()
        // Set up an interval to check periodically
        const intervalId = setInterval(checkForTravelData, 2000)
        return () => clearInterval(intervalId)
    }, [])
    return (
        <div className="flex  h-screen bg-white">
            <div className="flex flex-1 overflow-hidden">
                <div className="w-full flex flex-col relative">
                    <ChatInterface />
                    {/* Floating itinerary button */}

                </div>

            </div>

        </div>
    )
}
export default HomePage
