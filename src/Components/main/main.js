import React, { useState,useEffect } from 'react';
import Popup from './Popup';
import styles from "./main.module.css";


function Home() {
  useEffect(()=>
  {
    document.title="MetroNav"
  },[]);

     const metroStations = {
    "Chennai Central Metro Station": {
      "Chennai Egmore Metro Station": 25,
      "Nehru Park Metro Station": 10,
      "Kilpauk Metro Station": 15,
      "Pachaiyappa's College Metro Station": 30,
    },
    "Chennai Egmore Metro Station": {
      "Chennai Central Metro Station": 20,
      "Nehru Park Metro Station": 10,
      "Kilpauk Metro Station": 20,
      "Pachaiyappa's College Metro Station": 30,
      "Shenoy Nagar Metro Station": 25,
    },
    "Nehru Park Metro Station": {
      "Chennai Central Metro Station": 30, 
      "Chennai Egmore Metro Station": 10,
      "Kilpauk Metro Station": 25,
      "Pachaiyappa's College Metro Station": 25,
      "Shenoy Nagar Metro Station": 20,
      "Anna Nagar East Metro Station": 20,
    },
    "Kilpauk Metro Station": {
      "Chennai Central Metro Station": 20,
      "Chennai Egmore Metro Station": 20,
      "Nehru Park Metro Station": 15,
      "Pachaiyappa's College Metro Station": 20,
      "Shenoy Nagar Metro Station": 25,
      "Anna Nagar East Metro Station": 35,
    },
    "Pachaiyappa's College Metro Station": {
      "Chennai Central Metro Station": 30,
      "Chennai Egmore Metro Station": 19,
      "Nehru Park Metro Station": 10,
      "Kilpauk Metro Station": 20,
      "Shenoy Nagar Metro Station": 15,
      "Anna Nagar East Metro Station": 30,
    },
    "Shenoy Nagar Metro Station": {
      "Chennai Central Metro Station": 25,
      "Chennai Egmore Metro Station": 30,
      "Nehru Park Metro Station": 25,
      "Kilpauk Metro Station": 25,
      "Pachaiyappa's College Metro Station": 15,
      "Anna Nagar East Metro Station": 10,
      "Anna Nagar Tower Metro Station": 15,
    },
    "Anna Nagar Tower Metro Station": {
      "Shenoy Nagar Metro Station": 20,
      "Anna Nagar East Metro Station": 10,
      "Thirumangalam Metro Station": 15,
      "Koyambedu Metro Station": 20,
    },
    "Thirumangalam Metro Station": {
      "Anna Nagar East Metro Station": 20,
      "Anna Nagar Tower Metro Station": 15,
      "Koyambedu Metro Station": 20,
    },
    "Koyambedu Metro Station": {
      "Anna Nagar Tower Metro Station": 20,
      "Thirumangalam Metro Station": 10,
      "Arumbakkam Metro Station": 20,
      "Vadapalani Metro Station": 15,
      "Ashok Nagar Metro Station": 15,
    },
    "Arumbakkam Metro Station": {
      "Koyambedu Metro Station": 15,
      "Vadapalani Metro Station": 10,
      "Ashok Nagar Metro Station": 20,
      "Ekkatuthangal Metro Station": 25,
    },
    "Vadapalani Metro Station": {
      "Koyambedu Metro Station": 7,
      "Arumbakkam Metro Station": 10,
      "Ashok Nagar Metro Station": 9,
      "Ekkatuthangal Metro Station": 5,
      "Alandur Metro Station": 18,
    },
    "Ashok Nagar Metro Station": {
      "Koyambedu Metro Station": 14,
      "Arumbakkam Metro Station": 8,
      "Vadapalani Metro Station": 9,
      "Ekkatuthangal Metro Station": 10,
      "Alandur Metro Station": 16,
    },
    "Ekkatuthangal Metro Station": {
      "Arumbakkam Metro Station": 10,
      "Vadapalani Metro Station": 5,
      "Ashok Nagar Metro Station": 10,
      "Alandur Metro Station": 12,
    },
    "Alandur Metro Station": {
      "Vadapalani Metro Station": 17,
      "Ashok Nagar Metro Station": 16,
      "Ekkatuthangal Metro Station": 12,
      "Nanganallur Road Metro Station": 30,
    },
  };
  const [isOpenPopup,setIsOpenPopup] = useState(false);
  const [sourceStation, setSourceStation] = useState('');
  const [destinationStation,setDestinationStation] = useState('');
  const [fare,setFare] = useState(null);
  const[route,setRoute] = useState([]);

  
  const calculate = ()=>
  {
    //const source = sourceStation;
    //const destination = destinationStation;
    if(sourceStation==='' || destinationStation==='')
    {
      if(sourceStation==='' || sourceStation==='Select Source Station')
      {
        alert("Please enter a source station");
        return;
      }
      if(destinationStation===''||destinationStation==='Select Destination Station')
      {
        alert("Please enter a destination station");
        return;
      }
    }
    const stations = Object.keys(metroStations);
    const INF = Number.MAX_SAFE_INTEGER;

    // To initalize all node with infinity since we don't know the distance from source node initally and storing in distance dict -
    const distances  = {};
    stations.forEach((station) => (distances[station] = INF));
    // source node to source node distance will be zero
    distances[sourceStation] = 0;
    // mainitaning visited dict to check whether node visited or not
    const visited = {};
    const path = {};
    while(true)
    {
      let currentStation = null;
    // Find the nearest station , intially it finds the source station
    for(let i=0;i<stations.length;i++)
      {
        if(
          !(visited[stations[i]]) &&
           ( currentStation===null || distances[stations[i]] < distances[currentStation] ) )
        {
          currentStation = stations[i];
        }
      }

      if(currentStation===null || distances[currentStation]===INF)
      {
        break;
      }
      visited[currentStation] = true;

      /* wrt to dijkstra algorithm , we will be updating the neighbouring station distance  of currentStation-
            * inital -
            * for the currentstation it is computing its nerighbour node 's distance from currentstation for each neighbour and  updates infinity to val in distance MAT
      */
      for(const neighbour in metroStations[currentStation])
      {
const distance =
        distances[currentStation] + metroStations[currentStation][neighbour];  

        if (distance < distances[neighbour]) {
          // initally all distance will be infinity , so the adjacent distance will be added and updated;
          distances[neighbour] = distance;
          path[neighbour] = currentStation;
        }
      }
    }
    // IThe path variable is used to keep track of the shortest path from the source station to any other station in the metro network
    const routes = [];
    let current = destinationStation;
    // starting from destination , retrieving its path from path and adding it to beignning of routes arr and so on... until the source is found
    while(current!==sourceStation)
    {
      // unshift  - adds element to beignning of routes arr.
      routes.unshift(current);
      current = path[current];
    }
    // finally adding source to beignning of array.
    routes.unshift(sourceStation);
    setRoute(routes.join(' -> '));
    setFare(`₹ ${distances[destinationStation]}`);
    setIsOpenPopup(true);

  };
  return (
    <div className={styles.container}>
    <h1 className={styles.h1}>MetroNav - Navigating Metro Networks</h1>
    <div className={styles.form}>
      <label className={styles.label} id="j1" htmlFor="source">Enter Source:
      </label>
      <select
        className={styles.select}
        value={sourceStation}
        onChange={(e) => setSourceStation(e.target.value)}
      >
        <option>Select Source Station</option>
        {Object.keys(metroStations).map((station) => (
          <option key={station} value={station}>
            {station}
          </option>
        ))}
      </select>
      <label className={styles.label} id="j2" htmlFor="destination">
        Enter Destination:
      </label>
      <select
        className={styles.select}
        value={destinationStation}
        onChange={(event) => setDestinationStation(event.target.value)}
      >
        <option>Select Destination Station</option>
        {Object.keys(metroStations).map((station) => (
          <option key={station} value={station}>
            {station}
          </option>
        ))}
      </select>
      <button className={styles.button} onClick={calculate}>
        Compute
      </button>
      {isOpenPopup && <Popup fare={fare} route={route} setIsOpenPopup={setIsOpenPopup} />}
    </div>
  </div>

  );
}
export default Home;
