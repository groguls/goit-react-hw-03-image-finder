import { Component } from 'react';
import { Gallery, GlobalStyle, PageWrapper } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from './pixabayService';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: null,
    loading: false,
    isMore: false,
    randomId: '',
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { query, page, randomId } = this.state;

    if (
      prevState.query !== query ||
      prevState.page !== page ||
      prevState.randomId !== randomId
    ) {
      try {
        this.setState({ loading: true, error: false, isMore: false });
        const images = await fetchImages(query, page);
        const totalImgs = images.totalHits;
        const totalPages = totalImgs / 12;
        const isMore = page < Math.ceil(totalPages);

        if (totalImgs <= 0) {
          toast(
            'Sorry, there are no images matching your search query. Please try again.',
            {
              icon: '😔',
            }
          );
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          isMore,
        }));

        if (!isMore) {
          toast("We're sorry, but you've reached the end of search results.", {
            icon: '🔎',
          });
        }
      } catch (error) {
        this.onError();
      } finally {
        this.setState({ loading: false });
      }
    }

    if (page > 1) {
      this.smoothScrolling();
    }
  };

  onSearch = query => {
    this.setState({ query, page: 1, images: [], randomId: Date.now() });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onError = () =>
    toast.error('Oops! Something went wrong! Try reloading the page!');

  smoothScrolling = () => {
    const { height: cardHeight } = document
      .querySelector('li')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };

  render() {
    const { loading, images, isMore } = this.state;
    return (
      <PageWrapper>
        <Gallery>
          <GlobalStyle />
          <Toaster position="top-right" />
          <Searchbar onSubmit={this.onSearch} />

          {images.length > 0 && <ImageGallery images={images} />}
        </Gallery>
        {loading && <Loader />}
        {isMore && <Button onLoadMore={this.onLoadMore} />}
      </PageWrapper>
    );
  }
}
