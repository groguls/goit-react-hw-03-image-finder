import { Component } from 'react';
import { GlobalStyle, PageWrapper } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
  };

  onSearch = searchQuery => {
    console.log(searchQuery);
  };

  render() {
    return (
      <PageWrapper>
        <GlobalStyle />
        <Searchbar onSubmit={this.onSearch} />

        <Button />
      </PageWrapper>
    );
  }
}
