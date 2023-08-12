import { FluentProvider, teamsDarkTheme, webLightTheme } from '@fluentui/react-components'
import './App.css'

import { useSelector } from 'react-redux'
import { Themes } from './constants/constants'
import { RootState } from './redux/store'
import Router from './router/Router'

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
