import React from 'react';
import './ExternalLinks.css';

const ExternalLinks = () => {
    return (
        <div>
            <a href="https://chrismwalker.co.uk" target="_blank" rel="noreferrer">chrismwalker.co.uk <span className="small-icon"><ion-icon name="globe-outline"></ion-icon></span></a><br />
            <a href="https://github.com/chrismwalker-portfolio/acnh-villagers-app" target="_blank" rel="noreferrer">Visit this app on GitHub <span className="small-icon"><ion-icon name="logo-github"></ion-icon></span></a>
        </div>
    )
};

export default ExternalLinks;