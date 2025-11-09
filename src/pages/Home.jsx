import React, { useEffect } from 'react'
import Banner from '../Components/Home/Banner'
import CategorySection from '../Components/Home/CategorySection'
import RecentComplaints from '../Components/Home/RecentComplaints'
import CommunityStats from '../Components/Home/CommunityStats'
import VolunteerCTA from '../Components/Home/VolunteerCTA'

const Home = () => {
         useEffect(() => {
        document.title = "Home | SpotlessCity"; 
      }, []);
  return (
    <div>
      
        <Banner></Banner>
        <CategorySection></CategorySection>
        <RecentComplaints></RecentComplaints>
        <CommunityStats></CommunityStats>
        <VolunteerCTA></VolunteerCTA>
    </div>
  )
}

export default Home