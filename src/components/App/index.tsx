import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { GlobalProvider } from '../../context/Global'

import { Header } from '../Header'
import { ReactComments } from '../../components/Home'
import { NotFound } from '../../components/NotFound'

import '../../style/index.css'
import '../../style/App.css'

export const App = () =>
	<Router>
		<Header />
		<Switch>
			<Route exact path="/">
				<GlobalProvider>
					<ReactComments />
				</GlobalProvider>
			</Route>
			<Route component={NotFound} />
		</Switch>
	</Router>