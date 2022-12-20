import { useState } from "react";
import { createStyles, Navbar, Text, Flex } from "@mantine/core";
import {useNavigate, Link,Outlet } from "react-router-dom";

import {
  IconClipboardList,
  IconAddressBook,
  IconSettings,
  IconReceipt2,
  IconLogout,
} from "@tabler/icons";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const data = [
  { link: "items", label: "Items", icon: IconClipboardList },
  { link: "customers", label: "Customers", icon: IconAddressBook },
  { link: "", label: "Billing", icon: IconReceipt2 },
  { link: "", label: "Other Settings", icon: IconSettings },
];

function MainLayout(): JSX.Element {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Items");
  const navigate = useNavigate()

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        navigate(`${item.link}`)
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Flex >
      <Navbar height={"100vh"} width={{ sm: 300 }} p="md">
        <Navbar.Section grow>
          <Flex className={classes.header} align="center" justify={"center"}>
            <Text sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
              <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
                Billing System
              </Link>
            </Text>
          </Flex>
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>
      <div style={{ height: "100vh", width:'100%'}}>
        <Outlet />
      </div>
    </Flex>
  );
}

export default MainLayout;
