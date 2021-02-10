import React from 'react';
import './ExternalLinks.css';

const ExternalLinks = () => {
    return (
        <div>
            <a href="https://www.chriswalker.website" target="_blank" rel="noreferrer">chriswalker.website <span className="small-icon"><ion-icon name="globe-outline"></ion-icon></span></a><br />
            <a href="https://github.com/chris-walker76/acnh-villagers-app" target="_blank" rel="noreferrer">Visit this app on GitHub <span className="small-icon"><ion-icon name="logo-github"></ion-icon></span></a>
        </div>
    )
};

export default ExternalLinks;