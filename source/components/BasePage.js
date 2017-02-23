import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import appStore from '../store';
import actions from '../actions';

function BasePage(mapStateToProps, mapDispatchToProps) {

	return function(Cmp) {

		class PageWithRedux extends Component {
			static async getInitialProps (context) {
				context.actions = bindActionCreators(actions, context.store.dispatch);

				const props = await Cmp.getInitialProps(context);
				
				return {
					...props,
				};
			}

			render() {
				return (
					<Cmp {...this.props} />
				);
			}
		}
		return withRedux(appStore, mapStateToProps, mapDispatchToProps)(PageWithRedux);
	}
}

export default BasePage;