import { Component } from 'react';
import {
  Input,
  Label,
  SearchButton,
  SearchForm,
  StyledHeader,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = evt => {
    this.setState({ inputValue: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.inputValue);
  };

  render() {
    return (
      <StyledHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
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
