import About from '@pages/About'
import Addresses from '@pages/Addresses'
import AdminPage from '@pages/AdminPage'
import Boquet_page from '@pages/Boquet_page'
import Main_catalog from '@pages/Main_catalog'
import Reviews from '@pages/Reviews'

import { isUserFetchingState } from '@scripts/atoms/authState'
import useAuth from '@scripts/custom_hooks/useAuth'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'
import { RecoilRoot, useRecoilState } from 'recoil'
import reportWebVitals from './reportWebVitals'

import '@fonts/fonts.scss'
import '@globalStyles/globals.scss'
import '@globalStyles/normalize.scss'
import News from './pages/News'

const ProcessAuth = props => {
	const [isUserFetching, setIsUserFetching] =
		useRecoilState(isUserFetchingState)

	const { initUser, isAuthorised } = useAuth()

	useEffect(() => {
		if (!isUserFetching && !isAuthorised) {
			setIsUserFetching(true)
			initUser()
			setIsUserFetching(false)
		}
	}, [isAuthorised, isUserFetching])

	return props.children
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<ProcessAuth>
				<Router>
					<Routes>
						<Route path='/' element={<Navigate to='/catalog' />} />
						<Route path='/catalog' element={<Main_catalog />} />
						<Route path='/catalog/:link' element={<Boquet_page />} />
						<Route path='/addresses' element={<Addresses />} />
						<Route path='/about' element={<About />} />
						<Route path='/reviews' element={<Reviews />} />
						<Route path='/news' element={<News />} />
						<Route path='/admin' element={<AdminPage />} />
					</Routes>
				</Router>
			</ProcessAuth>
		</RecoilRoot>
	</React.StrictMode>
)

reportWebVitals()
