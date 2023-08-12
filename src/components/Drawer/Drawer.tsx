import { Button, makeStyles, shorthands } from '@fluentui/react-components'
import { Drawer, DrawerBody, DrawerHeader, DrawerHeaderTitle } from '@fluentui/react-components/unstable'
import { Dismiss24Regular } from '@fluentui/react-icons'
import React from 'react'

interface IAppDrawerProps extends React.PropsWithChildren{
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    title: string
}
const useStyles = makeStyles({
    root: {
        ...shorthands.border("2px", "solid", "#ccc"),
        ...shorthands.overflow("hidden"),
        display: "flex",
        height: "480px",
        backgroundColor: "#fff",
      },
});
function AppDrawer(props: IAppDrawerProps) {
    const {setIsOpen,isOpen,children,title} = props;
  return (
   
    <Drawer
    separator
    open={isOpen}
    onOpenChange={(_, { open }) => setIsOpen(open)}
    position='right'
    size='medium'
  >
    <DrawerHeader>
      <DrawerHeaderTitle
        action={
          <Button
            appearance="subtle"
            aria-label="Close"
            icon={<Dismiss24Regular />}
            onClick={() => setIsOpen(false)}
          />
        }
      >
        {title}
      </DrawerHeaderTitle>
    </DrawerHeader>

    <DrawerBody>
      {children}
    </DrawerBody>
  </Drawer>
  )
}

export default AppDrawer