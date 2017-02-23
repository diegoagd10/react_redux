import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import reduxActions from '../source/actions';
import BasePage from '../source/components/BasePage';

class Home extends Component {

	static async getInitialProps (context) {
		await context.actions.postsNextPage();
		return {};
	}

	constructor(props) {
		super(props);
		
		this.state = { 
			error: false,
			loading: false,
		};

		this.handleOnClick = this.handleOnClick.bind(this);
	}

	componentDidMount() {
		if(this.props.posts.size === 0) this.fetchPosts();		
	}

	handleOnClick() {
		this.fetchPosts();
	}

	async fetchPosts() {
		this.setState({ loading: true }, async () => {
			try {
				await this.props.actions.postsNextPage();
				this.setState({ loading: false });
			} catch (error) {
				this.setState({ 
					error: true,  
					loading: false, 
				});
			}
		});
	}

	render() {
		return (
			<main>
				<h1>Using Next.js with Redux</h1>
				<button onClick={this.handleOnClick}>Load</button>
				<section>
					{
						this.state.loading ? 
							(
								<h2>Loading</h2>
							) :
							(
								this.props.posts
									.map(post => 
										<div key={post.get('id')}>
											<span>{post.get('title')}</span>
											<br />
										</div>)
									.toArray()
							)
					}
				</section>
			</main>
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: state.get('posts').get('entities'),
		page: state.get('posts').get('page'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(reduxActions, dispatch),
	};
}

export default BasePage(mapStateToProps, mapDispatchToProps)(Home);