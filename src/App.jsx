import React, { useState } from 'react';
import {
  Container,
  TextInput,
  NumberInput,
  MultiSelect,
  Button,
  NativeSelect,
  Title,
  Notification,
  Space,
} from '@mantine/core';


const factions = ['Foundation', 'GOC', 'Counter', 'Anomalies', "SerpentHand", "TRT"]

const webhookUrl = 'https://discord.com/api/webhooks/1371495643625029793/8v-sn2NuqwCPfULAsUJjNNeAWM_n66bVcyeOWzz8WTQeDq24PakGyiCmvhu0uOb7jaG4';

export default function App() {
  const [writer, setWriter] = useState('');
  const [winner, setWinner] = useState('');
  const [points, setPoints] = useState(0);
  const [winner2, setWinner2] = useState('');
  const [points2, setPoints2] = useState(0);
  const [spawnwaves, setSpawnwaves] = useState([]);
  const [scps, setScps] = useState([]);
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    const log = {
      writer,
      winner,
      points,
      winner2,
      points2,
      spawnwaves,
      scps,
      timestamp: Date.now(), // optional
    };

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: 'New Log:', embeds: [{ description: '```\n' + JSON.stringify(log, null, 2) + '\n```' }] }),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      
      setStatus('error');
    }
  };

  return (
    <Container size="sm">
      <Title mb="md">Submit SCP Log</Title>
       <TextInput label="Roblox Username" value={writer} onChange={e => setWriter(e.currentTarget.value)} required />
      <NativeSelect
      label="Winner"
      onChange={e => setWinner(e.currentTarget.value) }
      data={factions}/>
      <NumberInput label="Winner Points" value={points} onChange={setPoints} required />
      <NativeSelect
      label="Second Place"
      onChange={e => setWinner2(e.currentTarget.value) }
      data={factions}/>
      <NumberInput label="Second Place Points" value={points2} onChange={setPoints2} required />

      <MultiSelect
        label="Spawnwaves"
        data={factions}
        value={spawnwaves}
        onChange={setSpawnwaves}
        searchable
      />
      <MultiSelect
        label="SCPs"
        data={['035', '079', '096', '173', '106', '966', '280', '457', '049', '076']}
        value={scps}
        onChange={setScps}
        searchable
      />
      <Space h="md" />
      <Button onClick={handleSubmit}>Submit to Discord</Button>

      {status === 'success' && (
        <Notification color="green" title="Success" mt="md">
          Log submitted!
        </Notification>
      )}
      {status === 'error' && (
        <Notification color="red" title="Error" mt="md">
          Submission failed.
        </Notification>
      )}
    </Container>
  );
}
