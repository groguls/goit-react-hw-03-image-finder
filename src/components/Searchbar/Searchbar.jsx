import { Component } from 'react';
import { TbPhotoSearch } from 'react-icons/tb';
import {
  Input,
  Label,
  SearchButton,
  SearchForm,
  StyledHeader,
} from './Searchbar.styled';
import toast from 'react-hot-toast';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = evt => {
    this.setState({ inputValue: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { inputValue } = this.state;
    if (inputValue === '') {
      toast('Please check your search query', {
        icon: '🔎',
      });
      return;
    }
    this.props.onSubmit(inputValue);
  };

  render() {
    return (
      <StyledHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <TbPhotoSearch size={32} />
            <Label>Search</Label>
          </SearchButton>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </StyledHeader>
    );
  }
}
