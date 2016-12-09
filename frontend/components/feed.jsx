import React from 'react';
import Posts from './posts';
import FeedHeader from './feed_header';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    this.props.getAllPosts(this.props.currentUser);
  }

  handleLogOut() {

    this.props.logOut().then(() => this.props.router.push('/'));
  }

  render() {
    return (
      <div>
        <FeedHeader />
        <button onClick={ this.handleLogOut }>Log out</button>
        <section className='content-main group'>
          <Posts posts={ this.props.posts.posts }/>
        </section>
      </div>
    );
  }
}

export default Feed;
