import './proPage.css';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from "framer-motion";

import HeaderPropage from './headerPropage';
import AboutPropage from './aboutPropage';
import ContactPropage from './contactPropage';
import DivineSection from './divineSection';
import IntroduceProPage from './IntroducePropage';
import MyProjectPropage from './myProjectPropage';
import SkillPropage from './skillPropage';

export default function ProPage() {
  
    document.title = "Tuan Hiep"
   
    return (

        <div className='Propage'>
            <HeaderPropage />


            <div className='Container_content'>
              
                <AboutPropage />
                <DivineSection></DivineSection>
                <IntroduceProPage />
                <DivineSection></DivineSection>
                <MyProjectPropage/>
                <DivineSection></DivineSection>
                <SkillPropage/>
                <DivineSection></DivineSection>

                <ContactPropage />
            </div >
        </div >

    )
}
