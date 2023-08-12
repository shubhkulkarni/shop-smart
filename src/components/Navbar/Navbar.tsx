import { Button, CounterBadge, Input, Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger, makeStyles, shorthands, tokens } from "@fluentui/react-components"
import { AppsListDetail24Regular, BuildingShop24Regular, Cart24Regular, Person24Regular, Search24Regular, ShoppingBag24Regular, WeatherMoon24Regular, WeatherSunny24Regular } from "@fluentui/react-icons"
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../../mock/products";
import { Themes } from "../../constants/constants";
import { toggleTheme } from "../../redux/slices/settings";
import { useCallback, useState } from "react";

interface INavbarProps {
    onCartClick: () => void;
}

function Navbar(props: INavbarProps) {
    const { onCartClick } = props;
    const styles = useStyles();
    const cartCount = useSelector((state: RootState) => state?.cart?.cart.length);
    const light = useSelector((state: RootState) => state?.settings?.theme === Themes.light);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query,setQuery] = useState("");
    const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        setQuery(e.target.value);
    },[]);
    const onKeyPress = useCallback((event: React.KeyboardEvent<HTMLElement>)=>{
        if(event.key==="Enter"){
            navigate(`/search/${query || 'all'}`);
        }
    },[navigate,query]);
    return (
        <div className={styles.navbar}>
            <Link to={"/"} className={styles.brandLink}>
                <div className={styles.brand}>
                    <ShoppingBag24Regular />
                    <div className={styles.brandName}>ShopSmart</div>
                </div>
            </Link>
            <div className={styles.search}>
                <Input onKeyDown={onKeyPress} placeholder="Search products, categories etc..." contentBefore={<Search24Regular />} value={query} onChange={onSearchChange} appearance="filled-darker" className={styles.searchInput} />
            </div>
            <div className={styles.navItems}>
                <Link to="/featured"><Button className={styles.navItem} icon={<BuildingShop24Regular />} appearance="subtle">Featured</Button></Link>
                <Menu>
                    <MenuTrigger disableButtonEnhancement>
                        <MenuButton appearance="subtle" icon={<AppsListDetail24Regular />}>
                            Categories
                        </MenuButton>
                    </MenuTrigger>

                    <MenuPopover>
                        <MenuList>
                            {getCategories().map(category => {
                                return <MenuItem key={category} onClick={() => navigate(`/category/${category}`)}>{category}</MenuItem>
                            })}
                        </MenuList>
                    </MenuPopover>



                </Menu>
                <Button className={styles.cart} icon={<Cart24Regular />} appearance="subtle" onClick={onCartClick}>
                    
                    <CounterBadge count={cartCount} style={{ position: 'absolute', top: 0, right: 15 }} />
                </Button>

                <Button
                    className={styles.cart}
                    icon={light ? <WeatherMoon24Regular /> : <WeatherSunny24Regular />}
                    appearance="subtle"
                    onClick={()=> dispatch(toggleTheme())}
                />

                <Menu>
                    <MenuTrigger disableButtonEnhancement>

                        <MenuButton icon={<Person24Regular />} appearance="subtle" className={styles.navItem} />

                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            {getCategories().map(category => {
                                return <MenuItem key={category} >{category}</MenuItem>
                            })}
                        </MenuList>
                    </MenuPopover>
                </Menu>


            </div>
        </div>
    )
}

export default Navbar

const useStyles = makeStyles({
    navbar: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...shorthands.padding('14px'),
        boxShadow: tokens.shadow4,
        position: 'sticky',
        top: 0,
        zIndex: 11,
        backgroundColor: tokens.colorNeutralBackground1
    },
    brand: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: tokens.colorNeutralForeground2
    },
    search: {
        ...shorthands.flex(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navItems: {},
    navItem: { ...shorthands.margin(0, '14px') },
    brandName: {
        fontSize: '24px',
        marginLeft: '10px',
        fontWeight: 'bold',
        
    },
    cart: {
        // ...shorthands.margin(0,'10px'),
        position: 'relative',
        // minWidth: 'unset',
        // ...shorthands.margin(0)
    },
    badge: {},
    searchInput: {
        width: '50%',

    },
    brandLink:{
        ...shorthands.textDecoration('none')
    }
});

const getCategories = () => {
    return [...new Set(products.map(i => i.category.name))]
}