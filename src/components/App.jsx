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
    error: false,
    loading: false,
    isMore: false,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true, error: false, isMore: false });
        const images = await fetchImages(query, page);
        console.log(images);
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

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
        }));

        if (totalPages > 1) {
          this.setState({ isMore: true });
        }

        // if (page > 1) {
        //   this.smoothScrolling();
        // }

        if (page >= Math.ceil(totalPages)) {
          toast("We're sorry, but you've reached the end of search results.", {
            icon: '🔎',
          });
          return;
        }
      } catch (error) {
        // this.setState({ error: true });
        this.onError();
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  onSearch = query => {
    this.setState({ query, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // onLargeImage = evt => {
  //   console.log(evt);
  //   this.setState({ largeImage: evt.target.src, isModalOpen: true });
  // };

  onError = () =>
    toast.error('Oops! Something went wrong! Try reloading the page!');

  smoothScrolling = () => {
    // const { height: cardHeight } = document
    //   .querySelector('ul')
    //   .firstElementChild.getBoundingClientRect();

    // console.log(cardHeight);

    // window.scrollBy({
    //   top: cardHeight * 2,
    //   behavior: 'smooth',
    // });

    document.querySelector('ul').scrollIntoView({
      behavior: 'smooth',
      block: 'end',
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
