import { Auth } from "../../atoms/authList.ts";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

type AuthListProps = {
  authList: Auth[];
  onSignin: (auth: Auth) => unknown;
  onRemove?: (auth: Auth) => unknown;
};
export const AuthList = ({ authList, onSignin }: AuthListProps) => {
  return (
    <List component={"nav"}>
      {authList.map((auth) => (
        <ListItem
          key={auth.email}
          button
          alignItems={"flex-start"}
          onClick={() => onSignin(auth)}
        >
          <ListItemText
            primary={auth.description}
            secondary={
              auth.email !== auth.description ? (
                <Typography color={"textPrimary"}>{auth.email}</Typography>
              ) : undefined
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
