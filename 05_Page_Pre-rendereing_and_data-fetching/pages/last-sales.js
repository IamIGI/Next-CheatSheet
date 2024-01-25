import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalePage(props) {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    'https://next-learning-process-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales); // if not setSales we would see data from getStaticProps
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       'https://next-learning-process-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) return <p>Failed to load</p>;

  if (!data && !sales) return <h1>Loading...</h1>;

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return fetch(
    'https://next-learning-process-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      transformedSales.push({
        id: 0,
        username: 'igi',
        volume: 999,
      });

      return {
        props: {
          sales: transformedSales,
        },
        revalidate: 10,
      };
    });
}

export default LastSalePage;
