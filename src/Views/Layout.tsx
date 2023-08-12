import { Body1, Link, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import React, { useCallback, useState } from 'react';
import AppDrawer from '../components/Drawer/Drawer';
import Navbar from '../components/Navbar/Navbar';
import { Widths } from '../constants/constants';
import CartDrawer from './CartDrawer';
interface ILayoutprops extends React.PropsWithChildren {

}
const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight:'100vh'
    },
    main: {
        ...shorthands.flex(1),
        maxWidth:Widths.xxl,
        width: '100%',
        ...shorthands.padding(tokens.spacingVerticalXXL),
    },
    footer: {
        ...shorthands.padding('20px'),
        // backgroundColor: tokens.colorNeutralBackground1Hover,
        boxShadow: tokens.shadow4,
        width:'100%',
        textAlign:'center'
    }
});
const Layout: React.FC<ILayoutprops> = ({ children }) => {
    const styles = useStyles();
    const [drawerOpen,setDrawerOpen] = useState(false);
    const onCartClick = useCallback(()=>{
        setDrawerOpen(prev =>!prev);
    },[]);
    return (
        <div >
            <Navbar onCartClick={onCartClick}/>
            <div className={styles.container}>
            <main className={styles.main}>
                {children}
                <AppDrawer isOpen={drawerOpen} setIsOpen={setDrawerOpen} title="Your cart items">
                    <CartDrawer/>
                </AppDrawer>
            </main>
            <footer className={styles.footer}>
                <Body1>Made with ❤️ by  <Link href="https://github.com/shubhkulkarni" target='_blank' inline>@shubhkulkarni</Link></Body1>
            </footer>
            </div>
        </div>
    )
}

export default Layout