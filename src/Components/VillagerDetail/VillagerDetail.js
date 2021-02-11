import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './VillagerDetail.css';
import ExternalLinks from '../ExternalLinks/ExternalLinks';

const VillagerDetail = (props) => {

    // Initialise state - we will retrieve the attributes of one specific villager into state.
    // OK to hold state here, in a child component, as it's not passed anywhere and only used
    // for the purposes of rendering this component.
    const [villager, setVillager] = useState(null);

    // 'Match' object is automatically received as a prop from the component that <Link>'ed to here.
    // It contains properties such as parameters, path and URL.
    // We can use the 'id' param to determine the villager ID of the link that was clicked and led here.
    const villagerId = props.match.params['id'];
    const villagerUrl = `https://acnhapi.com/v1/villagers/${villagerId}`;

    // Make the API call to fetch a specific villager.
    const fetchVillager = async() => {
        try {
            const fetchVillager = await fetch(villagerUrl);
            if (fetchVillager.ok) {
                const villager = await fetchVillager.json();
                // Store the returned villager object in state.
                setVillager(villager);
            } else {
                // Response is not OK, so throw an error
                throw new Error(`Error fetching villager: ID = ${villagerId}.`);
            }
        }
        catch (error) {
        console.log(error);
        }
    };

    // Create a side-effect to fetch the specfic villager details after the component mounts.
    useEffect(() => {
        // Call the function to make a call to the villagers API.
        fetchVillager();
    }, []);

    // Make sure the effect has run and that we have a villager in state before trying to return JSX.
    // If not, return 'Loading...' text instead.
    if (!villager) {
        return <div id="villagerDetail" className="loadingBox">Loading...</div>
    }

    return (
        <div>
            { /* Use clearix to correct the layout after using 'float' in the header. */ }
            <div className="header clearfix">
                <div className="backButton top"><Link to={'/'} onClick={() => props.history.goBack()}><ion-icon name="arrow-back-circle-outline"></ion-icon></Link></div>
                <div className="externalLinksDetail"><ExternalLinks /></div>
            </div>
            <div id="villagerDetail" className="villagerDetail">
                <div className="headingBox1">My name is</div>
                <div className="headingBox2">{ villager['name']['name-EUen'] }</div>
                <img src={ villager.image_uri } alt={ villager['name']['name-EUen'] } />
                <div>
                    <div className="sectionBox">Gender:&nbsp; &nbsp;<span className="property">{ villager.gender }</span></div>
                    <div className="sectionBox">Species:&nbsp; &nbsp;<span className="property">{ villager.species }</span></div>
                    <div className="sectionBox">Personality:&nbsp; &nbsp;<span className="property">{ villager.personality }</span></div>
                    <div className="sectionBox">Birthday:&nbsp; &nbsp;<span className="property">{ villager['birthday-string'] }</span></div>
                    <div className="sectionBox">Hobby:&nbsp; &nbsp;<span className="property">{ villager.hobby }</span></div>
                    <div className="sectionBox">Catchphrase:&nbsp; &nbsp; <span className="quote">&quot;{ villager['catch-phrase'] }&quot;</span></div>
                    <div className="sectionBox">Saying:&nbsp; &nbsp; <span className="quote">&quot;{ villager.saying }&quot;</span></div>
                </div>
                <div className="backButton bottom"><Link to={'/'} onClick={() => props.history.goBack()}><ion-icon name="arrow-back-circle-outline"></ion-icon></Link></div>
            </div>
        </div>
    )
}

// Define props expected to be passed to this component.
VillagerDetail.propTypes = {
    match: PropTypes.object.isRequired
};

export default VillagerDetail;