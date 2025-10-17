import { Box, Grid } from '@mui/material';
import React from 'react';
import { LineChart } from '../components/Graphs/LineChart';
import { TrioBarChart } from '../components/Graphs/TrioBarChart';
import BlackRockHoldings from '../components/Crypto/BlackRockHoldings';
import { FilterHeader } from '../components/Filtering/FilterHeader';

import { septemberLosses, octoberLosses, augustLosses} from '../helpers/mockedDB/mockedDB';



export const HomePage = (): JSX.Element => {

    // TODO:
//     const openFilterOverlay = () => setFilterBar(true);
//     const closeFilterOverlay = () => setFilterBar(false);
//   const [openFilterBar, setFilterBar] = useState(false);
//      <FilterHeader isOpen={openFilterBar} onClose={closeFilterOverlay} />

    return (
        <Box p={5}>
          <BlackRockHoldings />
          <h1>Loss of the armed forces of the Russian Federation during the hostilities against Ukraine</h1>
            <Grid container spacing={4}>
            <Grid item xs={5}>
                <LineChart monthData={[augustLosses, septemberLosses, octoberLosses]} label="Loss of Russian personnel" legendStatus = {true}/>
              </Grid>
              <Grid item xs={5}>
                <TrioBarChart monthData={[augustLosses, septemberLosses, octoberLosses]} legendStatus = {true} />
              </Grid>
            </Grid>
        </Box>
      );
    };

    export default HomePage;