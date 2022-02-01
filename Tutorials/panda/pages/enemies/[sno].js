import {useRouter} from 'next/router';

export default function enemies() {
  // Example of dynamic routes
  const router = useRouter();
  const {sno} = router.query;
  return <div>Info: {sno}</div>;
}

