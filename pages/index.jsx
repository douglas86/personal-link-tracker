import useSWR from 'swr';
import { CardGroup, Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const Home = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data } = useSWR('/api/AWS/s3', fetcher);

    console.log('data', data);

    const listCategories =
        data !== undefined
            ? Object.entries(data.data).map(([k, v]) => (
                  <Link href="/" key={k} passHref>
                      <Card style={{ width: '10rem' }}>
                          <Card.Img
                              variant="top"
                              src={`data:image/jpeg;base64,${v.Body}`}
                          />
                          <Card.Body>
                              <Card.Title>Card Title</Card.Title>
                              <Card.Text>{v.desc}</Card.Text>
                          </Card.Body>
                      </Card>
                  </Link>
              ))
            : null;

    return (
        <div>
            <h1>This is the home page</h1>
            <div>
                <CardGroup>{listCategories}</CardGroup>
            </div>
        </div>
    );
};

export default Home;
