import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './VillagersList.css';
import ExternalLinks from '../ExternalLinks/ExternalLinks';

const VillagersList = props => {
    // Store villagers prop.
    const {list} = props;

    // New array to store just the attributes required to list the villagers.
    // Each item in the array will be an array of [name, id, icon_uri].
    // This will also make sorting alphabetically by villager name easier than in an object.
    const villagers = [];

    // Push the required properties of each object in 'list' into the new array.
    for (let villager in list) {
        villagers.push([list[villager]['name']['name-EUen'], list[villager]['id'], list[villager]['icon_uri']]);
    }
    
    // Sort the villagers array alphabetically by villager name (first element inside each array).
    const orderedVillagers = villagers.sort((a, b) => {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
    });

    return (
        <div>
            <div className="externalLinksList"><ExternalLinks /></div>
            <div className="villagersList">
                {
                    orderedVillagers.map(villager => {
                        return (
                            <div className="villagerBox fade-in" key={villager[1]}>
                                <Link to={`${process.env.PUBLIC_URL}/${villager[1]}`}>
                                    <div className="heading">
                                        {villager[0]}
                                    </div>
                                    <div className="villagerImage">
                                        <img loading="lazy" className="fade-in" src={villager[2]} alt={villager[0]} />
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

// Define props expected to be passed to this component.
VillagersList.propTypes = {
    list: PropTypes.object.isRequired
};

export default VillagersList;