import { Component } from 'react';
import { Gallery, GlobalStyle, PageWrapper } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from './pixabayService';
import { ThreeDots } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: null,
    loading: false,
    isMore: false,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { query, page } = this.state;
    const prevQuery = prevState.query.split('/').pop();
    const normalizedQuery = query.split('/').pop();
    console.log(normalizedQuery);
    console.log(prevQuery);

    if (normalizedQuery === '') {
      toast('Please check your search query', {
        icon: '🔎',
      });
      return;
    }

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true, error: false, isMore: false });
        const images = await fetchImages(normalizedQuery, page);
        const totalImgs = images.totalHits;
        const totalPages = totalImgs / 12;

        if (totalImgs <= 0) {
          toast(
            'Sorry, there are no images matching your search query. Please try again.',
            {
              icon: '😔',
            }
          );
          return;
        }

        prevState.query !== query
          ? this.setState({
              images: images.hits,
            })
          : this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
            }));

        if (page >= Math.ceil(totalPages)) {
          toast("We're sorry, but you've reached the end of search results.", {
            icon: '🔎',
          });
          this.setState({ isMore: false });
          return;
        }

        if (totalPages > 1) {
          this.setState({ isMore: true });
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

  onSearch = value => {
    const query = `${Date.now()}/${value.trim()}`;
    this.setState({ query, page: 1 });
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
        {loading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ justifyContent: 'center' }}
            wrapperClassName=""
            visible={true}
          />
        )}
        {isMore && <Button onLoadMore={this.onLoadMore} />}
      </PageWrapper>
    );
  }
}
