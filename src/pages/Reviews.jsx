import '@styles/pages/Reviews.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { simpleGet, apiTags } from '@api/simpleGet'
import useSWR from 'swr';


function Reviews() {
  const { data: reviews, error: rError, isLoading: rIsLoading } = useSWR(apiTags.getReviews, simpleGet);

  if (!rError) {
    console.log(reviews)
  }
  return (
    <>
      <Header active={2} />
      <main className="reviews block-normalizer main-block">
        
      </main>
      <Footer />
    </>
  );
}

export default Reviews;
