import { makeStyles, tokens } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
interface INoItem{
    type: string
}

const useStyles = makeStyles({
    noItems:{marginTop: '10px',boxShadow: tokens.shadow2}
});
function NoItem(props:INoItem) {
    const styles = useStyles();
    return (
    <Alert className={styles.noItems} intent='info'>No {props.type}</Alert>
  )
}

export default NoItem