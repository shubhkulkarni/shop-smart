import { FluentProvider, teamsDarkTheme, teamsLightTheme, webLightTheme } from '@fluentui/react-components'
import './App.css'

import Home from './pages/Home'
import Router from './router/router'
import { RootState } from './redux/store'
import { useSelector } from 'react-redux'
import { Themes } from './constants/constants'

function App() {

  const light = useSelector((state: RootState) => state.settings.theme === Themes.light);
  return (
    <>
    <FluentProvider theme={light ? webLightTheme : teamsDarkTheme}>
     <Router/>
     </FluentProvider>
    </>
  )
}

export default App
