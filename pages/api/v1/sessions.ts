import { NextApiHandler } from 'next';

const sessions: NextApiHandler = async (req, res) => {
    
  res.setHeader('Content-Type', 'application/json');
  res.write('');
  res.end();
};

export default sessions;
