import * as React from 'react';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import Canidates from './Canidates';
import Voting from './Voting';
import Results from './Results';

export default function Voting_Navbar() {
  return (
    <Tabs defaultValue={1} className='mb-0'>
      <TabsList className=" bg-teal-600  flex font-sans items-center justify-center content-between min-w-tabs-list shadow-lg ">
        <Tab
          slotProps={{
            root: ({ selected, disabled }) => ({
              className: `font-sans ${
                selected
                  ? 'text-black bg-zinc-100'
                  : ' text-white bg-transparent hover:bg-zinc-100 hover:text-black'
              } ${
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
            }),
          }}
          value={1}
        >
          Candidates
        </Tab>
        <Tab
          slotProps={{
            root: ({ selected, disabled }) => ({
              className: `font-sans ${
                selected
                  ? 'text-black bg-zinc-100'
                  : ' text-white bg-transparent  hover:bg-zinc-100 hover:text-black'
              } ${
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
            }),
          }}
          value={2}
        >
          Vote
        </Tab>
        <Tab
          slotProps={{
            root: ({ selected, disabled }) => ({
              className: `font-sans ${
                selected
                  ? 'text-black bg-zinc-100'
                  : ' text-white bg-transparent hover:bg-zinc-100 hover:text-black'
              } ${
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              } text-sm font-bold w-full p-2 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
            }),
          }}
          value={3}
        >
          Results
        </Tab>
      </TabsList>
      <TabPanel className="w-full font-sans text-sm" value={1}>
        <Canidates/>
      </TabPanel>
      <TabPanel className="w-full font-sans text-sm" value={2}>
        <Voting/>
      </TabPanel>
      <TabPanel className="w-full font-sans text-sm" value={3}>
        <Results/>
      </TabPanel>
    </Tabs>
  );
}
