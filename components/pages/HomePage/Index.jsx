import { useContext } from 'react';

import { HomeContext } from '../PageContext/HomeContext';
import Home from './Home';
import Card from './Card';
import useSWR from 'swr';

const Index = () => {
  const context = useContext(HomeContext);
  const { component } = context.state;

  // const fetcher = (url) => fetch(url).then((res) => res.json());
  // const { data } = useSWR('/api/link', fetcher);
  //
  // console.log('data', data);
  //
  // const categoryTitle = 'Prisma';
  // let arr = [];
  //
  // let d =
  //   data !== undefined
  //     ? Object.entries(data.data).map(([k, v]) => {
  //         return v.categoryNames.filter((i) => {
  //           if (i === categoryTitle) {
  //             arr.push(v);
  //           }
  //           // return i === categoryTitle ? true : false;
  //         });
  //       })
  //     : null;
  //
  // console.log('d', d);
  // console.log('arr', arr);

  // const arr = ['Nodejs', 'Nextjs'];
  // const categoryTitle = 'Nodejs';
  //
  // let i = arr.filter((item) => {
  //   return item === categoryTitle ? true : false;
  // });
  //
  // console.log('i', i);

  const isComponent = () => {
    switch (component) {
      case 'Card':
        return <Card />;
      default:
        return <Home />;
    }
  };

  return <>{isComponent()}</>;
};

export default Index;
