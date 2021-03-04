import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import VillagersList from '../VillagersList/VillagersList';
import VillagerDetail from '../VillagerDetail/VillagerDetail';
import './App.css';

const App = () => {

  // Initialise state - retrieve all villagers as one object into state.
  const [villagers, setVillagers] = useState({});

  // Make the API call to fetch all the villagers and store them in state.
  const fetchVillagers = async() => {
    try {
      const fetchVillagers = await fetch('https://acnhapi.com/v1/villagers/');
      if (fetchVillagers.ok) {
        const villagers = await fetchVillagers.json();       
        // Store the returned villagers object in state.
        setVillagers(villagers);
      } else {
        // Response is not OK, so throw an error
        throw new Error('Error fetching villagers list.');
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  // Create a side-effect to fetch the villagers after the component mounts.
  // Use empty dependency array so it is only called once (after mount).
  useEffect(() => {
    // Call the function to make a call to the villagers API.
    fetchVillagers();
  }, []);

  // In the 'return', check that the 'fetchVillagers' effect has run and that the 'villagers' state is populated.
  // If not, don't return it for rendering.

  return (
      <div className="App">
        <Router>
          <Switch>
            { /* Route for home page - render the main list view */ }
            <Route path="/" exact>
              {villagers && <VillagersList list={villagers} />}
            </Route>

            { /* Route for 'id' parameter - render the individual detail view */ }
            <Route path="/:id" exact component={VillagerDetail} />

            { /* Catchall route - any other route should redirect to home page */ }
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;