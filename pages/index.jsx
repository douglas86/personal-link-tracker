// import prisma from '../lib/prisma';
import { PrismaClient } from '@prisma/client';
import useSWR from 'swr';

const prisma = new PrismaClient();

const Home = ({ categories }) => {
    const listCategories = JSON.parse(categories).map((c, i) => (
        <div key={i}>
            <h1>{c.image}</h1>
        </div>
    ));

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data } = useSWR('/api/AWS/s3', fetcher);
    console.log('cat', JSON.parse(categories));
    console.log('data', data);
    return (
        <div>
            <h1>This is the home page</h1>
            <div>{listCategories}</div>
        </div>
    );
};

export const getStaticProps = async () => {
    const categories = await prisma.category.findMany();

    return {
        props: { categories: JSON.stringify(categories) },
    };
};

export default Home;
