import React from 'react';
// import Modal from './modal';
import Modal from 'react-modal';
import ProfilePosts from './profile_posts/profile_posts';
import CreatePostForm from './profile_posts/create_post_form';
import { withRouter } from 'react-router';
import Style from './modal_style';
import ProfilePicForm from './profile_forms/profile_pic_form';


class Profile extends React.Component {
  constructor(props){
    super(props);
    //jshint ignore: start
    this.state = {
      imageFile: '',
      modalOpen: false
    };
    //jshint ignore: end
    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addPost = this.addPost.bind(this);
    this.toggFollow = this.toggFollow.bind(this);
    this.editProfilePic = this.editProfilePic.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.logoutModal = this.logoutModal.bind(this);
    this.form;
  }

  shouldComponentUpdate(nextProps) {
    return Boolean(nextProps.currentUser);
  }

  closeModal(){

    this.setState({ modalOpen: false });
  }

  openModal(){
    this.setState({ modalOpen: true });
  }

  componentDidMount() {
    const user_id = this.props.router.params.id;
    this.props.fetchUser(user_id).then((user) => console.log(this.props));
    this.props.getUserPosts(user_id);

  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.params.id !== this.props.params.id){
        const user_id = this.props.router.params.id;
        this.props.fetchUser(user_id).then((user) => console.log(this.props));
        this.props.getUserPosts(user_id);
      }
  }

  editProfilePic(e) {
    this.form = <ProfilePicForm handleSubmit={this.handleSubmit} updateFile={this.updateFile} />
    e.preventDefault();
    if (this.props.user.id === this.props.currentUser.id){

      this.openModal();
    }
  }

  addPost(e) {

    e.preventDefault();
    this.form = <CreatePostForm makeAPost={ this.props.makeAPost }
                    closeModal={ this.closeModal }/>
    this.openModal();
    // document.getElementsByClassName('modal-2')[0].style.visibility = "visible";
  }

  toggFollow() {
    this.props.toggleFollow(this.props.user.id);
  }

  updateFile (e) {
    const file = e.currentTarget.files[0];
    this.setState({ imageFile: file }, () =>{
      console.log(this.state);
    });

  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('user[avatar]', this.state.imageFile);
    this.props.updateProfilePic(this.props.user.id, formData);
    this.closeModal();
    // document.getElementsByClassName('modal-1')[0].style.visibility = "hidden";
    e.currentTarget.children[0].value = '';
  }

  handleLogOut() {

    this.props.logOut().then(() => this.props.router.push('/log_in'));

  }

  logoutModal() {
    this.openModal();
    this.form = <button
      onClick={ this.handleLogOut }
      className='log-out-button'>Log out</button>
  }

  render() {
    if (this.props.user === null){
      //jshint ignore: start
      return <div></div>;
      //jshint ignore: end
    }
      //jshint ignore: start
      let ActionButton;
      if (this.props.user.id === this.props.currentUser.id){
        ActionButton = <button onClick={ this.addPost }
            className='follow-button add-button'>Add post</button>;
      } else {
        let fButtonText = 'Follow';
        if (this.props.user.followed){
          fButtonText = 'Following';
        }
        let fButtonClass = `follow-button ${fButtonText}`;
        ActionButton = <button onClick={ this.toggFollow }
            className={fButtonClass}>{fButtonText}</button>;
      }

      document.getElementById('title-el').innerHTML = `${this.props.user.username}`;

      //jshint ignore: end
      return(
        //jshint ignore: start
        <article className='profile-container group'>
          <Modal style={Style} isOpen={this.state.modalOpen} contentLabel={'hello'} >
            <button onClick={this.closeModal} className='modal-button'>x</button>
            {this.form}
          </Modal>




          <header className='profile-header'>
            <div className='picture-container group'>
              <button onClick={this.editProfilePic} className='picture-button'>
                <img src={ this.props.user.avatar_url } className='picture'/>
              </button>
            </div>
            <div className='detail-container group'>
              <div className='user-detail'>
                <h1>{this.props.user.username}</h1>
                <div className="follow-button-container">
                  {ActionButton}
                </div>
                <button onClick={ this.logoutModal} className='logout-button'>
                  <img src={ window.logoutButton } />
                </button>
              </div>
              <ul className='stats'>
                <li><span>{this.props.user.post_count}</span> posts</li>
                <li><span>{this.props.user.follows_count}</span> following</li>
                <li><span>{this.props.user.followers_count}</span> followers</li>
              </ul>
            </div>
            </header>
          <ProfilePosts posts={ this.props.posts.posts } />
        </article>
        //jshint ignore: end
      );
    }
}

export default Profile;


// onClick={ this.editProfilePic }

// classId={'modal-1'} className='profile-modal'

// <Modal classId={'modal-2'} className='profile-modal'>
//   <CreatePostForm makeAPost={ this.props.makeAPost } />
// </Modal>


// <div className='form-container group'>
//   <h1>SELECT PROFILE PICTURE</h1>
//   <form onSubmit={ this.handleSubmit } className='upload-form'>
//     <input type='file' onChange={ this.updateFile } />
//     <button type='submit'>SUBMIT</button>
//   </form>
// </div>
