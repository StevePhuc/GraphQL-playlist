import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';


class AddBook extends Component {
    displayAuthors() {
        let data = this.props.getAuthorsQuery;
        if (data.loading) {
            return <option>Loading Authors..</option>
        } else {
            return data.authors.map(author => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }

    state = {
        name: '',
        genre: '',
        authorId: ''
    }


    render() {

        const submitForm = (e) => {
            e.preventDefault();
            this.props.addBookMutation({
                variables: {
                    name: this.state.name,
                    genre: this.state.genre,
                    authorId: this.state.authorId
                }
            });

        }

        return (
            <form id="add-book" onSubmit={submitForm} >
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={e => {
                        this.setState({ name: e.currentTarget.value })
                    }} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={e => {
                        this.setState({ genre: e.currentTarget.value })
                    }} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({ authorId: e.target.value })} >
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>

            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook);
